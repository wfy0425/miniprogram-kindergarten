// pages/students/index/index.js
let app = getApp();
const db = wx.cloud.database();
const collection = db.collection('kid_video');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoUrl: '../../../images/logo.svg',
    bannerUrl: '../../../images/banner.svg',
    videoList: [],
    imgList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    collection.get({
      success: function (res) {
        that.setData({
          videoList: res.data,
        })
      }
    })
    
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
  //tap切换
  onTabsItemTap: function (event) {
    var index = event.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex: index
    });
    //tab切换时停止音乐播放
    backgroundAudioManager.stop();

    //tab切换时停止视频播放
    var videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex);
    videoContextPrev.stop();

    //将当前播放视频、音频的index设置为空
    this.setData({
      musicIndex: null,
      videoIndex: null,
    })
  },
  //展开
  //原本没有upStatus这个字段，所以默认值为false
  upDown(event) {
    var index = event.currentTarget.dataset['index'];
    this.data.videoList[index].upStatus = !this.data.videoList[index].upStatus;
    this.setData({
      videoList: this.data.videoList
    })
  },
  //播放音频
  musicPlay(event) {
    var src = event.currentTarget.dataset['src'];
    var index = event.currentTarget.dataset['index'];
    this.setData({
      musicIndex: index,
      audioSrc: src
    });

    backgroundAudioManager.src = src;
    backgroundAudioManager.play()

  },
  //停止音频
  musicPause(event) {
    this.setData({
      musicIndex: null
    });
    backgroundAudioManager.pause();
  },
  //播放视频
  videoPlay(event) {
    var length = this.data.videoList.length;
    var index = event.currentTarget.dataset['index'];

    if (!this.data.videoIndex) { // 没有播放时播放视频
      this.setData({
        videoIndex: index
      })
      var videoContext = wx.createVideoContext('video' + index)
      videoContext.play()
    } else {
      //停止正在播放的视频
      var videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex)
      videoContextPrev.stop()
      //将点击视频进行播放
      this.setData({
        videoIndex: index
      })
      var videoContextCurrent = wx.createVideoContext('video' + index)
      videoContextCurrent.play()
    }
  },
})