// pages/merchantmain/merchantmain.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,             //手机宽度
    height: 0,            //手机高度
    list: [
      { title: '商户信息' },
      { title: '菜单管理' },
      { title: '订单管理' },
      { title: '待提现金额' }, 
      { title: '联系客服' },
      { title: '退出登录' }
    ],
    goUrls:{
      0:'../merchantinfo/merchantinfo',           //商户信息
      1: '../set/set',                             //菜单管理
      2:'../order_manage/order_manage',           //订单管理
      3:'../waitwhitdrawn/waitwhitdrawn',         //待提现金额 
      4:'../contact_service/contactservice',      //联系客服
      5:'../login/login'                          //退出登录
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      width: getApp().globalData.width,
      height: getApp().globalData.height,
      userInfo: getApp().globalData.userInfo
    }) 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  openset:function(e){
    var index = e.currentTarget.dataset.index;
    var that = this;
    if(index < 5){
      wx.navigateTo({
        url: that.data.goUrls[index],
      })
    }else{
      //退出登录
      wx.clearStorage();
      wx.reLaunch({
        url: that.data.goUrls[index],
      }) 
    } 
  }
})