//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    width: 0,             //屏幕宽度
    height: 0,            //屏幕高度 
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgswiperset: {        //swiper信息设置
      indicator_dots: true,        //是否显示面板指示点
      autoplay: true,               //是否自动切换
      interval: 3000,                //自动切换时间间隔
      duration: 500,                  //滑动动画时长
      indicator_color: 'rgba(255,255,255,.3)', //指示点颜色
      indicator_active_color: '#fff',       //当前选中的指示点颜色
      circular: true,                       //是否采用衔接滑动
    },
    imgUrl:[                              //轮播图片路径
       '/images/ic_main1.jpg',
       '/images/ic_main2.jpg',
       '/images/ic_main3.jpg'
    ],
    icon:[
      { title: '售后服务', img:'/images/ic_my_logo.png'},
      { title: '专属勋章', img:'/images/ic_my_logo.png'},
      { title: '牛仔俱乐部', img:'/images/ic_my_logo.png'},
      { title: 'NB码通道', img:'/images/ic_my_logo.png' }
    ],
    shops:[
      { img:'/images/ic_my_logo.png'},
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' },
      { img: '/images/ic_my_logo.png' }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      width: app.globalData.width,
      height: app.globalData.height
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
