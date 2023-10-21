//app.js
wx.cloud.init({
    env: 'zhiai-0g01wvvc0b5980e9',
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