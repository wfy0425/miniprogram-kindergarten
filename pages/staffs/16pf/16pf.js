// pages/staffs/16pf/16pf.js
const db = wx.cloud.database()
const questions = require("./questions.js") //导入题库
var ans;
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */


    data: {
        logoUrl: '../../../images/logo.jpg',
        bannerUrl: '../../../images/banner.png',
        qnaire: questions.qnaire,
        questionLength: questions.qnaire.length,
        category: questions.category,
        answer: ans,
        currentQuestion: 0,
        hide: true,
        fieldError: false,
        name: "",
        isAdmin: false
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var isAdmin = app.globalData.isAdmin

        this.setData({
            isAdmin
        })
        ans = new Array(this.data.questionLength);
        console.log(this.data.questionLength)
        for (var j = 0; j < ans.length; j++) {
            ans[j] = -1;
        }
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


    onHistory: function (value) {
        wx.navigateTo({
            url: '/pages/staffs/16pf/history/history'
        })
    },
    inputName: function (value) {
        this.setData({
            name: value.detail
        })
    },

    nameSubmit: function (e) {
        if (this.data.name) {
            this.setData({
                hide: false
            })
        } else {
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

    radioChange: function (e) {
        console.log(e.detail.value)
    },

    nextQ: function () {
        if (this.data.currentQuestion < this.data.questionLength) {
            this.setData({
                currentQuestion: this.data.currentQuestion + 1,
            })
        }
    },

    prevQ: function (e) {
        if (this.data.currentQuestion >= 0) {
            this.setData({
                currentQuestion: this.data.currentQuestion - 1,
            })
        }
    },

    submit: function (e) {
        console.log(e.detail.value);
        ans[this.data.currentQuestion] = e.detail.value.answer;
        this.setData({
            answer: ans,
        })
        console.log(this.data.answer);

    },

    //判断答题完成情况
    formSubmit: function () {
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
                title: '正在计算结果',
            })
            setTimeout(function () {
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
    answer2db: function () {
        var aScore = 0;
        var a = this.data.category.A;
        console.log()
        for (var i = 0; i < a.length; i++) {
            aScore += Number(this.data.answer[a[i]]);
        }
        var bScore = 0;
        var b = this.data.category.B;
        for (var i = 0; i < b.length; i++) {
            bScore += Number(this.data.answer[b[i]]);
        }
        var cScore = 0;
        var c = this.data.category.C;
        for (var i = 0; i < c.length; i++) {
            cScore += Number(this.data.answer[c[i]]);
        }
        var eScore = 0;
        var e = this.data.category.E;
        for (var i = 0; i < e.length; i++) {
            eScore += Number(this.data.answer[e[i]]);
        }
        var fScore = 0;
        var f = this.data.category.F;
        for (var i = 0; i < f.length; i++) {
            fScore += Number(this.data.answer[f[i]]);
        }
        var gScore = 0;
        var g = this.data.category.G;
        for (var i = 0; i < g.length; i++) {
            gScore += Number(this.data.answer[g[i]]);
        }
        var hScore = 0;
        var h = this.data.category.H;
        for (var i = 0; i < h.length; i++) {
            hScore += Number(this.data.answer[h[i]]);
        }
        var iScore = 0;
        var iarr = this.data.category.I;
        for (var i = 0; i < iarr.length; i++) {
            iScore += Number(this.data.answer[iarr[i]]);
        }
        var lScore = 0;
        var l = this.data.category.L;
        for (var i = 0; i < l.length; i++) {
            lScore += Number(this.data.answer[l[i]]);
        }
        var mScore = 0;
        var m = this.data.category.M;
        for (var i = 0; i < m.length; i++) {
            mScore += Number(this.data.answer[m[i]]);
        }
        var nScore = 0;
        var n = this.data.category.N;
        for (var i = 0; i < n.length; i++) {
            nScore += Number(this.data.answer[n[i]]);
        }
        var oScore = 0;
        var o = this.data.category.O;
        for (var i = 0; i < o.length; i++) {
            oScore += Number(this.data.answer[o[i]]);
        }
        var q1Score = 0;
        var q1 = this.data.category.Q1;
        for (var i = 0; i < q1.length; i++) {
            q1Score += Number(this.data.answer[q1[i]]);
        }
        var q2Score = 0;
        var q2 = this.data.category.Q2;
        for (var i = 0; i < q2.length; i++) {
            q2Score += Number(this.data.answer[q2[i]]);
        }
        var q3Score = 0;
        var q3 = this.data.category.Q3;
        for (var i = 0; i < q3.length; i++) {
            q3Score += Number(this.data.answer[q3[i]]);
        }
        var q4Score = 0;
        var q4 = this.data.category.Q4;
        for (var i = 0; i < q4.length; i++) {
            q4Score += Number(this.data.answer[q4[i]]);
        }



        db.collection('16pf').add({
            data: {
                name: this.data.name,
                answer: this.data.answer,
                A: aScore,
                B: bScore,
                C: cScore,
                E: eScore,
                F: fScore,
                G: gScore,
                H: hScore,
                I: iScore,
                L: lScore,
                M: mScore,
                N: nScore,
                O: oScore,
                Q1: q1Score,
                Q2: q2Score,
                Q3: q3Score,
                Q4: q4Score,
            },
            success(res) {
                console.log(res._id);
                // wx.setStorageSync('a', 1);
                // wx.setStorageSync('b', bScore);
                // wx.setStorageSync('c', cScore);
                // wx.setStorageSync('e', eScore);
                // wx.setStorageSync('f', fScore);
                // wx.setStorageSync('g', gScore);
                // wx.setStorageSync('h', hScore);
                // wx.setStorageSync('i', iScore);
                // wx.setStorageSync('l', lScore);
                // wx.setStorageSync('m', mScore);
                // wx.setStorageSync('n', nScore);
                // wx.setStorageSync('o', oScore);
                // wx.setStorageSync('q1', q1Score);
                // wx.setStorageSync('q2', q2Score);
                // wx.setStorageSync('q3', q3Score);
                // wx.setStorageSync('q4', q4Score);

                wx.navigateTo({
                    url: '/pages/staffs/16pf/score/score?_id=' + e.target.dataset.id,
                })
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