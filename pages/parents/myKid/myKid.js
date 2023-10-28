// pages/parents/myKid/myKid.js
import Toast from '../../../vant/toast/toast'
let app = getApp()
const db = wx.cloud.database()
var collection = db.collection('students_eval')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '/images/logo.jpg',
        bannerUrl: '/images/banner.png',
        date: '2020-01', //默认起始时间
        evalArry: null,
        linkId: 1234,
        page: 0,
        pageSize: 20,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        console.log(app.globalData.linkId)
        console.log('onLoad')

        //显示加载图标
        Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '加载中',
            mask: true,
        })

        //获取时间
        var time = new Date()
        this.setData({
            date: time.getFullYear() + '-' + (time.getMonth() + 1),
        })
        console.log(this.data.date)

        /*获取分页数据*/
        var startCount = 0
        var dataList = new Array()
        var totalCount = 0
        // 获取总数
        collection.count({
            success: function (res) {
                totalCount = res.total
                console.log('totalCount:' + totalCount)
            },
            fail: console.error,
        })

        /*获取前pageSize条内容*/
        collection
            .limit(that.data.pageSize) // 限制返回数量为 pageSize
            .orderBy('_id', 'asc')
            .where({
                linkId: that.data.linkId,
            })
            .get()
            .then((res) => {
                console.log(res.data)
                that.setData({
                    evalArry: res.data,
                })
                Toast.clear()
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading()
        this.onLoad()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading()
        // 停止下拉动作
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page
        if ((page + 1) * this.data.pageSize < this.data.totalCount) {
            Toast.loading({
                duration: 0,
                mask: true,
                message: '加载中...',
            })
            page++
            this.setData({
                page: page,
            })
            this.refresh(page * this.data.pageSize)

            Toast.clear()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},

    // 时间段选择
    bindDateChange(e) {
        let that = this
        console.log(e.detail.value)
        that.setData({
            date: e.detail.value,
        })

        /*从startCount开始加载，一共pageSize条*/
        var page = this.data.page
        var startCount = page * this.data.pageSize
        this.refresh(startCount)
    },
    /**
     * 获取列表数据
     *
     */
    refresh: function (startCount) {
        var that = this
        console.log('startCount--->' + startCount)

        try {
            var year_month = this.data.date.split('-')
            //调试通过：新生成一个字段birthmonth, 再筛选(match)
            const $ = db.command.aggregate
            collection
                .aggregate()
                .limit(that.data.pageSize)
                .skip(startCount) // 限制返回数量为 10 条
                .sort({
                    date: 1,
                })
                .project({
                    _id: true,
                    category: true,
                    content: true,
                    linkId: true,
                    studentId: true,
                    month: $.month('$date'),
                    year: $.year('$date'),
                })
                .match({
                    year: parseInt(year_month[0], 10),
                    month: parseInt(year_month[1], 10),
                    linkId: that.data.linkId,
                })
                .end()
                .then(
                    (res) => {
                        console.log(res)
                        that.setData({
                            evalArry: res.list,
                        })
                    },
                    (err) => {
                        console.log('error1: ', err)
                    }
                )
        } catch (e) {
            wx.hideNavigationBarLoading() //隐藏加载
            wx.stopPullDownRefresh()
            console.error(e)
        }
    },
    // utc_beijing: function (utc_datetime) {
    //   // 转为正常的时间格式 年-月-日 时:分:秒
    //   var T_pos = utc_datetime.indexOf('T');
    //   var Z_pos = utc_datetime.indexOf('Z');
    //   var year_month_day = utc_datetime.substr(0, T_pos);
    //   var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    //   var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    //   // 处理成为时间戳
    //   timestamp = new Date(Date.parse(new_datetime));
    //   timestamp = timestamp.getTime();
    //   timestamp = timestamp / 1000;

    //   // 增加8个小时，北京时间比utc时间多八个时区
    //   var timestamp = timestamp + 8 * 60 * 60;

    //   // 时间戳转为时间
    //   // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    //   var beijing_datetime = new Date(parseInt(timestamp) * 1000)
    //   return beijing_datetime; // 2017-03-31 16:02:06
    // }
})
