var app = getApp();

// pages/devmap/devmap.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    timer: {},
    unit: '米',              //距离单位
    width: 0,             //手机宽度
    height: 0,            //手机高度  
    scale: 18,             //缩放级别 
    longitude: 104.046508,          //经度
    latitude: 30.631972,            //纬度
    golongitude: 0,                //要去的地方的精度
    golatitude: 0,                 //要去的地方的纬度
    sparemeil: 0,                 //剩余里程
    hint: '',           //前行提示语
    map: {},                         //Map上下文对象
    currentshop: {},
    callout: {                   //气泡信息设置
      content: '查看仓位',
      color: "#000000",
      bgColor: "#ffffff",
      fontSize: 10,
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 10
    },
    iconPath: '/images/ic_maker.png',
    markers: [{                   //地图上的标记集
      mac: 'df',
      id: 0,                       //id
      latitude: 30.631972,         //纬度
      longitude: 104.046508,       //经度104.046508,30.631972
      width: 50,                   //宽度
      height: 50,                  //高度 
      iconPath: '/images/ic_maker.png',
      callout: {                   //气泡信息设置
        content: '查看物品',
        color: "#000000",
        bgColor: "#ffffff",
        fontSize: 10,
        padding: 10,
        display: 'BYCLICK',
        textAlign: 'center',
        borderRadius: 10
      },
    },
    {                   //地图上的标记集
      id: 1,                       //id
      latitude: 30.633723,         //纬度
      longitude: 104.047637,       //经度104.047637,30.633723
      width: 50,                   //宽度
      height: 50,                  //高度  
      callout: {                   //气泡信息设置
        content: '查看物品',
        color: "#000000",
        bgColor: "#ffffff",
        fontSize: 10,
        padding: 10,
        textAlign: 'center',
        borderRadius: 10
      }
    }],
    polyline: [],
    controls: [{
      id: 1,
      iconPath: '/images/ic_gomylocation.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 20,
        height: 20
      },
      clickable: true,
    }],
  },
  show: function (e) {
    var that = this;
    that.setData({
      polyline: [{
        points: [{
          longitude: 104.047637,
          latitude: 30.633723
        }, {
          longitude: 104.046508,
          latitude: 30.631972
        }],
        color: '#FF0000DD',
        width: 2,
        dottedLine: true
      }]
    })
  },
  goseladdr: function (e) {
    var that = this;
    console.log(e);
    var makerinfo = that.data.markers[e.markerId];

    wx.navigateTo({
      url: '../choosepos/choosepos?data=' + makerinfo.mac + '&name=' + makerinfo.showname,
    })
  },
  getlocation: function (e) {
    var that = this;
    that.data.map.moveToLocation();
    that.setData({
      scale: 18
    })
  },
  openuser: function () {
    var that = this;
    wx.navigateTo({
      url: '../usercenter/usercenter',
    })
  },
  doopenmaker: function (e) {
    var that = this;
    wx.showNavigationBarLoading();
    console.log(e);
    console.log(that.data.markers[e.markerId]);

    var makerinfo = that.data.markers[e.markerId];

    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        ;
        gowhere(res.latitude + ',' + res.longitude, makerinfo.latitude + ',' + makerinfo.longitude, that);
      },
    })
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
    that.data.map = wx.createMapContext("qqmap", this);
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        // getshopmaker(res.latitude, res.longitude, "北京", '913', that);
        // getcurrentcity(res.latitude, res.longitude,that);
      },
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
    var that = this;
    if (that.data.golongitude == '' || that.data.golatitude == '') { return; }
    wx.clearStorageSync(that.data.timer);
    that.data.timer = setInterval(function () {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          gowhere(res.latitude + ',' + res.longitude, that.data.latitude + ',' + that.data.longitude, that);
        },
      })
    }, 100000);
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
    var that = this;
    clearInterval(that.data.timer);
    wx.clearStorageSync(that.data.timer);

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
  markertap: function (e) {

  },
  regionchange: function (e) {

  }
})
//获得当前城市地址
function getcurrentcity(lat, lon, that) {

  wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/?',
    data: {
      location: lat + ',' + lon,
      key: 'OETBZ-4D2WV-ZXRPB-URYOE-HLQ6Q-L7BCZ',
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'GET',
    dataType: 'JSON',
    success: function (res) {
      debugger
      var datajson = JSON.parse((res.data + '').trim().replace(/\n\r/g, ""));
      console.log(res)
      console.log(datajson)
      getApp().globalData.currentcity = (datajson.result.address_component.city + "").substring(0, 2);
      console.log(getApp().globalData.currentcity)

    }
  })
}
//获得城市店铺
function getshopmaker(lat, lon, city, uid, that) {
  wx.request({
    url: 'https://www.puxuntech.com/wechatblueapp/vendor/machine_query.jsp?',
    data: {
      uid: uid,
      city: city,
      long: lon,
      lat: lat
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'GET',
    dataType: 'JSON',
    success: function (res) {
      var data = JSON.parse((res.data + "").trim().replace(/\n\r/g, ""));

      var machines = data.machine;
      var index = 0;
      var makers1 = [];
      var maker = {};
      do {
        maker = {};
        var machin = machines[index + ''];
        if (machin) {

          var location = (machin.devpost + "").split(",");

          maker.id = index;
          maker.did = machin.did;
          maker.latitude = location[0];
          maker.longitude = location[1];
          maker.iconPath = that.data.iconPath;
          maker.width = 20;
          maker.height = 30;
          maker.callout = that.data.callout;
          maker.showname = machin.showname;
          maker.mac = machin.mac;

          makers1 = makers1.concat(maker);
        } else {
          break;
        }
        index++;

      } while (machin);

      console.log(makers1);
      that.setData({
        markers: makers1
      })
    }
  })
}
//去某个位置
function gowhere(start, end, that) {
  wx.request({
    url: 'https://apis.map.qq.com/ws/direction/v1/walking/?',
    data: {
      from: start,
      to: end,
      key: 'OETBZ-4D2WV-ZXRPB-URYOE-HLQ6Q-L7BCZ',
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'GET',
    dataType: 'JSON',
    success: function (res) {
      console.log(start + ':' + end)
      console.log(res)
      var data1 = res.data + "";
      var datajson = JSON.parse(data1);
      console.log(datajson)
      if (datajson.status != 0) {
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: datajson.message,
        })
        return;
      }
      console.log(datajson.result.routes[0].polyline)
      var coors = datajson.result.routes[0].polyline
      for (var i = 2; i < coors.length; i++) { coors[i] = coors[i - 2] + coors[i] / 1000000 }
      console.log('路线坐标点串解压完毕!')
      console.log('路线坐标点串解压结果如下：')
      console.log(coors);
      /** 将解压后的坐标点串进行拼接成polyline想要的样子 */
      var coors_new = []  //记住微信小程序声明一个数组这样写
      for (var j = 0; j < coors.length; j++) {
        coors_new.push({
          latitude: parseFloat(coors[j]),
          longitude: parseFloat(coors[j + 1])
        })
        j++;
      }
      var distan = datajson.result.routes[0].distance;
      that.setData({
        polyline: [{
          points: coors_new,
          color: '#FF0000DD',
          width: 5,
          dottedLine: true,
        }],
        hint: datajson.result.routes[0].steps[0].instruction
      })
      getmlie(distan + "", that);
      console.log(that.data.polyline);

      wx.hideNavigationBarLoading();
    }
  })
}
function getmlie(distance, that) {
  var length = distance.length;
  if (distance.length > 3) {
    distance = (parseInt(distance) / 1000).toFixed(2);
    that.setData({
      sparemeil: distance,
      unit: '千米'
    })
  } else {
    that.setData({
      sparemeil: distance,
      unit: '米'
    })
  }
}