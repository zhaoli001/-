var amapFile = require("../../libs/amap-wx.js");
var lonlat;
var city;
var origin;
var destination;
Page({
  data:{
    tips1:{},
    tips2: {},
    shangValue:"",
    xiaValue:""
  },
  onLoad(e){
    lonlat = e.lonlat;
    city = e.city
  },
  bindInput1(e){
    var that = this;
    var keywords = e.detail.value;
    var myAmapFun = new amapFile.AMapWX({
      key: 'a4b7d5ad2cb963fee0ca579e8770c53b'
    })

    that.setData({
      tips2:{}
    })

    myAmapFun.getInputtips({
      keywords:keywords,
      location:lonlat,
      city:city,
      success(data){
        if(data && data.tips){
          that.setData({
            tips1:data.tips
          })
        }
      }
    })
  },
  bindsearch1(e){
    origin = e.target.dataset.location;
    this.setData({
      tips1: {},
      shangValue: e.target.dataset.keywords
    })
  },
  bindInput2(e) {
    var that = this;
    var keywords = e.detail.value;
    var myAmapFun = new amapFile.AMapWX({
      key: 'a4b7d5ad2cb963fee0ca579e8770c53b'
    })

    that.setData({
      tips1: {}
    })

    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success(data) {
        if (data && data.tips) {
          that.setData({
            tips2: data.tips
          })
        }
      }
    })
  },
  bindsearch2(e) {
    destination = e.target.dataset.location;
    this.setData({
      xiaValue:e.target.dataset.keywords
    })
    var url = `../map/map?origin=${origin}&destination=${destination}&xiaValue=${this.data.xiaValue}&shangValue=${this.data.shangValue}`;
    wx.redirectTo({
      url: url,
    })
  }
})