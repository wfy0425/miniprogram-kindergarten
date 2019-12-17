//app.js
wx.cloud.init({
    env: 'cloud-zhiai-8dv2t'
})
const util = require('./utils/util.js');
App({
    onLaunch: function() {

        var that = this
        wx.clearStorage()

    },

    globalData: {
        userInfo: "StorageUserInfo",
        wechatNickName: '',
        wechatAvatarUrl: '',
        currentUserName: null
    }
})