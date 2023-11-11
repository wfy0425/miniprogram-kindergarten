const cloud = require('wx-server-sdk')
const CloudBase = require('@cloudbase/manager-node')
const {
  storage
} = new CloudBase()

cloud.init()
exports.main = async (event, context) => {
  console.log(event.dir)
  const res = await storage.listDirectoryFiles(event.dir)


  console.log(res)
  return {
    data: res,
  }
}