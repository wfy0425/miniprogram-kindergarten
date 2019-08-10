// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: "cloud-learn-g7rvr"
})
// 云函数入口函数
exports.main = async (event, context) => {
  
  return {
    postdetail: await db.collection('post_collection').where({
      _id: event.postid
    }).get(),
  }
}