// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database({
  env: "cloud-zhiai-8dv2t"
})
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('post_collection').where({
    _id: event.postid
  }).update({
    data: {
      watch_count: _.inc(1)
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}