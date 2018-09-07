// pages/confirmpay/confirmpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,             //手机宽度
    height: 0,            //手机高度
    moneyshow: '198.00',       //需要支付的钱
    pageshowtext: {        //当前页面配置信息 不变的文本
      waitwhitdrawn: '待提现金额',
      payee: '收款方',
      mycard: '我的银行卡',
      paytext: '立即支付',
      wximage: '',
      dayustr:'>'
    },
    currentgoods: {
      price: 862
    }       //当前选中的商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      width: getApp().globalData.width,
      height: getApp().globalData.height
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

  }
})
function checkdevonline(that) {

}