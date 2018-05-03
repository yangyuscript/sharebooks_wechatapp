//index.js
//获取应用实例
const app = getApp()
var network = require("../../utils/network.js")
var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    runpics:[],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hasUserInfo: false,
    //推荐书籍
    recomendBooks:[],
    //最新书籍
    nearbyBooks:[],
    serverPath:app.globalData.serverPath+'/',
    flag: true
  },
  /**
   * 弹出层函数
   */
  //出现
  show: function (e) {
    console.log(e.target.dataset.index)
    var index=e.target.dataset.index
    this.setData({ 
      flag: false
    })
    WxParse.wxParse('content', 'html', this.data.runpics[index].description, this, 5)
  },
  //消失

  hide: function () {
    this.setData({ flag: true })
  },
  //搜索框事件
  showInput: function(){
    console.log("dianjisearch")
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  initData: function(){
    var $that = this
    network.GET('/index/getInitialData', {
      params: {},
      success: function (res) {
        console.log("附近书籍是:")
        console.log(res.data.nearbyBooks)
        $that.setData({
          recomendBooks: res.data.recomendBooks,
          nearbyBooks: res.data.nearbyBooks,
          runpics: res.data.runpics
        })
      },
      fail: function () {
        console.log('加载首页初始化数据失败！')
        wx.showToast({
          title: '请检查您的网络',
          icon: 'loading',
          duration: 2000
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onLoad: function () {
    //加载首页所需数据，附近热门书籍与推荐书籍
    this.initData()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.initData()
  },
})
