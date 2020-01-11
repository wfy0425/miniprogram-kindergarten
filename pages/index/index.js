let app = getApp();
import Toast from '../../vant/toast/toast';
// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '../../images/logo.svg',
        bannerUrl: '../../images/banner.svg'
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

    parents: function(event) {
        console.log(event)
        wx.navigateTo({
            url: '/pages/parents/index/index',
        })
    },

    students: function(event) {
        console.log(event)
        wx.navigateTo({
            url: '/pages/students/index/index',
        })
    },


    on16pf: function(event) {
        console.log(event)
        wx.navigateTo({
            url: '/pages/staffs/16pf/16pf',
        })
    },

    staffs: function(event) {
        Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '加载中',
            mask: true
        });
        console.log(event)
        if (event.detail.userInfo) {
            app.globalData.userInfo = event.detail.userInfo;
        }
        // 查询openid
        wx.cloud.callFunction({
            name: 'getWXContext',
            data: {},
            success: res => {
                console.log('[云函数] [getWXContext] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid

                //查询staffs数据库里是否有用户的openid
                const db = wx.cloud.database();
                const collection = db.collection("staffs");
                collection.doc(app.globalData.openid).get({
                    success: function(res) {
                        // res.data 包含该记录的数据
                        app.globalData.isAdmin = res.data.isAdmin
                        console.log(res.data)
                        wx.navigateTo({
                            url: '/pages/staffs/index/index',
                        })
                        Toast.clear();
                    },
                    fail: function() {
                        //没有
                        console.log("staffs: 不是园丁")
                        Toast.fail({
                            duration: 2000,
                            message: '只有老师才能访问这里哦',
                        })
                        Toast.clear();
                    }
                })

            },
            fail: err => {
                console.error('[云函数] [getWXContext] 调用失败', err)
                Toast.fail({
                    duration: 2000,
                    message: 'openid获取失败，请稍后再试',
                })
                Toast.clear();
            }
        })

    },
})