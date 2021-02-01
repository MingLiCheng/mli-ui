/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-12-09 10:33:57
 */
import { getRequest, postRequest } from '../request'

const $$path = {
  // 省
  provinceList: '/Terminal/provinceList'
}

export const getProvinceList = (params = {}) => {
  return getRequest($$path.provinceList, params)
}
export const postProvinceList = (params = {}) => {
  return postRequest($$path.provinceList, params)
}

export default {
  getProvinceList,
  postProvinceList
}
