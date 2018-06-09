// pages/viewUser/viewUser.js
const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:null,
    postedBooks:[],
    currPage:1,
    currLogid:0,
    serverPath: app.globalData.serverPath + '/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $logid=options.logid
    this.setData({
      currLogid:$logid
    })
    this.getData()
  },
  getUserInfo: function (e) {
    console.log(e)
    getApp().globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 获取发布者书籍数据
   */
  getData:function(){
    var $that=this
    console.log("40行此时$currPage是" + $that.data.currPage);
    console.log("40行此时logid是" + $that.data.currLogid);
    network.POST("/user/getDataForViewUser", {
      params: {
        logid: $that.data.currLogid,
        currPage: $that.data.currPage
      },
      success: function (res) {
        if (res.data.status == 'ok') {
          console.log(res.data.postedBooks)
          var $postedBooks=$that.data.postedBooks.concat(res.data.postedBooks)
          $that.setData({
            poster: res.data.poster,
            postedBooks: $postedBooks
          })
        } else {
          wx.showToast({
            title: '请检查您的网络',
            icon: 'loading',
            duration: 2000
          })
        }

      },
      fail: function () {
        console.log('获取用户浏览发布者信息失败！')
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
    this.setData({
      currPage: 1,
      postedBooks: []
    })
    this.getData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var $currPage=this.data.currPage+1
    console.log("117行此时$currPage是"+$currPage);
    this.setData({
      currPage:$currPage
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})