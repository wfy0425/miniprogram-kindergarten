// pages/students/index/index.js
let app = getApp()
const db = wx.cloud.database()
const collection = db.collection('aboutus_photo')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        logoUrl: '/images/logo.jpg',
        bannerUrl: '/images/banner.png',
        imgUrls: [
            'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=b5e4c905865494ee982209191df4e0e1/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg',
            'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg',
            'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
        ],
        activeNames: ['father'], //vant折叠面板，记录当前展开的tab
        textArray: [
            {
                tittle: '我们是谁',
                text: '童心童行幼儿学院于2019年成立于北京,作为高品质的国际教育机构,我们专注为1至6岁,来自世界各地的儿童提供全方位优质的教学、成长及发展支持,满足不同家庭多元化的教育需求。我们致力于为孩子提供最好的环境和机会,在这里孩子们将充分感受到快乐、关爱及激发。\n童心童行的教育理念建立在“探究式学习”之上, 使用瑞吉欧教学法, 欣赏个体差异, 鼓励每个孩子发现独一无二的自己, 探究无限可能的世界。童心童行是孩子们快乐成长的地方, 而学习在这里也如此有趣。童心童行给孩子们提供充分探索的环境, 他们终日探究, 个性与爱好得到了极大的尊重和满足。他们永远被鼓励去尝试新的事物及挑战, 勇敢的做出自己的选择, 表达内心的声音。我们经验丰富、敬业奉献的教职团队确保每个孩子在学习和成长过程中都能得到最好的支持。\n作为教育者, 我们为孩子的发现之旅指引航向, 希望每个孩子都能通过这段旅程成为独一无二的世界公民和终身学习者。\n作为教学者, 我们一直在专业领域不断精进发展, 协同合作, 接受挑战, 不断反思, 从而成长为更好的教师。\n作为社区的一部分, 我们为孩子、家长及社区的发展提供创新性及个性化的教育支持, 搭建开放、互助的交流平台。\n让童心童行为孩子们构建出一个多元美好的成长乐园。',
            },
            {
                tittle: '我们的使命',
                text: '我们致力于建设探究式学习社区，在国际视野下培养根植于中国文化的世界公民，在探知知识的同时能够富有道德感、热心社会事务、积极奉献社区，为未来世界和崛起的中国培养具有领导力的人才。',
            },
            {
                tittle: '我们的核心价值观',
                text: '让所有的生命被温柔以待。',
            },
            {
                tittle: '我们的教学方法',
                text: '我们旨在培养孩子的好奇心和求知欲、解决问题的能力及动手实验的热情，为孩子的未来奠定坚实的基础。尤其重视通过“寓教于乐”的方式激发孩子的探究、独立性和社交互动。我们鼓励孩子们勇于尝试、积极主动、逐渐独立，以此培养孩子的独立的人格、强烈的自尊心及优秀的社会能力。我们非常重视孩子在环境中的舒适感，营造关爱呵护的环境，建立他们的环境的信任。童心童行的教育以“鼓励求知”为己任，从出生开始，儿童就拥有天然的好奇心；他们善于模仿学习，同时能够与周围的世界互动并作出解释。自出生以来儿童就被赋予了各种可适应这些学习和发展的早期阶段的独特心智能力。（《PYP从原则到实践第8页》）“基于探究的学习”指的是基于学习者的好奇心、兴趣，经历和观点而引发的问题，进行学习的过程。这一过程与“学生都积极参与自身的学习过程并承担学习的责任”为前提。\n我们建立的探究学习型社区可为学生提供机会，帮助其培养终身学习者所需要的重要技能和习惯，例如：批判性和创造创造性思维，坚持不懈的毅力、独立性和自信。在童心童行，我们致力于倡导互相尊重和热情友善的文化，我们还确定了共同遵守的行为模式，并合作创建了学习空间我们。我们鼓励儿童在学习的过程中发表自己的观点并作出选择，我们希望父母能成为帮助儿童发展的合作伙伴。',
            },
            {
                tittle: '我们的教育模式',
                text: '让学习变得更有趣！\n寓教于乐，孩子们天生爱玩，没有什么比在游戏中获得知识的过程更加有意思了。我们尊重孩子的天性，将很多教学活动设计成游戏的方式，让他们充分发挥想象力，去探索实验发现和解决问题。\n项目制学习\n在童心童行我们引导孩子通过项目只学习积极探索现实世界中的问题与挑战，以获得对于概念的深层次理解。孩子们从小学会团队合作，独立工作，培养自信并自我指导，我们的孩子们在幼年时期就开始习得自我管理及调查研究，并不断发展与同伴和成人的沟通能力。\n体验式学习\n在童心童行，孩子们每天都需要”动手实践”和”结合实际”, 这些帮助他们从真实体验中得到深刻的理解。有助于他们反思决策并对结果负责，特别是可以从眼见为实的自然后果、错误或者成功中获得真知，并提高生活技能。',
            },
            {
                tittle: '中国文化\t中国情怀',
                text: '自开创以来，我们一直努力寻求中西文化并重的教育模式，我们相信未来的世界是属于那些具有文化同理心的孩子们。他们应该熟悉本国的历史，在拥有中国价值情怀的同时，有着更加宽广的国际视野以及兼容并蓄的广阔胸怀，中文和中国文化学习是童心童行教育理念中的重要部分，在童心童行各个年龄段的孩子们均有充分机会浸润中国文化，我们阅读中文绘本，了解中国历史和风土人情，高年级的孩子有专门的中文学习课程。',
            },
            {
                tittle: '课外活动',
                text: '童心童行课外拓展学院将最优质的资源汇集于此，为所有学生提供丰富多彩，品质高端的精品课程。学生可以按照他们的兴趣继续在学术上精益求精，以及拓展兴趣爱好。从学术培养，素质培养，领导力培养三方面，提供语言、逻辑、科学、人文、艺术、生活方式及运动健康七大类别几十种拓展资源，全方位支持孩子不断挑战自我，发现自我，无限发挥自我的内在张力，我们每年固定在假期开设夏令营及冬令营，周末学校也是童心童行课后拓展学院的重要组成部分。',
            },
        ],
        photoList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        collection.get({
            success: function (res) {
                that.setData({
                    photoList: res.data,
                })
            },
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
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},

    /**
     * vant折叠面板点击展开
     */
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        })
    },
})
