//app.js
wx.cloud.init({
    env: 'cloud-zhiai-8dv2t',
    traceUser: true,
})
const util = require('./utils/util.js');
App({
    onLaunch: function() {

        var that = this
        wx.clearStorage()

    },

    globalData: {
        userInfo: null,
        currentUserName: null,
        isAdmin: false,
        linkId: '',
        openid: ''
    }
})