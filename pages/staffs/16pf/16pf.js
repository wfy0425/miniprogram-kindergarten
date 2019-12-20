// pages/staffs/16pf/16pf.js
const db = wx.cloud.database()
const qnaire = require("./questions.js") //导入题库
var ans;
Page({

  /**
   * 页面的初始数据
   */


  data: {
    qnaire: qnaire.qnaire,
    questionLength: qnaire.qnaire.length,
    answer: ans,
    currentQuestion: 0,
    hide:true,
    fieldError: false,
    name:"",
    precaution: "&emsp;&emsp;卡特尔16种性格因素测验从乐群性，智慧性，稳定性，影响性，活泼性，有恒性，交际性，情感性，怀疑性，想象性，世故性，忧虑性，变革性，独立性，自律性，紧张性16个相对独立的性格维度对人进行评价，能够较全面地反映人的性格特点，该测验共由187道题组成，在职业指导及人员选拔领域被广泛运用。\n&emsp;&emsp;本测试包括一些有关个人生活情形的问题，每个人对这些问题会有不同的看法，每个人的回答也就自然会有所不同。因而对问题如何回答，不存在“对”与“不对”之分，只是表明您对这些问题的态度。请您尽量表达您个人的意见，不要有所顾忌。\n&emsp;&emsp;每一个问题都有三个被选项，但您对每个问题只能选择一个项目。请尽量少选中性答案。每个问题都要回答。务必请您根据自己的实际情况回答。对每个问题不要过多考虑，请尽快回答。"
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    ans = new Array(this.data.questionLength);
    for (var j = 0, len = ans.length; j < len; j++) {
      ans[j]=-1;
    }
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

  inputName: function (value) {
    this.setData({
      name: value.detail
    })
  },

  nameSubmit: function(e) {
    if (this.data.name) {
      this.setData({
        hide: false
      })}
    else{
      this.setData({
        fieldError: true
      })
    }
  },

  changeQuestion: function (event) {
    this.setData({
      currentQuestion: event.detail.current,
    });
  },

  radioChange: function(e) {
    console.log(e.detail.value)
  },

  nextQ: function() {
    if (this.data.currentQuestion < this.data.questionLength) {
      this.setData({
        currentQuestion: this.data.currentQuestion + 1,
      })
    }
  },

  prevQ: function(e) {
    if (this.data.currentQuestion >= 0) {
      this.setData({
        currentQuestion: this.data.currentQuestion - 1,
      })
    }
  },

  submit: function(e) {
    console.log(e.detail.value);
    ans[this.data.currentQuestion] = e.detail.value.answer;
    this.setData({
      answer: ans,
    })
    console.log(this.data.answer);

  },

  //判断答题完成情况
  formSubmit: function() {
    var finish = true;
    var i = 0;
    var that = this;
    while (i < this.data.questionLength) {
      if (ans[i] == -1) {
        finish = false;
        break;
        }
      i++;
    }
    if (finish == false) {
      wx.showModal({
        title: '无法提交',
        content: '您还有部分题目未完成，请检查后重新提交',
        showCancel: false,
        confirmColor: '#fcbe39',
        confirmText: "好的",
        success(res) {
          that.setData({
            currentQuestion: i,
          })
        }
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function() {
        wx.hideLoading({
          success(res) {
            that.answer2db();
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }, 2000)
    }
  },

  //将用户完成的答案数组上传至云数据库
  answer2db: function() {
    db.collection('16pf').add({
      data: {
        name:this.data.name,
        answer: this.data.answer
      },
      success(res) {
        console.log(res._id);
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})