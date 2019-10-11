// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=b5e4c905865494ee982209191df4e0e1/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg',
      'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg',
      'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg'
    ],
    isLoadedAll: false,
    musicIndex: null,
    videoIndex: null,
    currentTabsIndex: 0,
    pageIndex: 1,
    videoList: [
      {
        'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
        'description': "这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。",
        'id': "41",
        'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        'title': " 第三期 Beatles 02",
        'type': "1"
      },
      {
        'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
        'description': "",
        'id': "42",
        'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        'title': " 第三期 Beatles 02",
        'type': "1"
      },
      {
        'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
        'description': "",
        'id': "43",
        'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        'title': " 第三期 Beatles 02",
        'type': "1"
      },
      {
        'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
        'description': "",
        'id': "44",
        'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        'title': " 第三期 Beatles 02",
        'type': "1"
      },
    ],
    audioList: [
      {
        'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
        'description': "这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，",
        'id': "50",
        'resource_add': "http://zhangmenshiting.qianqian.com/data2/music/6c2983881c95968fbb0f4fd334c5d526/599527734/599527734.mp3?xcode=7c9d9130f46d992ba0cc505dc0621a48",
        'title': "音频1",
        'type': "1"
      },
      {
        'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
        'description': "这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，",
        'id': "51",
        'resource_add': "http://zhangmenshiting.qianqian.com/data2/music/6c2983881c95968fbb0f4fd334c5d526/599527734/599527734.mp3?xcode=7c9d9130f46d992ba0cc505dc0621a48",
        'title': "音频2",
        'type': "1"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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