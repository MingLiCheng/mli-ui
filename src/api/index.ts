/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2021-01-27 16:30:00
 */

const files = require.context('./modules', false, /\.ts$/)
const modules: any = {}
files.keys().forEach(key => {
  if (key === './index.ts') return
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})
export default modules
