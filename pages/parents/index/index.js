let app = getApp();
// pages/parents/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '../../../images/logo.jpg',
        bannerUrl: '../../../images/banner.png',
        //TODO: 图片预加载
        imgUrls: [
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/娱乐区淘气堡.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/休息区.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/前台.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/女卫.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/男卫.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/海洋球池.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/二层大教室角度A.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/多功能影音室.jpg'
        ],
        isLoadedAll: false,
        musicIndex: null,
        videoIndex: null,
        currentTabsIndex: 0,
        pageIndex: 1,
        photoList: [{
                'url': "cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/多功能影音室.jpg",
                'description': "多功能影音室"
            },
            {
                'url': "cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/海洋球池.jpg",
                'description': "海洋球池"
            },
        ],
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

    onAccount: function (event) {

        wx.navigateTo({
            url: '/pages/parents/account/account',
        })
        console.log()
    },

})