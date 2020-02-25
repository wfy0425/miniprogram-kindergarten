let app = getApp();
const db = wx.cloud.database();
const collection = db.collection('babyQAPost');
import Toast from '../../../vant/toast/toast';
// pages/parents/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '../../../images/logo.jpg',
        bannerUrl: '../../../images/banner.png',
        imgUrls: [
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/娱乐区淘气堡.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/休息区.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/前台.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/女卫.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/男卫.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/海洋球池.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/二层大教室角度A.jpg',
            'cloud://cloud-zhiai-8dv2t.636c-cloud-zhiai-8dv2t-1300754910/img/多功能影音室.jpg'
        ],
        articleList: [],
        page: 0,
        totalCount: 0,
        pageSize: 10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var page = this.data.page;
        var startCount = page * this.data.pageSize


        // 获取总数
        collection.count({
            success: function(res) {
                that.setData({
                    totalCount: res.total
                })
                console.log("totalCount:" + res.total)
            },
            fail: console.error
        })
        this.refresh(startCount);
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
    onReachBottom: function() {
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
    onShareAppMessage: function() {

    },

    detail: function(event) {
        var postId = event.currentTarget.dataset.id
        wx.navigateTo({
            url: 'postDetail/postDetail?id=' + postId
        });

    },

    /**
     * 获取列表数据
     * 
     */
    refresh: function(startCount) {
        var that = this;
        console.log("startCount--->" + startCount);

        // 获取前十条
        try {
            collection.limit(that.data.pageSize).skip(startCount) // 限制返回数量为 10 条
                .orderBy('_id', 'asc')
                .get({
                    success: function(res) {
                        // res.data 是包含以上定义的两条记录的数组
                        console.log(res.data)
                        var articleList = that.data.articleList;
                        for (var i = 0; i < res.data.length; i++) {
                            articleList.push(res.data[i]);
                        }

                        that.setData({
                            articleList: articleList,
                        })
                        console.log(that.data.articleList)
                        wx.hideNavigationBarLoading(); //隐藏加载
                        wx.stopPullDownRefresh();

                    },
                    fail: function(event) {
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
})