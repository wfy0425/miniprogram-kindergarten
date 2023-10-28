let app = getApp()
// pages/parents/index/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '../../../images/logo.jpg',
        bannerUrl: '../../../images/banner.png',
        isLoadedAll: false,
        musicIndex: null,
        videoIndex: null,
        currentTabsIndex: 0,
        pageIndex: 1,
        videoList: [
            {
                coverimg:
                    'https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg',
                description:
                    '这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。',
                id: '41',
                resource_add:
                    'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
                title: ' 第三期 Beatles 02',
                type: '1',
            },
            {
                coverimg:
                    'https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg',
                description: '',
                id: '42',
                resource_add:
                    'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
                title: ' 第三期 Beatles 02',
                type: '1',
            },
            {
                coverimg:
                    'https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg',
                description: '',
                id: '43',
                resource_add:
                    'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
                title: ' 第三期 Beatles 02',
                type: '1',
            },
            {
                coverimg:
                    'https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg',
                description: '',
                id: '44',
                resource_add:
                    'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
                title: ' 第三期 Beatles 02',
                type: '1',
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},

    onAccount: function (event) {
        console.log(app.globalData.currentUserName)
        if (app.globalData.currentUserName) {
            wx.navigateTo({
                url: '/pages/parents/account/account',
            })
        } else {
            //not login in
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }
    },

    //展开
    //原本没有upStatus这个字段，所以默认值为false
    upDown(event) {
        var index = event.currentTarget.dataset['index']
        this.data.videoList[index].upStatus =
            !this.data.videoList[index].upStatus
        this.setData({
            videoList: this.data.videoList,
        })
    },
    //播放视频
    videoPlay(event) {
        var length = this.data.videoList.length
        var index = event.currentTarget.dataset['index']

        if (!this.data.videoIndex) {
            // 没有播放时播放视频
            this.setData({
                videoIndex: index,
            })
            var videoContext = wx.createVideoContext('video' + index)
            videoContext.play()
        } else {
            //停止正在播放的视频
            var videoContextPrev = wx.createVideoContext(
                'video' + this.data.videoIndex
            )
            videoContextPrev.stop()
            //将点击视频进行播放
            this.setData({
                videoIndex: index,
            })
            var videoContextCurrent = wx.createVideoContext('video' + index)
            videoContextCurrent.play()
        }
    },
})
