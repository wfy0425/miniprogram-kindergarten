let app = getApp();
// pages/parents/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '../../../images/logo.svg',
        bannerUrl: '../../../images/banner.svg',
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
        memberList: [{
                'url': "https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=b5e4c905865494ee982209191df4e0e1/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg",
                'name': "这是老师名字",
                'description': "这是老师简介"
            },
            {
                'url': "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg",
                'name': "这是题目",
                'description': "这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。"
            },

        ],
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


})