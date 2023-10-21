let app = getApp()
// pages/parents/index/index.js
const IMGLOCATION =
    'cloud://zhiai-0g01wvvc0b5980e9.7a68-zhiai-0g01wvvc0b5980e9-1300754910/img/室内图片/'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '../../../images/logo.jpg',
        bannerUrl: '../../../images/banner.svg',
        //TODO: 图片预加载
        imgUrls: [
            IMGLOCATION + '娱乐区淘气堡.jpg',
            IMGLOCATION + '休息区.jpg',
            IMGLOCATION + '前台.jpg',
            IMGLOCATION + '女卫.jpg',
            IMGLOCATION + '男卫.jpg',
            IMGLOCATION + '海洋球池.jpg',
            IMGLOCATION + '二层大教室角度A.jpg',
            IMGLOCATION + '多功能影音室.jpg',
        ],
        isLoadedAll: false,
        musicIndex: null,
        videoIndex: null,
        currentTabsIndex: 0,
        pageIndex: 1,
        photoList: [
            {
                url: IMGLOCATION + '多功能影音室.jpg',
                description: '多功能影音室',
            },
            {
                url: IMGLOCATION + '海洋球池.jpg',
                description: '海洋球池',
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
        wx.navigateTo({
            url: '/pages/parents/account/account',
        })
        console.log()
    },
})
