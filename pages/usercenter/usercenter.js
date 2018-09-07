// pages/usercenter/usercenter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,             //屏幕宽度
    height: 0,            //屏幕高度
    userinfo:{},          //用户信息
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meau:[
      {
        title:"我的预约",
        id:0
      },
      {
        title: "我的订单",
        id: 1
      },
      {
        title: "收货地址管理",
        id: 2
      },
      {
        title: "我的收藏",
        id: 3
      } 
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    var data = wx.getStorageSync("userinfo");
    if(data){
      getApp().globalData.userInfo = JSON.parse(data);
      that.setData({
        userinfo: getApp().globalData.userInfo,
        canIUse:false
      });
    }
    that.setData({
      width: getApp().globalData.width,
      height: getApp().globalData.height,
     
    });
   
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
  getUserInfo:function(e){
    var that = this;
    console.log(e.detail.userInfo);
    that.setData({
      userinfo:e.detail.userInfo,
      canIUse:false
    });
    wx.setStorageSync("userinfo", JSON.stringify(e.detail.userInfo));
  }
})