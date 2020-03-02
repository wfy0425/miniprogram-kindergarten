import Toast from '../../../../../vant/toast/toast';
let app = getApp();
const db = wx.cloud.database()
var collection = db.collection("students_eval")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: null,
    logoUrl: '/images/logo.jpg',
    bannerUrl: '/images/banner.svg',
    eval: '',
    page: 0,
    pageSize: 20,
    err: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var studentId = options.studentId
    var that = this;
    that.setData({
      studentId
    })
    console.log("onLoad")
    console.log(that.data.studentId)


    // //获取时间
    // wx.cloud.callFunction({
    //   name: 'getServerTime',
    //   success: function (res) {
    //     console.log(res)
    //     var time = that.utc_beijing(res.result);
    //     var year = time.getFullYear()
    //     var month = time.getMonth() + 1
    //     console.log(year);
    //     console.log(month);
    //     that.setData({
    //       date: year.toString() + "-" + month.toString(),
    //     })
    //   },
    //   fail: function (err) {
    //     console.log(err);
    //   },
    //   complete: function () {
    //     Toast.clear();
    //   }

    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      eval: event.detail
    })
  },

  onSubmit(event) {
    var that = this;
    if(this.data.eval){
      collection.add({
      data: {
        category: "daily_eval",
        content: that.data.eval,
        date: db.serverDate(),
        linkId: app.globalData.linkId,
        studentId: parseInt(this.data.studentId)
      }
    })
    .then(res => {
      Toast.success("提交成功");
      wx.navigateBack({
        delta: 1
      })
    })
    .catch(console.error)
  }
  else{
    that.setData({
      err: "评价不能为空"
    })
  }
  },

  //   utc_beijing: function (utc_datetime) {
  //   // 转为正常的时间格式 年-月-日 时:分:秒
  //   var T_pos = utc_datetime.indexOf('T');
  //   var Z_pos = utc_datetime.indexOf('Z');
  //   var year_month_day = utc_datetime.substr(0, T_pos);
  //   var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  //   var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

  //   // 处理成为时间戳
  //   timestamp = new Date(Date.parse(new_datetime));
  //   timestamp = timestamp.getTime();
  //   timestamp = timestamp / 1000;

  //   // 增加8个小时，北京时间比utc时间多八个时区
  //   var timestamp = timestamp + 8 * 60 * 60;

  //   // 时间戳转为时间
  //   // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  //   var beijing_datetime = new Date(parseInt(timestamp) * 1000)
  //   return beijing_datetime; // 2017-03-31 16:02:06
  // }


})