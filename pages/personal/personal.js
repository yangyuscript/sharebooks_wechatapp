// pages/personal/personal.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    motto: 'Hello World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selectTabs: [
      {
        icon: '/img/personal/mybooks.png',
        title: '我的书籍',
        desc: 'my books',
        url: '/pages/mybooks/mybooks',
        news_num:0
      },
      {
        icon: '/img/personal/message.png',
        title: '聊天消息',
        desc: 'chat messages',
        url: '/pages/messages/messages',
        news_num: 7
      },
      {
        icon: '/img/personal/notice.png',
        title: '查看通知',
        desc: 'check notices',
        url: '/pages/notices/notices',
        news_num: 0
      },
      {
        icon: '/img/personal/aboutus.png',
        title: '关于我们',
        desc: 'about sharebook',
        url: '/pages/aboutus/aboutus',
        news_num: 0
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.userInfo) {
      this.setData({
        userInfo: getApp().globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          getApp().globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    
    this.initData()
  },
  getUserInfo: function (e) {
    console.log(e)
    getApp().globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取页面需要的初始化数据
  initData:function(){
    var $that = this
    network.POST('/user/getPersonalIniaData', {
      params: {
        'token': wx.getStorageSync("token")
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == 'ok') {
          //console.log($that.data.motto)
          var $selectTabs = $that.data.selectTabs
          $selectTabs[1].news_num = res.data.messageNotReadedNum
          //console.log($selectTabs)
          $that.setData({
            selectTabs: $selectTabs
          })
        } else {
          console.log('调用接口获取personalIniaData时用户不存在，请重试')
        }
      },
      fail: function () {
        console.log('调用接口获取personalIniaData失败')
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
    this.initData()
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