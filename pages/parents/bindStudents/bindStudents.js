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
        studentId: "",
        dbCollection: "parents"
    },

    inputStudentId: function(value) {
        this.setData({
            studentId: value.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

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
    login() {

        const collection = db.collection(this.data.dbCollection);
        console.log(collection)
        let that = this;
        console.log(this)
            //登陆获取用户信息
        collection.get({
            success: (res) => {
                let user = res.data;
                let userExist = false;
                console.log(user);
                console.log(that.data);
                for (let i = 0; i < user.length; i++) { //遍历数据库对象集合
                    console.log(user[i]);
                    if (that.data.username === user[i].username) { //用户名存在
                        console.log("用户名存在");
                        userExist = true;
                        if (that.data.password !== user[i].password) { //判断密码是否正确
                            console.log('密码错误')
                            Toast.fail('密码错误');
                        } else {
                            console.log('登陆成功')
                            Toast.success('登陆成功');
                            app.globalData.currentUserName = that.data.username;
                            console.log(user[i]);
                            wx.redirectTo({
                                url: '/pages/parents/account/account',
                            })
                        }
                    }
                }
                if (!userExist) { //不存在
                    console.log('用户名不存在')
                    Toast.fail('用户名不存在');

                }
            }
        })
    },
    //注册
    register() {
        const collection = db.collection(this.data.dbCollection);
        let that = this;
        let flag = false //是否存在 true为存在
            //查询用户是否已经注册
        collection.get({
            success: (res) => {
                for (let i = 0; i < res.data.length; i++) { //遍历数据库对象集合
                    if (that.data.username === res.data[i].username) { //用户名存在
                        flag = true;
                        //   break;
                    }
                }
                if (flag === true) { //已注册
                    Toast.fail('该用户名已使用');
                } else { //未注册
                    that.saveuserinfo(that)
                }
            }
        })
    },


    //注册用户信息
    saveuserinfo(that) {

        const collection = db.collection(this.data.dbCollection);
        // let that = this;
        collection.add({ //添加数据
            data: {
                username: that.data.username,
                password: that.data.password
            }
        }).then(res => {
            app.globalData.currentUserName = that.data.username;
            console.log('注册成功')
            Toast.success({
                duration: 2000,
                message: '注册成功',
                onClose: function() {
                    wx.redirectTo({
                        url: '/pages/parents/account/account',
                    })
                }
            });
        })
    },
})