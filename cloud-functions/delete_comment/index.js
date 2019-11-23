// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: "cloud-zhiai-8dv2t"
})

// 云函数入口函数
exports.main = async (event, context) => {
  var postid = postid
  try {
    return await db.collection('comment_collection').where({
      postid: event.postid
    }).remove()
  } catch (e) {
    console.log(e)
  }

}