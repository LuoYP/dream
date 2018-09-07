// pages/shopcar/shopcar.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,             //屏幕宽度
    height: 0,            //屏幕高度
    ishave:true,           //是否有订单
    car:{
      selall:"/images/ic_sel_red.png"
    },
    screensize: {
      width: 0,             //屏幕宽度
      height: 0,            //屏幕高度 
    },
    car_goods:[             //购物车商品
      { 
        goodsinfo: {
            goodimage:"/images/ic_sel_red.png", //商品图片
            goodsnumber:"2",
            check:false
        }
      },
      {
        goodsinfo: {
          goodimage: "/images/ic_sel_red.png", //商品图片
          goodsnumber: "2",
          check: true
        }
      }
    ],
    recommed: {
      title: '为你推荐',
      allgoods: [
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' },
        { 1: '0' }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.screensize.width = app.globalData.width;
    this.data.screensize.height = app.globalData.height;
    this.setData({
      width: app.globalData.width,
      height: app.globalData.height,
      screensize: that.data.screensize
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
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.userInfo);
    console.log(e.detail.rawData);
    getApp().globalData.userInfo = e.detail.userInfo;
  },
})