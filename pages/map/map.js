var amapFile = require('../../libs/amap-wx.js');
var markersData = [];

Page({
  data: {
    markers: [],
    latitude: '39.92',
    longitude: '116.46',
    textData: {},
    polyline:[],
    pointss:[],
    distance:"",
    cost:"",
    shang:"",
    xia:""
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function (e) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'a4b7d5ad2cb963fee0ca579e8770c53b' });

    var origin = e.origin;
    var destination = e.destination;
    that.setData({
      markers:[{
        latitude: origin.split(",")[1],
        longitude: origin.split(",")[0],
        iconPath:"../../image/marker_checked.png"
      }, {
          latitude: destination.split(",")[1],
          longitude: destination.split(",")[0],
        iconPath: "../../image/marker.png"
      }]
    })

  this.setData({
    shang: e.shangValue,
    xia: e.xiaValue
  })

    console.log(origin.split(",")[1] + "," + origin.split(",")[0]);
    if (origin){
  

    myAmapFun.getDrivingRoute({
      origin: origin,
      destination: destination,
      success(data){
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
              that.setData({
                pointss: points
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });

        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance/1000 + '公里'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }








      }
    })






    }







    // myAmapFun.getPoiAround({
    //   iconPathSelected: '../../image/marker_checked.png', //如：..­/..­/img/marker_checked.png
    //   iconPath: '../../image/marker.png', //如：..­/..­/img/marker.png
    //   success: function (data) {
    //     markersData = data.markers;
    //     that.setData({
    //       markers: markersData
    //     });
    //     that.setData({
    //       latitude: markersData[0].latitude
    //     });
    //     that.setData({
    //       longitude: markersData[0].longitude
    //     });
    //     that.showMarkerInfo(markersData, 0);
    //   },
    //   fail: function (info) {
    //     wx.showModal({ title: info.errMsg })
    //   }
    // })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../image/marker_checked.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../image/marker.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  },
  onShareAppMessage(){
    return{
      title: "转发地图",
      success() {
        wx.showModal({
          content: '转发成功',
        })
      },
      fail() {
        wx.showModal({
          content: '转发失败',
        })
      }
    }
  },
  bindfocusshang(){
    wx.redirectTo({
      url:"../shang/shang"
    })
  },
  bindfocusxia(){
    wx.redirectTo({
      url: '../xia/xia',
    })
  }

})