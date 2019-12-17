import Toast from '../../../vant/toast/toast';
let app = getApp();
//获取云数据库引用

const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        logoUrl: '/images/logo.svg',
        bannerUrl: '/images/banner.svg',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        linkId: "",
        dbCollection: "parents",
        isBinded: false,
    },

    inputLinkId: function(value) {
        this.setData({
            linkId: value.detail
        })
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
        let that = this;
        if (!this.data.isBinded) {
            if (app.globalData.currentUserName) {
                const collection = db.collection(this.data.dbCollection);
                collection.doc(app.globalData.currentUserName).get({
                    success: function(res) {
                        // res.data 包含该记录的数据
                        console.log(res.data)
                        if (res.data.linkId) {
                            console.log("该用户名已绑定");
                            that.setData({
                                isBinded: true
                            })
                        }

                    },
                    fail: function() {
                        //未注册
                        console.log("绑定：用户不存在");
                    }
                })
            } else {
                console.log("绑定：用户未登录");
            }
        }
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


    //登陆
    bind: function() {
        console.log(!app.globalData.currentUserName)
        if (!app.globalData.currentUserName) {
            Toast.fail({
                duration: 1000,
                message: '请先登录',
                onClose: function() {
                    wx.navigateTo({
                        url: '/pages/login/login?type=parents',
                    })
                }
            })
        } else {
            let that = this;
            console.log(this.data.linkId)
            const collection = db.collection(this.data.dbCollection);
            console.log(collection)
            collection.doc(app.globalData.currentUserName).update({ //添加数据
                data: {
                    linkId: that.data.linkId
                },
                success: function(res) {
                    console.log('绑定成功')
                    Toast.success({
                        duration: 2000,
                        message: '绑定成功',
                        onClose: function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    })
                },
                fail: function() {
                    console.log('绑定失败')
                    Toast.fail('绑定失败');
                }
            })
        }
    },
})