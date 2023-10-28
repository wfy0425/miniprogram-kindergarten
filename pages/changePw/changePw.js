import Toast from '../../vant/toast/toast'
let app = getApp()
//获取云数据库引用

const db = wx.cloud.database()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        username: '',
        password: '',
        newPassword: '',
        dbCollection: null,
        logoUrl: '/images/logo.jpg',
        bannerUrl: '/images/banner.png',
    },

    //输入用户名
    inputName: function (value) {
        this.setData({
            username: value.detail,
        })
    },
    //输入密码
    inputPassword: function (value) {
        this.setData({
            password: value.detail,
        })
    },
    inputNewPassword: function (value) {
        this.setData({
            newPassword: value.detail,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            dbCollection: options.type,
        })
        console.log(this.data.dbCollection)
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
    //更改密码
    change: function () {
        const collection = db.collection(this.data.dbCollection)
        console.log(collection)
        let that = this
        console.log(this)
        //登陆获取用户信息
        collection.doc(this.data.username).get({
            success: function (res) {
                // res.data 包含该记录的数据
                console.log(res.data)
                console.log('用户名存在')
                console.log(res.data.password)
                console.log(that.data.password == res.data.password)
                if (that.data.password == res.data.password) {
                    //判断密码是否正确
                    console.log('密码正确')
                    that.saveuserinfo(that)
                } else {
                    console.log('密码错误')
                    Toast.fail('密码错误')
                }
            },
            fail: function () {
                console.log('用户名不存在')
                Toast.fail('用户名不存在')
            },
        })
    },

    //注册用户信息
    saveuserinfo: function (that) {
        const collection = db.collection(this.data.dbCollection)
        // let that = this;
        collection.doc(this.data.username).update({
            //添加数据
            data: {
                password: that.data.newPassword,
            },
            success: function (res) {
                console.log('修改成功')
                Toast.success({
                    duration: 2000,
                    message: '修改成功',
                    onClose: function () {
                        wx.navigateBack({
                            delta: 1,
                        })
                    },
                })
            },
        })
    },
})
