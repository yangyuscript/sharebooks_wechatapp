// pages/chat/chat.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromuserid:0,
    allMessagesFromAndTo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fromuserid:options.fromuserid
    })
    wx.setNavigationBarTitle({
      title: options.fromusername
    })
    //获取用户与fromuser之间的所有聊天信息
    var $that=this
    network.POST('/user/getAllMessagesFromAndTo', {
      params: {
        'fromuserid':$that.data.fromuserid,
        'token': wx.getStorageSync("token")
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 'ok') {
          $that.setData({
            allMessagesFromAndTo: res.data.allMessagesFromAndTo
          })
          //console.log("hhhh"+$that.data.latestMessagesToUser)
        } else {
          console.log('调用接口获取getAllMessagesFromAndTo时用户不在')
        }
      },
      fail: function () {
        console.log('调用接口获取getAllMessagesFromAndTo失败')
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