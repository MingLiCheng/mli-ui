---
title: axios 请求封装
---
# axios 请求封装
一般项目中对吧数据请求封装在（数据层）一个单独的模块中，方便对项目中的请求做统一的处理


## axios.create
axios提供create来创建一个请求的实例
```javascript
const CancelToken = axios.CancelToken
let source = {}
/**
 * @description 创建axios的请求实例
 * @param {String} instanceKey  请求标识符 用来取消请求的
 * @param {Object} options axios相关配置
 * @returns axios请求实例
 */
const axiosInstance = (instanceKey, options) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: GLOBAL_DELAY,
    cancelToken: new CancelToken(function executor(c) {
      // 给所有的请求生成一个 取消标识 用去取消请求
      source[instanceKey] = c
    }),
    withCredentials: true, // 允许携带cookie
    ...options
  })
  return instance
}
```

## 请求拦截器
对请求进行处理在请求发出去之前
```javascript
/**
 * 请求拦截器
 * axios 请求的中间件,可根据需求，修改header
 * @param {Object} instance axios实例
 */
const reqMiddleware = instance => {
  instance.interceptors.request.use(
    config => {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      config.headers['Swtoken'] = window.sessionStorage.getItem('swToken') || ''
      return config
    },
    err => {
      throw new Error(err)
    }
  )
}
```

## 响应拦截器
对请求的结果进行统一的处理
```javascript
/**
 * 响应拦截器
 * axios 请求成功后响应的中间件
 * @param {Object} instance axios实例
 */

const resMinddleware = instance => {
  instance.interceptors.response.use(
    res => {
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
        window.localStorage.clear()
        window.location.hash = '#/signin'
        return false
      } else if (err.response.status === 500) {
        // errorNotification()
      } else {
        return Promise.reject(err)
      }
    }
  )
}
```


## 构建一个公共请求方法

```javascript
/**
 * @description 构建一个公共请求方法
 * @param {Object} params 请求所需基本的参数 url, method, param
 * @param {Object} options  请求的自定义配置
 * @returns
 */
const publicReq = async (params, options) => {
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
      function (data, headers) {
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
```
