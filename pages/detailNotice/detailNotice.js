// pages/detailNotice/detailNotice.js
var network = require("../../utils/network.js")
var WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [],
    content: '',
    serverPath: getApp().globalData.serverPath + '/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $nid = options.nid
    var $that = this
    network.POST('/user/getDetailNoticeByNid', {
      params: {
        'nid': $nid
      },
      success: function (res) {
        var $notice = res.data.notice
        $notice.time = $notice.time.slice(0, 10)
        $that.setData({
          notice: $notice,
          content: WxParse.wxParse('content', 'html', $notice.content, $that, 5)
        })
      },
      fail: function () {
        console.log('查看通知详情异常！')
        wx.showToast({
          title: '请检查您的网络',
          icon: 'loading',
          duration: 2000
        })
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