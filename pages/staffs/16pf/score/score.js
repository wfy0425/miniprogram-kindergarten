// pages/staffs/16pf/16pf.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '/images/logo.svg',
        bannerUrl: '/images/banner.svg',
        A: null,
        B: null,
        C: null,
        E: null,
        F: null,
        G: null,
        H: null,
        I: null,
        L: null,
        M: null,
        N: null,
        O: null,
        Q1: null,
        Q2: null,
        Q3: null,
        Q4: null,
        X1: null,
        X2: null,
        X3: null,
        X4: null,
        Y1: null,
        Y2: null,
        Y3: null,
        Y4: null,
        show: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var id = options._id;
        var that = this;
        wx.getStorage({
            key: 'a',
            success(res) {
                console.log(res.data)
                that.setData({
                    A: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'b',
            success(res) {
                console.log(res.data)
                that.setData({
                    B: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'c',
            success(res) {
                console.log(res.data)
                that.setData({
                    C: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'e',
            success(res) {
                console.log(res.data)
                that.setData({
                    E: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'f',
            success(res) {
                console.log(res.data)
                that.setData({
                    F: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'g',
            success(res) {
                console.log(res.data)
                that.setData({
                    G: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'h',
            success(res) {
                console.log(res.data)
                that.setData({
                    H: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'i',
            success(res) {
                console.log(res.data)
                that.setData({
                    I: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'l',
            success(res) {
                console.log(res.data)
                that.setData({
                    L: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'm',
            success(res) {
                console.log(res.data)
                that.setData({
                    M: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'n',
            success(res) {
                console.log(res.data)
                that.setData({
                    N: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'o',
            success(res) {
                console.log(res.data)
                that.setData({
                    O: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'q1',
            success(res) {
                console.log(res.data)
                that.setData({
                    Q1: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'q2',
            success(res) {
                console.log(res.data)
                that.setData({
                    Q2: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'q3',
            success(res) {
                console.log(res.data)
                that.setData({
                    Q3: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'q4',
            success(res) {
                console.log(res.data)
                that.setData({
                    Q4: res.data,
                })
            }
        })

        this.onSubmit();
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
    onChangeA(event) {
        // event.detail 为当前输入的值
        this.setData({
            A: event.detail
        })

    },
    onChangeB(event) {
        // event.detail 为当前输入的值
        this.setData({
            B: event.detail
        })

    },
    onChangeC(event) {
        // event.detail 为当前输入的值
        this.setData({
            C: event.detail
        })

    },
    onChangeE(event) {
        // event.detail 为当前输入的值
        this.setData({
            E: event.detail
        })

    },
    onChangeF(event) {
        // event.detail 为当前输入的值
        this.setData({
            F: event.detail
        })

    },
    onChangeG(event) {
        // event.detail 为当前输入的值
        this.setData({
            G: event.detail
        })

    },
    onChangeH(event) {
        // event.detail 为当前输入的值
        this.setData({
            H: event.detail
        })

    },
    onChangeI(event) {
        // event.detail 为当前输入的值
        this.setData({
            I: event.detail
        })

    },
    onChangeL(event) {
        // event.detail 为当前输入的值
        this.setData({
            L: event.detail
        })

    },
    onChangeM(event) {
        // event.detail 为当前输入的值
        this.setData({
            M: event.detail
        })

    },
    onChangeN(event) {
        // event.detail 为当前输入的值
        this.setData({
            N: event.detail
        })
    },
    onChangeO(event) {
        // event.detail 为当前输入的值
        this.setData({
            O: event.detail
        })
    },
    onChangeQ1(event) {
        // event.detail 为当前输入的值
        this.setData({
            Q1: event.detail
        })
    },
    onChangeQ2(event) {
        // event.detail 为当前输入的值
        this.setData({
            Q2: event.detail
        })
    },
    onChangeQ3(event) {
        // event.detail 为当前输入的值
        this.setData({
            Q3: event.detail
        })
    },
    onChangeQ4(event) {
        // event.detail 为当前输入的值
        this.setData({
            Q4: event.detail
        })
    },

    onSubmit(event) {
        if (this.data.A <= 1) {
            this.setData({
                A: 1
            })
        } else if (this.data.A <= 3) {
            this.setData({
                A: 2
            })
        } else if (this.data.A <= 5) {
            this.setData({
                A: 3
            })
        } else if (this.data.A <= 6) {
            this.setData({
                A: 4
            })
        } else if (this.data.A <= 8) {
            this.setData({
                A: 5
            })
        } else if (this.data.A <= 11) {
            this.setData({
                A: 6
            })
        } else if (this.data.A <= 13) {
            this.setData({
                A: 7
            })
        } else if (this.data.A <= 14) {
            this.setData({
                A: 8
            })
        } else if (this.data.A <= 16) {
            this.setData({
                A: 9
            })
        } else if (this.data.A <= 20) {
            this.setData({
                A: 10
            })
        }

        if (this.data.A <= 1) {
            this.setData({
                A: 1
            })
        } else if (this.data.A <= 3) {
            this.setData({
                A: 2
            })
        } else if (this.data.A <= 5) {
            this.setData({
                A: 3
            })
        } else if (this.data.A <= 6) {
            this.setData({
                A: 4
            })
        } else if (this.data.A <= 8) {
            this.setData({
                A: 5
            })
        } else if (this.data.A <= 11) {
            this.setData({
                A: 6
            })
        } else if (this.data.A <= 13) {
            this.setData({
                A: 7
            })
        } else if (this.data.A <= 14) {
            this.setData({
                A: 8
            })
        } else if (this.data.A <= 16) {
            this.setData({
                A: 9
            })
        } else if (this.data.A <= 20) {
            this.setData({
                A: 10
            })
        }

        if (this.data.B <= 3) {
            this.setData({
                B: 1
            })
        } else if (this.data.B <= 4) {
            this.setData({
                B: 2
            })
        } else if (this.data.B <= 5) {
            this.setData({
                B: 3
            })
        } else if (this.data.B <= 6) {
            this.setData({
                B: 4
            })
        } else if (this.data.B <= 7) {
            this.setData({
                B: 5
            })
        } else if (this.data.B <= 8) {
            this.setData({
                B: 6
            })
        } else if (this.data.B <= 9) {
            this.setData({
                B: 7
            })
        } else if (this.data.B <= 10) {
            this.setData({
                B: 8
            })
        } else if (this.data.B <= 11) {
            this.setData({
                B: 9
            })
        } else if (this.data.B <= 13) {
            this.setData({
                B: 10
            })
        }

        if (this.data.C <= 5) {
            this.setData({
                C: 1
            })
        } else if (this.data.C <= 7) {
            this.setData({
                C: 2
            })
        } else if (this.data.C <= 9) {
            this.setData({
                C: 3
            })
        } else if (this.data.C <= 11) {
            this.setData({
                C: 4
            })
        } else if (this.data.C <= 13) {
            this.setData({
                C: 5
            })
        } else if (this.data.C <= 16) {
            this.setData({
                C: 6
            })
        } else if (this.data.C <= 18) {
            this.setData({
                C: 7
            })
        } else if (this.data.C <= 20) {
            this.setData({
                C: 8
            })
        } else if (this.data.C <= 22) {
            this.setData({
                C: 9
            })
        } else if (this.data.C <= 26) {
            this.setData({
                C: 10
            })
        }

        if (this.data.E <= 2) {
            this.setData({
                E: 1
            })
        } else if (this.data.E <= 4) {
            this.setData({
                E: 2
            })
        } else if (this.data.E <= 5) {
            this.setData({
                E: 3
            })
        } else if (this.data.E <= 7) {
            this.setData({
                E: 4
            })
        } else if (this.data.E <= 9) {
            this.setData({
                E: 5
            })
        } else if (this.data.E <= 12) {
            this.setData({
                E: 6
            })
        } else if (this.data.E <= 14) {
            this.setData({
                E: 7
            })
        } else if (this.data.E <= 16) {
            this.setData({
                E: 8
            })
        } else if (this.data.E <= 18) {
            this.setData({
                E: 9
            })
        } else if (this.data.E <= 26) {
            this.setData({
                E: 10
            })
        }

        if (this.data.F <= 3) {
            this.setData({
                F: 1
            })
        } else if (this.data.F <= 4) {
            this.setData({
                F: 2
            })
        } else if (this.data.F <= 6) {
            this.setData({
                F: 3
            })
        } else if (this.data.F <= 7) {
            this.setData({
                F: 4
            })
        } else if (this.data.F <= 9) {
            this.setData({
                F: 5
            })
        } else if (this.data.F <= 12) {
            this.setData({
                F: 6
            })
        } else if (this.data.F <= 14) {
            this.setData({
                F: 7
            })
        } else if (this.data.F <= 16) {
            this.setData({
                F: 8
            })
        } else if (this.data.F <= 18) {
            this.setData({
                F: 9
            })
        } else if (this.data.F <= 26) {
            this.setData({
                F: 10
            })
        }

        if (this.data.F <= 3) {
            this.setData({
                F: 1
            })
        } else if (this.data.F <= 4) {
            this.setData({
                F: 2
            })
        } else if (this.data.F <= 6) {
            this.setData({
                F: 3
            })
        } else if (this.data.F <= 7) {
            this.setData({
                F: 4
            })
        } else if (this.data.F <= 9) {
            this.setData({
                F: 5
            })
        } else if (this.data.F <= 12) {
            this.setData({
                F: 6
            })
        } else if (this.data.F <= 14) {
            this.setData({
                F: 7
            })
        } else if (this.data.F <= 16) {
            this.setData({
                F: 8
            })
        } else if (this.data.F <= 18) {
            this.setData({
                F: 9
            })
        } else if (this.data.F <= 26) {
            this.setData({
                F: 10
            })
        }


        if (this.data.G <= 5) {
            this.setData({
                G: 1
            })
        } else if (this.data.G <= 7) {
            this.setData({
                G: 2
            })
        } else if (this.data.G <= 9) {
            this.setData({
                G: 3
            })
        } else if (this.data.G <= 10) {
            this.setData({
                G: 4
            })
        } else if (this.data.G <= 12) {
            this.setData({
                G: 5
            })
        } else if (this.data.G <= 14) {
            this.setData({
                G: 6
            })
        } else if (this.data.G <= 16) {
            this.setData({
                G: 7
            })
        } else if (this.data.G <= 17) {
            this.setData({
                G: 8
            })
        } else if (this.data.G <= 18) {
            this.setData({
                G: 9
            })
        } else if (this.data.G <= 20) {
            this.setData({
                G: 10
            })
        }

        if (this.data.H <= 1) {
            this.setData({
                H: 1
            })
        } else if (this.data.H <= 2) {
            this.setData({
                H: 2
            })
        } else if (this.data.H <= 3) {
            this.setData({
                H: 3
            })
        } else if (this.data.H <= 6) {
            this.setData({
                H: 4
            })
        } else if (this.data.H <= 8) {
            this.setData({
                H: 5
            })
        } else if (this.data.H <= 11) {
            this.setData({
                H: 6
            })
        } else if (this.data.H <= 14) {
            this.setData({
                H: 7
            })
        } else if (this.data.H <= 16) {
            this.setData({
                H: 8
            })
        } else if (this.data.H <= 19) {
            this.setData({
                H: 9
            })
        } else if (this.data.H <= 26) {
            this.setData({
                H: 10
            })
        }

        if (this.data.I <= 5) {
            this.setData({
                I: 1
            })
        } else if (this.data.I <= 6) {
            this.setData({
                I: 2
            })
        } else if (this.data.I <= 8) {
            this.setData({
                I: 3
            })
        } else if (this.data.I <= 10) {
            this.setData({
                I: 4
            })
        } else if (this.data.I <= 12) {
            this.setData({
                I: 5
            })
        } else if (this.data.I <= 13) {
            this.setData({
                I: 6
            })
        } else if (this.data.I <= 14) {
            this.setData({
                I: 7
            })
        } else if (this.data.I <= 16) {
            this.setData({
                I: 8
            })
        } else if (this.data.I <= 17) {
            this.setData({
                I: 9
            })
        } else if (this.data.I <= 19) {
            this.setData({
                I: 10
            })
        }

        if (this.data.L <= 3) {
            this.setData({
                L: 1
            })
        } else if (this.data.L <= 5) {
            this.setData({
                L: 2
            })
        } else if (this.data.L <= 6) {
            this.setData({
                L: 3
            })
        } else if (this.data.L <= 8) {
            this.setData({
                L: 4
            })
        } else if (this.data.L <= 10) {
            this.setData({
                L: 5
            })
        } else if (this.data.L <= 12) {
            this.setData({
                L: 6
            })
        } else if (this.data.L <= 13) {
            this.setData({
                L: 7
            })
        } else if (this.data.L <= 15) {
            this.setData({
                L: 8
            })
        } else if (this.data.L <= 16) {
            this.setData({
                L: 9
            })
        } else if (this.data.L <= 20) {
            this.setData({
                L: 10
            })
        }

        if (this.data.M <= 5) {
            this.setData({
                M: 1
            })
        } else if (this.data.M <= 7) {
            this.setData({
                M: 2
            })
        } else if (this.data.M <= 9) {
            this.setData({
                M: 3
            })
        } else if (this.data.M <= 11) {
            this.setData({
                M: 4
            })
        } else if (this.data.M <= 13) {
            this.setData({
                M: 5
            })
        } else if (this.data.M <= 15) {
            this.setData({
                M: 6
            })
        } else if (this.data.M <= 17) {
            this.setData({
                M: 7
            })
        } else if (this.data.M <= 19) {
            this.setData({
                M: 8
            })
        } else if (this.data.M <= 20) {
            this.setData({
                M: 9
            })
        } else if (this.data.M <= 26) {
            this.setData({
                M: 10
            })
        }

        if (this.data.N <= 2) {
            this.setData({
                N: 1
            })
        } else if (this.data.N <= 3) {
            this.setData({
                N: 2
            })
        } else if (this.data.N <= 4) {
            this.setData({
                N: 3
            })
        } else if (this.data.N <= 6) {
            this.setData({
                N: 4
            })
        } else if (this.data.N <= 8) {
            this.setData({
                N: 5
            })
        } else if (this.data.N <= 10) {
            this.setData({
                N: 6
            })
        } else if (this.data.N <= 11) {
            this.setData({
                N: 7
            })
        } else if (this.data.N <= 13) {
            this.setData({
                N: 8
            })
        } else if (this.data.N <= 14) {
            this.setData({
                N: 9
            })
        } else if (this.data.N <= 20) {
            this.setData({
                N: 10
            })
        }

        if (this.data.O <= 2) {
            this.setData({
                O: 1
            })
        } else if (this.data.O <= 3) {
            this.setData({
                O: 2
            })
        } else if (this.data.O <= 4) {
            this.setData({
                O: 3
            })
        } else if (this.data.O <= 6) {
            this.setData({
                O: 4
            })
        } else if (this.data.O <= 8) {
            this.setData({
                O: 5
            })
        } else if (this.data.O <= 10) {
            this.setData({
                O: 6
            })
        } else if (this.data.O <= 11) {
            this.setData({
                O: 7
            })
        } else if (this.data.O <= 13) {
            this.setData({
                O: 8
            })
        } else if (this.data.O <= 14) {
            this.setData({
                O: 9
            })
        } else if (this.data.O <= 20) {
            this.setData({
                O: 10
            })
        }

        if (this.data.Q1 <= 4) {
            this.setData({
                Q1: 1
            })
        } else if (this.data.Q1 <= 5) {
            this.setData({
                Q1: 2
            })
        } else if (this.data.Q1 <= 7) {
            this.setData({
                Q1: 3
            })
        } else if (this.data.Q1 <= 8) {
            this.setData({
                Q1: 4
            })
        } else if (this.data.Q1 <= 10) {
            this.setData({
                Q1: 5
            })
        } else if (this.data.Q1 <= 12) {
            this.setData({
                Q1: 6
            })
        } else if (this.data.Q1 <= 13) {
            this.setData({
                Q1: 7
            })
        } else if (this.data.Q1 <= 14) {
            this.setData({
                Q1: 8
            })
        } else if (this.data.Q1 <= 15) {
            this.setData({
                Q1: 9
            })
        } else if (this.data.Q1 <= 20) {
            this.setData({
                Q1: 10
            })
        }

        if (this.data.Q2 <= 5) {
            this.setData({
                Q2: 1
            })
        } else if (this.data.Q2 <= 7) {
            this.setData({
                Q2: 2
            })
        } else if (this.data.Q2 <= 8) {
            this.setData({
                Q2: 3
            })
        } else if (this.data.Q2 <= 10) {
            this.setData({
                Q2: 4
            })
        } else if (this.data.Q2 <= 12) {
            this.setData({
                Q2: 5
            })
        } else if (this.data.Q2 <= 14) {
            this.setData({
                Q2: 6
            })
        } else if (this.data.Q2 <= 15) {
            this.setData({
                Q2: 7
            })
        } else if (this.data.Q2 <= 17) {
            this.setData({
                Q2: 8
            })
        } else if (this.data.Q2 <= 18) {
            this.setData({
                Q2: 9
            })
        } else if (this.data.Q2 <= 20) {
            this.setData({
                Q2: 10
            })
        }

        if (this.data.Q3 <= 4) {
            this.setData({
                Q3: 1
            })
        } else if (this.data.Q3 <= 6) {
            this.setData({
                Q3: 2
            })
        } else if (this.data.Q3 <= 8) {
            this.setData({
                Q3: 3
            })
        } else if (this.data.Q3 <= 10) {
            this.setData({
                Q3: 4
            })
        } else if (this.data.Q3 <= 12) {
            this.setData({
                Q3: 5
            })
        } else if (this.data.Q3 <= 14) {
            this.setData({
                Q3: 6
            })
        } else if (this.data.Q3 <= 15) {
            this.setData({
                Q3: 7
            })
        } else if (this.data.Q3 <= 17) {
            this.setData({
                Q3: 8
            })
        } else if (this.data.Q3 <= 18) {
            this.setData({
                Q3: 9
            })
        } else if (this.data.Q3 <= 20) {
            this.setData({
                Q3: 10
            })
        }

        if (this.data.Q4 <= 2) {
            this.setData({
                Q4: 1
            })
        } else if (this.data.Q4 <= 4) {
            this.setData({
                Q4: 2
            })
        } else if (this.data.Q4 <= 6) {
            this.setData({
                Q4: 3
            })
        } else if (this.data.Q4 <= 7) {
            this.setData({
                Q4: 4
            })
        } else if (this.data.Q4 <= 11) {
            this.setData({
                Q4: 5
            })
        } else if (this.data.Q4 <= 14) {
            this.setData({
                Q4: 6
            })
        } else if (this.data.Q4 <= 16) {
            this.setData({
                Q4: 7
            })
        } else if (this.data.Q4 <= 19) {
            this.setData({
                Q4: 8
            })
        } else if (this.data.Q4 <= 21) {
            this.setData({
                Q4: 9
            })
        } else if (this.data.Q4 <= 26) {
            this.setData({
                Q4: 10
            })
        }

        var X1 = ((38 + 2 * this.data.L + 3 * this.data.O + 4 * this.data.Q4) - (2 * this.data.C + 2 * this.data.H + 2 * this.data.Q2)) / 10;
        this.setData({
            X1: X1
        })
        var X2 = ((2 + this.data.A + 3 * this.data.E + 4 * this.data.F + 5 * this.data.H) - (2 * this.data.Q2 + 11)) / 10;
        this.setData({
            X2: X2
        })
        var X3 = ((77 + 2 * this.data.C + 2 * this.data.E + 2 * this.data.F + 2 * this.data.N) - (4 * this.data.A + 6 * this.data.H + this.data.I + 2 * this.data.M)) / 10;
        this.setData({
            X3: X3
        })
        var X4 = ((4 * this.data.E + 3 * this.data.M + 4 * this.data.Q1 + 4 * this.data.Q2) - (3 * this.data.A + 2 * this.data.G)) / 10;
        this.setData({
            X4: X4
        })
        var Y1 = (this.data.C + this.data.F + 11 - this.data.O + 11 - this.data.Q4);
        this.setData({
            Y1: Y1
        })
        var Y2 = (2 * this.data.Q3 + 2 * this.data.G + this.data.E + this.data.N + this.data.Q2 + this.data.Q1);
        this.setData({
            Y2: Y2
        })
        var Y3 = ((11 - this.data.A) * 2 + this.data.B * 2 + this.data.E + (11 - this.data.F) * 2 + this.data.H + this.data.I * 2 + this.data.M + (11 - this.data.N) + this.data.Q1 + this.data.Q2 * 2);
        this.setData({
            Y3: Y3
        })
        var Y4 = (this.data.B + this.data.G + this.data.Q3 + (11 - this.data.F));
        this.setData({
            Y4: Y4
        })
        this.setData({
            show: true
        })
    },
})