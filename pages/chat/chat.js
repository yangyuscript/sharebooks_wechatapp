// pages/chat/chat.js
var network = require("../../utils/network.js")
var $time = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromuserid: 0,
    allMessagesFromAndTo: [],
    message: ''
  },
  //聊天输入框输入事件
  bindKeyInput: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  //发送消息
  sendMessage: function (e) {
    var $that = this
    var $head = getApp().globalData.userInfo.avatarUrl
    var obj = {
      condi: 0,
      content: $that.data.message,
      fromuser: {
        head: $head
      },
      fromuserid: 0,
      mid: 0,
      time: $time.formatTime(new Date),
      touser: {},
      touserid: 0
    }
    //console.log("hehe111" + $that.data.allMessagesFromAndTo)
    //console.log("hehe obj"+obj.fromuser.head)
    var $oldAllmfat = $that.data.allMessagesFromAndTo;
    $oldAllmfat.push(obj)
    //console.log("...."+$oldAllmfat)
    $that.setData({
      allMessagesFromAndTo: $oldAllmfat
    })
    //console.log("hehe"+$that.data.allMessagesFromAndTo)
    network.POST('/user/sendMessage', {
      params: {
        'token': wx.getStorageSync("token"),
        'touserid': $that.data.fromuserid,
        'message': $that.data.message
      },
      success: function (res) {
        console.log(res.data)
        console.log($time.formatTime(new Date))
        if (res.data.result == 'ok') {
          $that.setData({
            message:''
          })
        } else {
          console.log('调用接口获取sendMessage时用户不在')
        }
      },
      fail: function () {
        console.log('调用接口获取sendMessage失败')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fromuserid: options.fromuserid
    })
    wx.setNavigationBarTitle({
      title: options.fromusername
    })
    //获取用户与fromuser之间的所有聊天信息
    var $that = this
    network.POST('/user/getAllMessagesFromAndTo', {
      params: {
        'fromuserid': $that.data.fromuserid,
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