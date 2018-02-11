// pages/detailBook/detailBook.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[],
    serverPath:getApp().globalData.serverPath+'/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $bid= options.bid
    console.log("bookid is "+$bid)
    var $that= this
    network.POST('/user/getDetailBookByBid', {
      params: {
        'bid':$bid
      },
      success: function (res) {
        var $book=res.data.book
        $book.time=$book.time.slice(0,10)
        $that.setData({
          book: $book
        })
      },
      fail: function () {
        console.log('查看书籍详情异常！')
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