// pages/messages/messages.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latestMessagesToUser:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   title: '詹姆斯-哈登'
    // })
    var $that=this
    network.POST('/user/getAllLastestMessagesToUser',{
      params: {
        'token': wx.getStorageSync("token")
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 'ok') {
          $that.setData({
            latestMessagesToUser: res.data.latestMessagesToUser
          })
          //console.log("hhhh"+$that.data.latestMessagesToUser)
        } else {
          console.log('调用接口获取getLatestMessagesToUser时用户不在')
        }
      },
      fail: function () {
        console.log('调用接口获取getLatestMessagesToUser失败')
      }
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