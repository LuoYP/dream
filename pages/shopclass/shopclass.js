// pages/shopclass/shopclass.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,             //屏幕宽度
    height: 0,            //屏幕高度 
    scrollTop:{
      scroll_top: 0
    },
    titleControl: {       //标题控制参数
      show: true,       //标题是否隐藏
      title:'火锅',           //标题显示文字
    },
    screensize:{
      width: 0,             //屏幕宽度
      height: 0,            //屏幕高度 
    },
    allclass:[
      { title:'火锅' ,
       eachclass:[
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
      },
      {
        title: '中餐',
        eachclass: [
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
        ] },
      {
        title: '西餐',
        eachclass: [
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
        ]},
      {
        title: '饮品',
        eachclass: [
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
        ]}
      ],
      classLocation:{
        isget:false,
        data:[]
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
  //监听页面手指按下时间
  handletouchtart:function(res){
    console.log("start" + JSON.stringify(res) + JSON.stringify(this.data.screensize));
  },
  //监听页面手指滑动时间
  handletouchmove: function (res) {
    console.log("move" + JSON.stringify(res));
  },
  //监听页面手指抬起时间
  handletouchend: function (res) {
    console.log("end" + JSON.stringify(res));
  },
  //监听scroll滑动事件
  scrollTopFun: function (res) {
    console.log("scrollTopFun" + JSON.stringify(res) + JSON.stringify(this.data.screensize));
    syncTitle(res,this);
  },
  //打开页面
  openshop: function(res){
    console.log("openshop" + JSON.stringify(res));
  },
  //控制当前标题的打开与关闭
  controlOpen:function(res){

  }
})
//分析标题显示内容
function syncTitle(res,that){
  var Top = res.detail.scrollTop; 
  var classData = that.data.allclass;
  var height = that.data.height;
  var i = getCount(classData); 
  console.log(Top);
  //判断是否获得当前标题位置信息
  if (!that.data.classLocation.isget){
    //没有就先去计算每个标题的位置获取
    var j = 0;
    while (classData[j]) {
      var count = Math.floor(getCount(classData[j].eachclass) / 2);
      console.log(count);
      if(j > 0){
        that.data.classLocation[j] = that.data.classLocation[j - 1] + ((count - 1) * 2 + 50 + count * height / 2);
      }else{
        that.data.classLocation[j] = ((count - 1) * 2 + 50 + count * height / 2);
      }
      j++;
    }  
    that.data.classLocation.isget = true;
  }
  var k = 0;
  while (that.data.classLocation[k]){ 
    console.log(that.data.classLocation); 
    if (that.data.classLocation[k + 1] && Top > that.data.classLocation[k] && Top < that.data.classLocation[k + 1]){
      console.log(classData[k].title); 
      wx.setNavigationBarTitle({
        title: classData[k + 1].title,
      })
      break;
    }  
    if (k == 0 && Top < that.data.classLocation[0]) {
      wx.setNavigationBarTitle({
        title: classData[0].title,
      })
      break;
    }
    if (k == i){
      wx.setNavigationBarTitle({
        title:classData[k].title,
      })
    }
    k++;
  } 
  
}
function getCount(data){
  var i = 0;
  for(var j in data){
    i++;
  }
  return i;
}