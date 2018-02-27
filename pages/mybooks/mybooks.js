// pages/mybooks/mybooks.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBooks:[],
    currPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  },
  initData:function(){
    var $that = this
    network.POST('/user/findMyBooks',{
      params:{
        'token':wx.getStorageSync('token'),
        'currPage':$that.data.currPage
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 'ok') {
          var $myBooks=$that.data.myBooks.concat(res.data.myBooks)
          $that.setData({
            myBooks: $myBooks
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
      currPage:0,
      myBooks:[]
    })
    this.initData()
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
  
  },
  /**
   * 用户点击添加书籍按钮
   */
  addBook: function(event){
    wx.navigateTo({
      url: '../addBook/addBook'
    })
  }
})