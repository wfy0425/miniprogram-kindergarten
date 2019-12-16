let app = getApp();
// pages/parents/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '../../../images/logo.svg',
        bannerUrl: '../../../images/banner.svg',
        isLoadedAll: false,
        musicIndex: null,
        videoIndex: null,
        currentTabsIndex: 0,
        pageIndex: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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

    onAccount: function(event) {
        console.log(app.globalData.currentUserName);
        if (app.globalData.currentUserName) {
            wx.navigateTo({
                url: '/pages/parents/account/account',
            })
        } else {
            //not login in
            wx.navigateTo({
                url: '/pages/login/login?type=parents',
            })
            console.log()
        }
    },

})