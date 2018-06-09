// pages/mybooks/mybooks.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [],
    currPage: 1,
    serverPath: getApp().globalData.serverPath + '/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  },
  initData: function () {
    var $that = this
    network.POST('/user/getAllPosts', {
      params: {
        'token': wx.getStorageSync('token'),
        'currentPage': $that.data.currPage
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 'ok') {
          var $posts = $that.data.posts.concat(res.data.posts)
          $that.setData({
            posts: $posts
          })
        } else {
          console.log('调用接口获取用户发布的书籍时用户不在')
        }
      },
      fail: function () {
        console.log('调用接口获取sendMessage失败')
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
    this.setData({
      currPage: 1,
      posts: []
    })
    this.initData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var $currPage = this.data.currPage + 1
    this.setData({
      currPage: $currPage
    })
    this.initData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})