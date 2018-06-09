// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525961502&di=a07c46f6f1e4e37f645358432b26a0cf&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0188eb554bc0e5000001bf726b3e53.jpg%402o.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525366849995&di=712c21ae16706beed83038347255d9b8&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F79%2F18%2F44b1OOOPICa1.jpg',
      'http://pic.qiantucdn.com/58pic/27/79/52/38E58PICuf6_1024.jpg'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(".....this is welcome page and token is "+wx.getStorageSync("token"))
    console.log(wx.getStorageSync("token") != "");
    if(wx.getStorageSync("token")!=null&&wx.getStorageSync("token")!=""){
      this.start()
    }else{
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo'
            })
          }
          if (!res.authSetting['scope.userLocation']){
            wx.authorize({
              scope: 'scope.userLocation'
            })
          }
        }
      })
    }
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
  
  },
  start: function (event) {
    wx.switchTab({
      url: '../index/index'
    })
  }
})