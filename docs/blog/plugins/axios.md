---
title: axios 封装
---

# axios 封装

```javascript
/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-12-04 14:10:37
 */
import axios, { AxiosInstance } from 'axios'
import GlobalConfig from '@/config'
const CancelToken = axios.CancelToken
let source: any = {}
//  timeout 10min
const GLOBAL_DELAY = 10 * 60 * 1000
const BASE_URL = GlobalConfig.apiConfig.baseUrl

// 创建axios实例
const axiosInstance = (instanceKey: string, options: any) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: GLOBAL_DELAY,
    cancelToken: new CancelToken(function executor(c) {
      // 给所有的请求生成一个 取消标识 用去取消请求
      source[instanceKey] = c
    }),
    ...options
  })
  return instance
}

/**
 * 请求拦截器
 * axios 请求的中间件,可根据需求，修改header
 * @param {Object} instance axios实例
 */
const reqMiddleware = (instance: AxiosInstance) => {
  instance.defaults.withCredentials = true
  instance.interceptors.request.use(
    config => {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      config.headers['X-Token'] = 'TokenInfo'
      return config
    },
    err => {
      throw new Error(err)
    }
  )
}

/**
 * 响应拦截器
 * axios 请求成功后响应的中间件
 * @param {Object} instance axios实例
 */

const resMinddleware = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res: any) => {
      delete source[res.config.url.replace(res.config.baseURL, '/') + res.config.method]
      if (res) {
        if (res.status === 200) {
          return res.data
        }
        console.log('统一错误处理', res)
        const data = res.data
        switch (data.code) {
          case 401: // 权限不足
            console.log('权限不足')
            break
          case 403: // token 过期 失效
            localStorage.removeItem('token')
            break
          default:
            return res.data
        }
      }
    },
    err => {
      console.log('请求发生错误error', err, err.response, err.response.status)
      if (axios.isCancel(err)) {
        // 手动停止
        console.log('Request canceled', err, err.message)
      } else if (err.response.status === 401 || err.response.status === 403) {
        console.log('当前登录状态已过期，请重新登录')
        window.sessionStorage.clear()
        window.location.hash = 'login'
        return false
      } else {
        return Promise.reject(err)
      }
    }
  )
}

// 请求的 实例
const publicReq = async (params: any, options: any) => {
  const { url, method, param } = params
  const instanceKey = url + method
  const instance = axiosInstance(instanceKey, options)
  reqMiddleware(instance)
  resMinddleware(instance)

  return await instance({
    url,
    method,
    [method === 'post' ? 'data' : 'params']: param || {},
    transformRequest: [
      // 修改请求数据 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      function(data, headers) {
        // post 方法 formdata 参数处理
        if (headers['Content-Type'] && headers['Content-Type'].includes('x-www-form-urlencoded')) {
          let ret = ''
          let index = 0
          for (const key in data) {
            if (data[key] === null) {
              ret += `${index === 0 ? '' : '&'}key=&` //
            } else {
              ret += `${index === 0 ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
            }
            index += 1
          }
          return ret
        } else if (headers['Content-Type'] && headers['Content-Type'].includes('json')) {
          return JSON.stringify(data)
        } else {
          return data
        }
      }
    ]
  }).then(res => {
    return res
  })
}

// 请求超时函数
const timeoutfn = (delay: number, url: string) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('请求超时')
      console.info('请求超时', url)
    }, delay)
  })
}

// 单个请求 存在请求超时
export async function req(params: any, options: any, delay = GLOBAL_DELAY) {
  // console.log('params', params)
  try {
    const response = await Promise.race([timeoutfn(delay, params.url), publicReq(params, options)])
    return response
  } catch (error) {
    throw new Error(error)
  }
}

// GET request
export async function getRequest(url: string, param = {}, options = {}) {
  try {
    const response = await req(
      {
        url,
        method: 'get',
        param
      },
      options
    )
    return response
  } catch (err) {
    // 这里走本地模拟数据
    console.log(typeof err, 'err', Object.keys(err))
    // message.error('服务器错误')
    throw new Error(err)
  }
}

// POST request
export async function postRequest(url: string, param = {}, options = {}) {
  try {
    const response = await req(
      {
        url,
        method: 'post',
        param
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, ...options }
    )
    return response
  } catch (err) {
    console.log(err)
  }
}

export function cancelReq() {
  // 用去取消当前没有成功的所有的请求
  console.log('取消padding的请求', 'source', source)
  if (Object.keys(source).length > 0) {
    Object.keys(source).forEach(key => {
      source[key]('cancel request')
    })
  }
  source = {}
}

```