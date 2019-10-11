const util = require('../../utils/util.js');  
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentLoaded: false,
    imagesLoaded: false,
    commentLoaded: false,
    detail: {},
    imageUrls: [],
    inputBoxShow: true,
    maxContentLength: 300,
    comment: '',
    comments: [],
    postid: '',
    comment_value: ''
  },
  refreshComment: function(postid){
    var that = this
    wx.cloud.callFunction({
      name: 'get_comment_for_post',
      data: {
        postid: postid,
      },
      success: function (res) {
        console.log(res.result.comment_list.data)
        console.log("获取评论成功")
        var commentList = res.result.comment_list.data
        for (let i = 0; i < commentList.length; i++) {
          commentList[i].time = util.formatTime(new Date(commentList[i].time))
        }
        that.setData({
          comments: res.result.comment_list.data,
          commentLoaded: true
        })
        that.checkLoadFinish()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    /*为什么失败了，小程序端
    const db = wx.cloud.database({
      env: "rss-hub-test-898ca3"
    })
    const _ = db.command
    const collection = db.collection('post_collection')
    const record = collection.doc(options.postid)
    record.get({
      success: function (res) {
        console.log(res.data)
      }
    })
    */

    // 更新浏览次数，TODO本地如何及时同步
    wx.cloud.callFunction({
      name: 'update_watch_count',
      data: {
        postid: options.postid
      },
      success: function (res) {
        console.log('更新成功')
      }
    })

    // 获取内容
    wx.cloud.callFunction({
      // 云函数名称 
      name: 'get_post_detail',
      data: {
        postid: options.postid
      },
      success: function (res) {
        console.log('获取成功')
        var postdetail = res.result.postdetail.data[0];
        console.log(postdetail)
        postdetail.publish_time = util.formatTime(new Date(postdetail.publish_time))
        that.setData({
          detail: postdetail,
          contentLoaded: true
        })
        that.downloadImages(postdetail.image_url)
      },
      fail: console.error
    })
    this.setData({
      postid: options.postid
    }
    )

    // 获取评论
    this.refreshComment(options.postid)

  },
  /**
   * 从数据库获取图片的fileId，然后去云存储下载，最后加载出来
   */
  downloadImages: function(image_urls){
    var that = this
    if(image_urls.length == 0){
      that.setData({
        imageUrls: [],
        imagesLoaded: true
      })
    } else {
      var urls = []
      for(let i = 0; i < image_urls.length; i++) {
        wx.cloud.downloadFile({
          fileID: image_urls[i],
          success: res => {
            // get temp file path
            console.log(res.tempFilePath)
            urls.push(res.tempFilePath)
            if (urls.length == image_urls.length) {
              console.log(urls)
              that.setData({
                imageUrls: urls,
                imagesLoaded: true
              })
              this.checkLoadFinish()
            }
          },
          fail: err => {
            // handle error
          }
        })

      }
    }
    this.checkLoadFinish()
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

  sendComment: function() {
    var that = this
    if (this.data.comment.length < 1) {
      wx.showToast({
        image: '../../images/warn.png',
        title: '评论不能为空',
      })
      return
    }
    wx.showLoading({
      title: '发布中',
    })
    wx.cloud.callFunction({
      // 云函数名称 
      name: 'add_comment',
      data: {
        postid: this.data.detail._id,
        openid: app.globalData.openId,
        name: app.globalData.wechatNickName,
        avatarUrl: app.globalData.wechatAvatarUrl,
        content: this.data.comment
      },
      success: function (res) {
        
        wx.hideLoading()
        // this that 很迷
        that.refreshComment(that.data.postid)
        that.setData({
          comment_value: ''
        })
      }
    })

  },

  deletePost: function () {
    wx.showLoading({
      title: '删除中',
    })
    console.log(this.data.postid)
    wx.cloud.callFunction({
      // 云函数名称 
      name: 'delete_post',
      data: {
        postid: this.data.postid
        // openid: app.globalData.openId,
      },

      success: res => {
        console.log(this.data.detail._id)
        wx.showToast({
          title: '[云函数] [delete_post] 删除成功！！',
        })
        console.log('[云函数] [delete_post] 删除成功！！ ', res)

        wx.hideLoading();
      },
      fail: err => {
        wx.showToast({
          title: '[云函数] [delete_post] 调用失败' + err,
        })
        console.error('[云函数] [delete_post] 调用失败', err)
      }
    })
    wx.cloud.callFunction({
      // 云函数名称 
      name: 'delete_comment',
      data: {
        postid: this.data.postid
        // openid: app.globalData.openId,
      },

      success: res => {
        // console.log(this.data.detail._id)
        // wx.showToast({
        //   title: '[云函数] [delete_comment] 删除成功！！',
        // })
        // console.log('[云函数] [delete_comment] 删除成功！！ ', res)
        // 强制刷新，这个传参很粗暴
        var pages = getCurrentPages();             //  获取页面栈
        var prevPage = pages[pages.length - 2];    // 上一个页面
        prevPage.setData({
          update: true
        })
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      },
      fail: err => {
        wx.showToast({
          title: '[云函数] [delete_comment] 调用失败' + err,
        })
        console.error('[云函数] [delete_comment] 调用失败', err)
      }
    })
  },

  modifyContent: function () {
    var that = this
    if (this.data.comment.length < 1) {
      wx.showToast({
        image: '../../images/warn.png',
        title: '评论不能为空',
      })
      return
    }
    wx.showLoading({
      title: '发布中',
    })
    wx.cloud.callFunction({
      // 云函数名称 
      name: 'add_comment',
      data: {
        postid: this.data.detail._id,
        openid: app.globalData.openId,
        name: app.globalData.wechatNickName,
        avatarUrl: app.globalData.wechatAvatarUrl,
        content: this.data.comment
      },
      success: function (res) {

        wx.hideLoading()
        // this that 很迷
        that.refreshComment(that.data.postid)
        that.setData({
          comment_value: ''
        })
      }
    })

  },
  input: function (e) {//就是this.deta.comment_value应该
    if (e.detail.value.length >= this.data.maxContentLength) {
      wx.showToast({
        title: '已达到最大字数限制',
      })
    }
    this.setData({
      comment: e.detail.value
    })
  },
  checkLoadFinish: function() {
    if (this.data.contentLoaded
          && this.data.imagesLoaded
          && this.data.commentLoaded){
      wx.hideLoading()
    }
  }

})
