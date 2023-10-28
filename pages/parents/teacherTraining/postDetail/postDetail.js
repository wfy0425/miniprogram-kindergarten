//TODO 与公众号文章链接
const db = wx.cloud.database()
const collection = db.collection('teacherTrainingPost')
import Toast from '../../../../vant/toast/toast'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        post: null,
        logoUrl: '/images/logo.jpg',
        bannerUrl: '/images/banner.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var postId = options.id
        var that = this
        collection.doc(postId).get({
            success: function (res) {
                // res.data 包含该记录的数据
                console.log(res.data)
                var post = res.data
                that.setData({
                    post: post,
                })
            },
        })
    },

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
})
