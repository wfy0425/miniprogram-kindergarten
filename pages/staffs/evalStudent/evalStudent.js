let app = getApp();
const db = wx.cloud.database();
import Toast from '../../../vant/toast/toast';
var PinyinMatch = require('pinyin-match');
const collection = db.collection("16pf");
// pages/parents/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoUrl: '../../../images/logo.jpg',
    bannerUrl: '../../../images/banner.svg',
    isLoadedAll: false,
    musicIndex: null,
    videoIndex: null,
    currentTabsIndex: 0,
    pageIndex: 1,
    searchValue: '',
    searchResultDatas: [],
    dataList: [],
    page: 0,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    var that = this;
    var startCount = 0
    var dataList = new Array();
    var totalCount = 0;
    // 获取总数
    collection.count({
      success: function (res) {
        totalCount = res.total
        console.log("totalCount:" + totalCount)
      },
      fail: console.error
    })
    Toast.loading({
      duration: 0,
      mask: true,
      message: '加载中...'
    });
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAllField',
      // 传给云函数的参数
      data: {
        collection: 'students',
      },
      success: function (res) {
        var cResult = res.result;
        dataList = res.result.data
        let searchData = dataList.map(function (item) {
          console.log(item)
          return {
            key: that.data.searchValue,
            name: item.name,
            id: item._id,
            img: item.img
          }
        })
        that.setData({
          dataList,
          searchData,
          searchResultDatas: dataList
        })
        Toast.clear();
      },
      fail: console.error
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onAccount: function (event) {
    wx.navigateTo({
      url: '/pages/staffs/account/account',
    })
  },
  onChange(e) {
    this.setData({
      searchValue: e.detail
    });
    var that = this;


    let searchValue = this.data.searchValue

    if (!searchValue) {
      let dataList = this.data.dataList
        let searchData = dataList.map(function (item) {
          console.log(item)
          return {
            key: that.data.searchValue,
            name: item.name,
            id: item._id,
            img: item.img
          }
        })
        that.setData({
          dataList,
          searchData,
          searchResultDatas: dataList
        })
    } else {
      var searchResult = new Array();
      var j = 0;
      for (var i = 0; i < this.data.dataList.length; i++) {
        console.log(this.data.dataList[i].name)
        console.log(PinyinMatch.match(this.data.dataList[i].name, searchValue))
        if (PinyinMatch.match(this.data.dataList[i].name, searchValue)||PinyinMatch.match(this.data.dataList[i]._id, searchValue)) {
          searchResult[j++] = this.data.dataList[i]
        }
      }
      console.log(searchResult)
      let searchData = searchResult.map(function (res) {
        return {
          key: searchValue,
          name: res.name,
            id: res._id,
            img: res.img
        }
      })
      that.setData({
        searchData,
        searchResultDatas: searchResult
      })
    }


  },

  onSearch: function (e) {
    var that = this;


    let searchValue = this.data.searchValue

    if (!searchValue) {
      let dataList = this.data.dataList
        let searchData = dataList.map(function (item) {
          console.log(item)
          return {
            key: that.data.searchValue,
            name: item.name,
            id: item._id,
            img: item.img
          }
        })
        that.setData({
          dataList,
          searchData,
          searchResultDatas: dataList
        })
    } else {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...'
      });
      var searchResult = new Array();
      var j = 0;
      for (var i = 0; i < this.data.dataList.length; i++) {
        console.log(this.data.dataList[i].name)
        console.log(PinyinMatch.match(this.data.dataList[i].name, searchValue))
        if (PinyinMatch.match(this.data.dataList[i].name, searchValue)||PinyinMatch.match(this.data.dataList[i]._id, searchValue)) {
          searchResult[j++] = this.data.dataList[i]
        }

      }
      console.log(searchResult)
      let searchData = searchResult.map(function (res) {
        return {
          key: searchValue,
          name: res.name,
            id: res._id,
            img: res.img
        }
      })
      that.setData({
        searchData,
        searchResultDatas: searchResult
      })

      Toast.clear();
    }
  },


  chooseSearchResultAction: function (e) {
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: '/pages/staffs/16pf/score/score?_id=' + e.target.dataset.id,
    })
  },

  onDetail: function(event) {
    var studentId = event.currentTarget.dataset.id
    wx.navigateTo({
        url: 'detail/detail?id=' + studentId
    });

},
})