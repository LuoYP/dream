var util = require('../../utils/util.js'); 
var timer;
// pages/order_manage/order_manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,             //屏幕宽度
    height: 0,            //屏幕高度
    ishaveorder:true,
    info:[
      { 
        id:'247385465465446',
        userinfo: '客户01-喂小零食' ,
        money: '¥27',
        state: '0', 
        
      },
      { 
        id: '12345648674684546' ,
        userinfo: '客户02-喂小零食' ,
        money: '¥27' ,
        state: '已完成' , 
        handdesc:'finish'
      }
    ],
    stateinfo:{
      '0':'未处理',
      '1':'已处理'
    },
    usertype:2  //用户类型 0 - 普通用户   2 - 商家用户
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showNavigationBarLoading();
    that.setData({
      width: getApp().globalData.width,
      height: getApp().globalData.height
    })
    that.data.usertype = options.usertype;
    if (that.data.usertype == 0){
        //普通用户
      // getOrder(getApp().globalData.globaluserphone, that);
      // timer =  setInterval(function (res) {
      //   getOrder(getApp().globalData.globaluserphone, that);
      // }, 5000); 
    }else{
      //商家用户
      // getOrderMerchant(getApp().globalData.globaluserphone, that);
      // timer =  setInterval(function (res) {
      //   getOrderMerchant(getApp().globalData.globaluserphone, that);
      // }, 5000); 
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
    clearInterval(timer);
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
  handreq:function(e){
    var that = this;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var data = that.data.info[index];
    console.log(index);
    console.log(that.data.info);
    console.log(data);
    handOrder(data.rid, data.shopmac, data.handdev, 'finish','完成入舱',that);
  }
})
function handOrder(rid,shopmac,devmac,handstate,handesc,that){
  var obj_datauser = {
    rid:rid,
    shopmac:shopmac,
    devmac: devmac,
    handstate:handstate,
    handesc:handesc
  };
  util.requestGetWoWo("/handle_req.jsp", obj_datauser, function (res) {
    console.log(res.data);   
    if ("0" == res.data.code) {
      //处理成功
      wx.showToast({
        title: '处理成功'
      });
      getOrder(getApp().globalData.globaluserphone, that);
    } else {
      //处理失败
      wx.showToast({
        title: '处理失败',
        icon:'none'
      })
    }
  });
}
function getOrder(umac,that){
  var obj_datauser = {
    umac: umac
  };
  util.requestGetWoWo("/query_req.jsp", obj_datauser, function (res) {
    console.log(res.data);
    wx.hideNavigationBarLoading();
    if ("0" == res.data.code) {
      //返回查询成功  若有数据
      if (res.data.reqs[0]) {
        var data = res.data.reqs;
        var i = 0;
        while (data[i]){
          data[i].index = i; 
          if(data[i].state == 0){
            data[i].info = '未处理';
          }else{
            data[i].info = '已处理';
          }
          i++;
        };
        that.setData({
          ishaveorder : true,
          info: res.data.reqs
        })
      }
    } else { 
      that.setData({
        ishaveorder: false
      })
    }
  });
}
function getOrderMerchant(umac, that) {
  var obj_datauser = {
    umac: umac,
    reqstate: 'all'
  };
  util.requestGetWoWo("/shop_query_req.jsp", obj_datauser, function (res) {
    console.log(res.data);
    wx.hideNavigationBarLoading();
    if ("0" == res.data.code) {
      //返回查询成功  若有数据
      if (res.data.reqs[0]) {
        var data = res.data.reqs;
        var i = 0;
        while (data[i]) {
          data[i].index = i;
          if (data[i].state == 0) {
            data[i].info = '未处理';
          } else {
            data[i].info = '已处理';
          }
          i++;
        };
        that.setData({
          ishaveorder: true,
          info: res.data.reqs
        })
      }
    } else {
      that.setData({
        ishaveorder: false
      })
    }
  });
}