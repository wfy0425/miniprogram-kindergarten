import Toast from '../../../vant/toast/toast';
let app = getApp();
//获取云数据库引用
//TODO: 把bindStudent移动到account里面
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
        linkId: "", //使用数据时用这个
        isBinded: false, //用于控件显示
    },

    inputLinkId: function (value) {
        this.setData({
            linkId: value.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '加载中',
            mask: true
        });
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
        let that = this;
        const collection = db.collection("parents");
        // if (!this.data.isBinded) {
        //     if (app.globalData.currentUserName) {
        //         const collection = db.collection(this.data.dbCollection);
        //         collection.doc(app.globalData.currentUserName).get({
        //             success: function(res) {
        //                 // res.data 包含该记录的数据
        //                 console.log(res.data)
        //                 if (res.data.linkId) {
        //                     console.log("该用户名已绑定");
        //                     that.setData({
        //                         isBinded: true
        //                     })
        //                 }

        //             },
        //             fail: function() {
        //                 //未注册
        //                 console.log("绑定：用户不存在");
        //             }
        //         })
        //     } else {
        //         console.log("绑定：用户未登录");
        //     }
        // }

        if (!app.globalData.linkId) {
            console.log("onShow: 检查是否bind student-没有bind信息");
            //检查是否bind student
            collection.doc(app.globalData.openid).get({
                success: function (res) {
                    //此用户存在
                    // res.data 包含该记录的数据
                    console.log("onShow: 检查是否bind student-此用户存在");
                    if (res.data.linkId) { //判断该账户是否绑定
                        console.log("onShow: 检查是否bind student-linkId存在");
                        that.setData({
                            linkId: res.data.linkId,
                            isBinded: true
                        })
                        app.globalData.linkId = res.data.linkId
                    } else {
                        console.log('onShow: 检查是否bind student-linkId不存在')
                    }
                    Toast.clear();
                },
                fail: function (res) {
                    //此用户不存在
                    console.log("onShow: 检查是否bind student-此用户不存在");
                    //放入数据库
                    collection.add({ //添加数据
                        data: {
                            _id: app.globalData.openid,
                            userInfo: app.globalData.userInfo,
                            linkId: '',

                        }
                    }).then(res => {
                        Toast.clear();
                    })
                }
            })
        } else {
            console.log("onShow: 检查是否bind student-有bind信息");
            that.setData({
                isBinded: true
            })
            Toast.clear();
        }
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


    //bind
    bind: function () {

        if (!app.globalData.userInfo) {
            console.log('bind:没有登录')
            Toast.fail({
                duration: 1000,
                message: '请先登录',
                onClose: function () {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            })
        } else {
            //TODO: 添加学生数据库
            let that = this;
            console.log(this.data.linkId)
            const collection = db.collection("parents");
            console.log(collection)
            collection.doc(app.globalData.openid).update({ //添加数据
                data: {
                    linkId: that.data.linkId
                },
                success: function (res) {
                    console.log('绑定成功')
                    Toast.success({
                        duration: 2000,
                        message: '绑定成功',
                        onClose: function () {
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    })
                },
                fail: function () {
                    console.log('绑定失败')
                    Toast.fail('绑定失败');
                }
            })
        }
    },
})