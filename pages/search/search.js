// pages/search/search.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:'',
    searchBooks:[],
    currPage:1,
    serverPath: getApp().globalData.serverPath + '/'
  },
  bindKeyInput: function(e){
    this.setData({
      searchKey:e.detail.value
    })
  },
  searchBooks: function(e){
    this.setData({
      searchBooks: [],
      currPage: 1
    })
    this.initData()
  },
  initData:function(){
    var $that = this
    network.GET('/index/searchBooksWithDistance', {
      params: {
        'searchKey': $that.data.searchKey,
        'currPage': $that.data.currPage
      },
      success: function (res) {
        console.log(res.data)
        var $oldBooks = $that.data.searchBooks
        if (res.data.result == 'ok') {
          var $searchBooks = $oldBooks.concat(res.data.searchBooks)
          console.log($searchBooks)
          $that.setData({
            searchBooks: $searchBooks
          })
        } else {
          console.log('调用接口获取searchBooks失败')
        }
      },
      fail: function () {
        console.log('调用接口获取searchBooks失败')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      searchKey:'',
      searchBooks:[],
      currPage:1
    })
    this.initData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var $currPage=this.data.currPage+1
    this.setData({
      currPage:$currPage
    })
    this.initData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})