/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2021-01-28 10:01:21
 */
import { postRequest } from '../request'

const $$path = {
  upload: '/upload'
}

export const uploadFile = function(params = {}) {
  return postRequest($$path.upload, params, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export default {
  uploadFile
}
