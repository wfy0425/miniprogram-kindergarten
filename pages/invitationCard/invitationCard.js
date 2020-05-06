let app = getApp();
const db = wx.cloud.database();
const collection = db.collection('parents_event');
const ctx = wx.createCanvasContext('myCanvas')

import Toast from '../../vant/toast/toast';
// pages/parents/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoUrl: '/images/logo.jpg',
    bannerUrl: '/images/banner.svg',
    dataList: [],
    page: 0,
    totalCount: 0,
    pageSize: 10,
    hide: true, //先显示信息输入
    adminList: false, //查看所有登记的人
    babyBirthdayPickerShow: false,
    babyBirthday: new Date().getTime(),
    openid: '',
    babyName: '',
    parentsName: '',
    parentsContact: '',
    parentsAddress: '',

    infoExist: false, //用户是否已经登记过
    submitButton: '确认',

    isAdmin: false,

    invitationCardBackgroundPath: '',

    am_pm: '',
    date: '',
    description: '',
    invitation_text_1: '',
    invitation_text_2: '',
    time: '',
    year: '',

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
    var that = this;
    var page = this.data.page;
    var startCount = page * this.data.pageSize

    //检测是不是老师
    var isAdmin = app.globalData.isAdmin
    this.setData({
      isAdmin
    })
    if (!app.globalData.openid) {
      this.onGetOpenid();
    }
    wx.cloud.callFunction({
      name: 'getWXContext',
      data: {},
      success: res => {
        console.log('[云函数] [getWXContext] user openid: ', res.result.openid)



        //检查是否已经登记过
        collection.doc(res.result.openid).get({
          success: function (res) {
            console.log(res)
            that.setData({
              infoExist: true,
              submitButton: '更新',
              babyBirthday: res.data.babyBirthday,

              babyName: res.data.babyName,
              parentsName: res.data.parentsName,
              parentsContact: res.data.parentsContact,
              parentsAddress: res.data.parentsAddress,
            })
            Toast.clear();
          },
          fail: function (res) {
            console.log(res)
            Toast.clear();
          }
        })
      },
      fail: err => {
        console.error('[云函数] [getWXContext] 调用失败', err)
      }
    })


    // 获取总数
    collection.count({
      success: function (res) {
        that.setData({
          totalCount: res.total
        })
        console.log("totalCount:" + res.total)
      },
      fail: console.error
    })
    this.refresh(startCount);

    this.setData({
      babyBirthday: this.formatter(new Date()),
    });

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          model: res.model,
          screen_width: res.windowWidth / 375,
          screen_height: res.windowHeight
        })
      }
    })

    wx.cloud.downloadFile({
      fileID: 'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/invitationCard.jpg',
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        that.setData({
          invitationCardBackgroundPath: res.tempFilePath,
        })

      },
      fail: err => {
        // handle error
        console.log(err)
        Toast.fail({
          duration: 2000,
          message: '生成邀请函失败，请稍后再试',
        })
      }
    })

    collection.doc('event_info').get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        that.setData({
          am_pm: res.data.am_pm,
          date: res.data.date,
          description: res.data.description,
          invitation_text_1: res.data.invitation_text_1,
          invitation_text_2: res.data.invitation_text_2,
          time: res.data.time,
          year: res.data.year,
        })
      }
    })


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

    wx.showNavigationBarLoading();
    this.onLoad()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.page;
    if ((page + 1) * this.data.pageSize < this.data.totalCount) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...'
      });
      page++;
      this.setData({
        page: page
      })
      this.refresh(page * this.data.pageSize);

      Toast.clear();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  detail: function (event) {
    var postId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'postDetail/postDetail?id=' + postId
    });

  },

  /**
   * 获取列表数据
   * 
   */
  refresh: function (startCount) {
    var that = this;
    console.log("startCount--->" + startCount);

    // 获取前十条
    try {
      collection.limit(that.data.pageSize).skip(startCount) // 限制返回数量为 10 条
        .orderBy('_id', 'asc')
        .get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)
            var dataList = that.data.dataList;
            for (var i = 0; i < res.data.length; i++) {
              dataList.push(res.data[i]);
            }

            that.setData({
              dataList: dataList,
            })
            console.log(that.data.dataList)
            wx.hideNavigationBarLoading(); //隐藏加载
            wx.stopPullDownRefresh();

          },
          fail: function (event) {
            wx.hideNavigationBarLoading(); //隐藏加载
            wx.stopPullDownRefresh();
          }
        })
    } catch (e) {
      wx.hideNavigationBarLoading(); //隐藏加载
      wx.stopPullDownRefresh();
      console.error(e);
    }
  },

  inputBabyName: function (value) {
    this.setData({
      babyName: value.detail
    })
  },

  inputBabyBirthday: function (event) {
    this.setData({
      babyBirthdayPickerShow: true
    });
  },
  babyBirthdayPickerClose() {
    this.setData({
      babyBirthdayPickerShow: false
    });
  },

  confirmBabyBirthday: function (event) {
    this.setData({
      babyBirthday: this.formatter(new Date(event.detail)),
      babyBirthdayPickerShow: false
    });
  },
  formatter: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(this.formatNumber).join('-')
  },
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  inputParentsName: function (value) {
    this.setData({
      parentsName: value.detail
    })
  },
  inputParentsContact: function (value) {
    this.setData({
      parentsContact: value.detail
    })
  },
  inputParentsAddress: function (value) {
    this.setData({
      parentsAddress: value.detail
    })
  },

  submit: function (e) {
    var that = this
    var complete = true;
    this.data.babyName = this.data.babyName.replace(/\s+/g, '');
    this.data.parentsName = this.data.parentsName.replace(/\s+/g, '');
    this.data.parentsContact = this.data.parentsContact.replace(/\s+/g, '');

    if (!this.data.babyName) {
      this.setData({
        babyNameError: true
      })
      complete = false;
    }
    if (!this.data.babyBirthday) {
      this.setData({
        babyBirthdayError: true
      })
      complete = false;
    }
    if (!this.data.parentsName) {
      this.setData({
        parentsNameError: true
      })
      complete = false;
    }

    if (!this.data.parentsContact || !/^\d{11}$/.test(this.data.parentsContact)) {
      this.setData({
        parentsContactError: '请输入正确的手机号'
      })
      complete = false;
    }
    if (complete) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        mask: true
      });
      console.log('complete')
      if (this.data.infoExist) {
        collection.doc(app.globalData.openid).update({
          data: {
            babyName: this.data.babyName,
            babyBirthday: this.data.babyBirthday,
            parentsName: this.data.parentsName,
            parentsContact: this.data.parentsContact,
            parentsAddress: this.data.parentsAddress,
          },
          success: function (res) {


            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id 
            console.log(res)
            Toast.clear()
            that.setData({
              hide: false
            })
          },
          fail: function (res) {
            Toast.fail({
              duration: 1000,
              message: '新增记录失败，请稍后再试',
            })
            console.log(res)
          }
        })
      } else {
        collection.add({
          data: {
            _id: app.globalData.openid,
            babyName: this.data.babyName,
            babyBirthday: this.data.babyBirthday,
            parentsName: this.data.parentsName,
            parentsContact: this.data.parentsContact,
            parentsAddress: this.data.parentsAddress,
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            Toast.clear()
            that.setData({
              hide: false
            })
          },
          fail: function (res) {
            Toast.clear();
            Toast.fail({
              duration: 1000,
              message: '新增记录失败，请稍后再试',
            })
            console.log(res)
          }
        })
      }


    }
    this.draw();
  },

  draw: function () {
    var that = this

    

    console.log('手机型号' + that.data.model, '宽' + that.data.screen_width * 375, '高' + that.data.screen_height)
    let rpx = that.data.screen_width
    ctx.drawImage(that.data.invitationCardBackgroundPath, 0, 0, 345 * rpx, 488 * rpx)
    /* 绘制文字 位置自己计算 参数自己看文档 */
    ctx.setTextAlign('center') //  位置
    ctx.setFillStyle('#c3942e') //  颜色
    ctx.font = 'normal normal 11px 标宋体';
    ctx.fillText(that.data.invitation_text_1, 345 / 2 * rpx, 260 * rpx) //  内容  不会自己换行 需手动换行
    ctx.fillText(that.data.invitation_text_2, 345 / 2 * rpx, 278 * rpx) //  内容

    ctx.setTextAlign('right') //  位置
    ctx.font = 'normal normal 35px "Courier New"';
    ctx.translate(80 * rpx, 347 * rpx)
    ctx.rotate(90 * Math.PI / 180)
    ctx.fillText(that.data.am_pm, 0 * rpx, 0 * rpx)
    ctx.rotate(270 * Math.PI / 180)
    ctx.translate(-80 * rpx, -347 * rpx)

    ctx.setTextAlign('center') //  位置
    ctx.font = 'normal normal 60px Arial';
    ctx.fillText(that.data.time, 345 / 2 * rpx, 350 * rpx)

    ctx.font = 'normal normal 25px monospace';
    ctx.fillText(that.data.year, 275 * rpx, 325 * rpx)
    ctx.font = 'normal normal 25px monospace';
    ctx.fillText(that.data.date, 275 * rpx, 350 * rpx)



    ctx.drawImage('/images/wxacode.jpg', (345 / 2 - 43) * rpx, (430 - 43) * rpx, 86 * rpx, 86 * rpx)
    ctx.draw()





  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'getWXContext',
      data: {},
      success: res => {
        console.log('[云函数] [getWXContext] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [getWXContext] 调用失败', err)
      }
    })
  },

  onGenerateInvitation: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'getWXContext',
      data: {},
      success: res => {
        console.log('[云函数] [getWXContext] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [getWXContext] 调用失败', err)
      }
    })
  },

  onAdminBotton: function (e) {
    this.setData({
      adminList: true
    })
  },

  onShare: function (e) {
    let that = this;
    let rpx = that.data.screen_width
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 345 * rpx,
      height: 488 * rpx,
      destWidth: 345 * rpx,
      destHeight: 488 * rpx,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath);
        /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })
  }
})