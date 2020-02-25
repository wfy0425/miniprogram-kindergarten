//TODO: 评价缩略
import Toast from '../../../../vant/toast/toast';
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
    bannerUrl: '/images/banner.png',
    date: '2020-01', //默认起始时间  
    evalArry: null,
    linkId: 1234,
    page: 0,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var studentId = options.id
    var that = this;
    that.setData({
      studentId
    })
    console.log("onLoad")
    console.log(that.data.studentId)

    //显示加载图标
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '加载中',
      mask: true
    });

    //获取时间
    var time = new Date()
    this.setData({
      date: time.getFullYear() + "-" + (time.getMonth() + 1)
    })
    console.log(this.data.date)

    /*获取分页数据*/
    var totalCount = 0;
    // 获取总数
    collection.count({
      success: function (res) {
        totalCount = res.total
        console.log("totalCount:" + totalCount)
      },
      fail: console.error
    })

    /*获取前pageSize条内容*/
      try {
        const $ = db.command.aggregate
        collection.aggregate().limit(that.data.pageSize) // 限制返回数量为 10 条
          .sort({
            date: 1,
          })
          .project({
            _id: true,
            category: true,
            content: true,
            linkId: true,
            studentId: true,
            year: $.year('$date'),
            month: $.month('$date'),
            day: $.dayOfMonth('$date') 
          })
          .match({
            studentId: parseInt(that.data.studentId)
          })
          .end()
          .then(res => {
            console.log(res)
            that.setData({
              evalArry: res.list
            })
            Toast.clear();
          }, err => {
            console.log('error1: ', err)
          })
      } catch (e) {
        wx.hideNavigationBarLoading(); //隐藏加载
        wx.stopPullDownRefresh();
        console.error(e);
      }
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

    wx.showNavigationBarLoading();
    this.onLoad()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.page;
    if ((page + 1) * this.data.pageSize < this.data.totalCount) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...'
      });
      page++;
      this.setData({
        page: page
      })
      this.refresh(page * this.data.pageSize);

      Toast.clear();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })

    /*从startCount开始加载，一共pageSize条*/
    var page = this.data.page;
    var startCount = page * this.data.pageSize
    this.refresh(startCount);
  },
  /**
   * 获取列表数据
   * 
   */
  refresh: function (startCount) {
    var that = this;
    console.log("startCount--->" + startCount);

    try {
      var year_month = this.data.date.split('-');
      //调试通过：新生成一个字段birthmonth, 再筛选(match)
      const $ = db.command.aggregate
      collection.aggregate().limit(that.data.pageSize).skip(startCount) // 限制返回数量为 10 条
        .sort({
          date: 1,
        })
        .project({
          _id: true,
          category: true,
          content: true,
          linkId: true,
          studentId: true,
          year: $.year('$date'),
          month: $.month('$date'),
          day: $.dayOfMonth('$date') 
        })
        .match({
          year: parseInt(year_month[0], 10),
          month: parseInt(year_month[1], 10),
          studentId: parseInt(that.data.studentId)
        })
        .end()
        .then(res => {
          console.log(res)
          that.setData({
            evalArry: res.list
          })
        }, err => {
          console.log('error1: ', err)
        })
    } catch (e) {
      wx.hideNavigationBarLoading(); //隐藏加载
      wx.stopPullDownRefresh();
      console.error(e);
    }
  },
  onNewEval: function () {
    var that = this;
    console.log('onBtnClick');
    wx.navigateTo({
      url: 'eval/eval?studentId=' + that.data.studentId,
    })

  }
})