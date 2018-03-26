var  util = require("../../utils/util.js");
Page({
  data:{
    listData:{},
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
  },
  onPullDownRefresh(){
    console.log("000000")
  },
  checkchange(e){
    console.log(e.detail);
  },
  onLoad(e){
    console.log(e.lonlat);
    var that = this;
    console.log(util.s23());
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
    wx.setTopBarText({
      text: 'hello, world!'
    })
    wx.request({
      url:"http://119.254.118.220:9999/risk/v1/riskAbleUser",
      data:{
        ruleIds: "1,2",
        dateMode: ""
      },
      dataType:"json",
      success(data, statusCode){
        if (data.statusCode==200){
         that.setData({
           listData:data.data.index
         })
         wx.showModal({
           text: "提示",
           content: "数据获取成功！"
         })
        }

        

        console.log(that.data.listData);
      }
    })
  },
  //onPullDownRefresh: function () {
   // wx.stopPullDownRefresh()
  //},
  clickmodal(){
    wx.showModal({
      text:"提示",
      content:"jhjjkh"
    })
  },
  payment(){
//     wx.requestPayment({
//       timeStamp:String(parseInt(new Date()/1000)),
//       nonceStr: util.s23(),
//       package:"prepay_id=23",
//       signType:"ooo",
//       paySign:"kjkk",
//       success(res){
// console.log(res);
//       }
//     })

  console.log(this.data.listData);

  }

})