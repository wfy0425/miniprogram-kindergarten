let app = getApp();
//获取云数据库引用

Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '/images/logo.jpg',
        bannerUrl: '/images/banner.png',
        userInfo: {}, //使用数据时用这个
        avatarUrl: '/images/user-unlogin.png', //用于控件显示
        username: '点击登陆', //用于控件显示
        logged: false,
        takeSession: false,
        linkId: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;

        if (!app.globalData.openid) {
            this.onGetOpenid();
        }
        if (app.globalData.userInfo) {
            this.setData({
                logged: true,
                userInfo: app.globalData.userInfo,
                username: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
            })



        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },


    onGetUserInfo: function(e) {
        if (!this.data.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo,
                username: e.detail.userInfo.nickName
            })
            app.globalData.userInfo = e.detail.userInfo;
        }
    },


    // changePw: function() {
    //     wx.navigateTo({
    //         url: '/pages/changePw/changePw?type=parents',
    //     })
    // },
    bindStudents: function() {
        wx.navigateTo({
            url: '/pages/parents/bindStudents/bindStudents',
        })
    },

    onGetOpenid: function() {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'getWXContext',
            data: {},
            success: res => {
                console.log('[云函数] [getWXContext] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
            },
            fail: err => {
                console.error('[云函数] [getWXContext] 调用失败', err)
            }
        })
    },
})