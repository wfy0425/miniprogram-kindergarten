let app = getApp();
//获取云数据库引用

const db = wx.cloud.database();
const admin = db.collection('adminlist');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username:"",
    password:""
  },
  //输入用户名
  inputName: function (event) {
    this.setData({
      username: event.detail
    })
  },
  //输入密码
  inputPassword(event) {
    this.setData({
      password: event.detail
    })
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
  //登陆
  login() {
    let that = this;
    //登陆获取用户信息
    admin.get({
      success: (res) => {
        let user = res.data;
        // console.log(res.data);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          if (username === user[i].name) { //用户名存在
            if (password !== user[i].password) {  //判断密码是否正确
              wx.showToast({
                title: '密码错误！！',
                icon: 'success',
                duration: 2500
              })
            } else {
              console.log('登陆成功！')
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500
              })
              wx.switchTab({   //跳转首页
                url: '/pages/shopcart/shopcart',  //这里的URL是你登录完成后跳转的界面
              })
            }
          } else {   //不存在
            wx.showToast({
              title: '无此用户名！！',
              icon: 'success',
              duration: 2500
            })
          }
        }
      }
    })
  },
  //注册
  register() {
    let that = this;
    let flag = false  //是否存在 true为存在
    //查询用户是否已经注册
    admin.get({
      success: (res) => {
        let admins = res.data;  //获取到的对象数组数据
        //  console.log(admins);
        for (let i = 0; i < admins.length; i++) {  //遍历数据库对象集合
          if (username === admins[i].username) { //用户名存在
            flag = true;
            //   break;
          }
        }
        if (flag === true) {    //已注册
          wx.showToast({
            title: '账号已注册！',
            icon: 'success',
            duration: 2500
          })
        } else {  //未注册
          that.saveuserinfo()
        }
      }
    })
  },


  //注册用户信息
  saveuserinfo() {
    // let that = this;
    admin.add({  //添加数据
      data: {
        username: username,
        password: password
      }
    }).then(res => {
      console.log('注册成功！')
      wx.showToast({
        title: '注册成功！',
        icon: 'success',
        duration: 3000
      })
      wx.redirectTo({
        url: '/pages/parents/account/account',
      })
    })
  },
})