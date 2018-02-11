// pages/bookmap/bookmap.js
const app = getApp()
var network = require("../../utils/network.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/img/mposition.png',
      position: {
        left: 30,
        top: 400,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },
  markertap(e){
    console.log(e.markerId)
    wx.navigateTo({
      url: '/pages/viewUser/viewUser?logid='+e.markerId
    })
  },
  controltap(e) {
    console.log("点击了地图控件:"+e.controlId)
    this.mapCtx.moveToLocation()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $l = getApp().globalData.latitude
    var $g = getApp().globalData.longitude
    var $that = this
    if ($l != null && $g != null) {
      console.log($l + '  ' + $g)
      this.setData({
        latitude : $l,
        longitude : $g
      })
    } else {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          $that.setData({
            latitude : res.latitude,
            longitude : res.longitude
          })
        }
      })
    }
    //从后台取出当前用户2km范围内的附近用户数据
    network.POST('/user/get2kmUsers', {
      params: {
        'longitude':$that.data.longitude,
        'latitude':$that.data.latitude
      },
      success: function (res) {
        console.log(res.data.arroundUsers)
        var $data=res.data.arroundUsers
        var $markers=[]
        //console.log($data.length)
        for(var i=0;i<$data.length;i++){
          var obj={
            iconPath:"/img/marker.png",//$data[i].user.head,
            id: $data[i].logid,
            latitude: $data[i].latitude,
            longitude: $data[i].longitude,
            width: 40,
            height: 40
          }
          //console.log("obj is "+ obj)
          $markers.push(obj)
        }
        //console.log("..........$markers" + $markers)
        $that.setData({
          markers: $markers
        })
        console.log("此时this.data中的markers"+$that.data.markers[0].id)
      },
      fail: function () {
        console.log('从后台取出当前用户2km范围内的附近用户数据失败')
        wx.showToast({
          title: '请检查您的网络',
          icon: 'loading',
          duration: 2000
        })
      }
    })
    //写入用户的登入地址

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()
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
  // getCenterLocation: function () {
  //   this.mapCtx.getCenterLocation({
  //     success: function (res) {
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //     }
  //   })
  // },
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()
  // },
  // translateMarker: function () {
  //   this.mapCtx.translateMarker({
  //     markerId: 0,
  //     autoRotate: true,
  //     duration: 1000,
  //     destination: {
  //       latitude: 23.10229,
  //       longitude: 113.3345211,
  //     },
  //     animationEnd() {
  //       console.log('animation end')
  //     }
  //   })
  // },
  // includePoints: function () {
  //   this.mapCtx.includePoints({
  //     padding: [10],
  //     points: [{
  //       latitude: 23.10229,
  //       longitude: 113.3345211,
  //     }, {
  //       latitude: 23.00229,
  //       longitude: 113.3345211,
  //     }]
  //   })
  // }
})