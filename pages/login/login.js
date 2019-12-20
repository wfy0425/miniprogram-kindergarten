import Toast from '../../vant/toast/toast';
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
        username: "",
        password: "",
        dbCollection: null
    },
    //输入用户名
    inputName: function(value) {
        this.setData({
            username: value.detail
        })
    },
    //输入密码
    inputPassword: function(value) {
        this.setData({
            password: value.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            dbCollection: options.type,
        })
        console.log(this.data.dbCollection)

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

    //登陆
    login: function() {
        let that = this;
        console.log(this.data.username)
        const collection = db.collection(this.data.dbCollection);
        console.log(collection)
        collection.doc(this.data.username).get({
            success: function(res) {
                // res.data 包含该记录的数据
                console.log(res.data)
                console.log("用户名存在");
                console.log(res.data.password)
                console.log(that.data.password == res.data.password)
                if (that.data.password == res.data.password) { //判断密码是否正确
                    console.log('登陆成功')
                    app.globalData.currentUserName = res.data._id;
                    console.log(app.globalData.currentUserName);
                    Toast.success({
                        duration: 1000,
                        message: '登陆成功',
                        onClose: function() {
                            wx.navigateBack({
                                delta: 1 //TODO 登录后直接进入账户管理页面
                            });
                        }
                    })

                } else {
                    console.log('密码错误')
                    Toast.fail('密码错误');
                }
            },
            fail: function() {
                console.log('用户名不存在')
                Toast.fail('用户名不存在');
            }
        })
    },
    //注册
    register: function() {
        const collection = db.collection(this.data.dbCollection);
        let that = this;
        //查询用户是否已经注册

        collection.doc(this.data.username).get({
            success: function(res) {
                // res.data 包含该记录的数据
                console.log(res.data)
                console.log("该用户名已使用");
                Toast.fail('该用户名已使用');
            },
            fail: function() {
                //未注册
                console.log("该用户名不存在");
                that.saveuserinfo(that)
            }
        })
    },

    //注册用户信息
    saveuserinfo: function(that) {

        const collection = db.collection(this.data.dbCollection);
        // let that = this;
        collection.add({ //添加数据
            data: {
                _id: that.data.username,
                password: that.data.password
            }
        }).then(res => {
            app.globalData.currentUserName = that.data.username;
            console.log('注册成功')
            Toast.success({
                duration: 1000,
                message: '注册成功',
                onClose: function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            });
        })
    },
})