// pages/staffs/16pf/history/history.js
const db = wx.cloud.database();
import Toast from '../../../../vant/toast/toast';
var PinyinMatch = require('pinyin-match');
const collection = db.collection("16pf");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '/images/logo.jpg',
        bannerUrl: '/images/banner.svg',
        searchValue: '',
        searchResultDatas: [],
        dataList: [],
        page: 0,
        pageSize: 20
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var startCount = 0
        var dataList = new Array();
        var totalCount = 0;
        // 获取总数
        collection.count({
            success: function(res) {
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
        // console.log(parseInt(startCount) <= parseInt(totalCount))
        // while (parseInt(startCount) <= parseInt(totalCount)) {
        //     console.log("while")
        //         // 获取前十条
        //     try {
        //         collection.limit(that.data.pageSize).skip(startCount) // 限制返回数量为 10 条
        //             .orderBy('name', 'asc')
        //             .get({
        //                 success: function(res) {
        //                     // res.data 是包含以上定义的两条记录的数组

        //                     for (var i = 0; i < res.data.length; i++) {

        //                         dataList.push(res.data[i]);
        //                     }
        //                 },
        //                 fail: function(event) { console.error(e) }
        //             })
        //     } catch (e) {
        //         console.error(e);
        //     }
        //     startCount += that.data.pageSize;

        // }

        wx.cloud.callFunction({
            // 云函数名称
            name: 'getAllField',
            // 传给云函数的参数
            data: {
                collection: '16pf',
            },
            success: function(res) {
                var cResult = res.result;
                dataList = res.result.data
                let searchData = dataList.map(function(item) {
                    console.log(item)
                    return {
                        key: that.data.searchValue,
                        name: item.name
                    }
                })
                that.setData({
                    dataList,
                    searchData,
                    searchResultDatas: dataList
                })
            },
            fail: console.error
        })
        Toast.clear();

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
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },


    onChange(e) {
        this.setData({
            searchValue: e.detail
        });
    },

    onSearch: function(e) {
        var that = this;


        let searchValue = this.data.searchValue

        if (!searchValue) {
            this.onLoad;
            return
        }
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
            if (PinyinMatch.match(this.data.dataList[i].name, searchValue)) {
                searchResult[j++] = this.data.dataList[i]
            }
        }
        console.log(searchResult)
        let searchData = searchResult.map(function(res) {
            return { key: searchValue, name: res.name }
        })
        that.setData({
            searchData,
            searchResultDatas: searchResult
        })

        Toast.clear();
    },


    chooseSearchResultAction: function(e) {
        console.log(e.target.dataset.id)
        wx.navigateTo({
            url: '/pages/staffs/16pf/score/score?_id=' + e.target.dataset.id,
        })
    }
})