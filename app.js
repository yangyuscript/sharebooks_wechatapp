//app.js
App({
  onLaunch: function () {
    console.log("app onLaunch执行啦。。。。。")
    var network = require("/utils/network.js")
    var $that=this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("code is:" + res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: getApp().globalData.serverPath + '/user/getToken',
            data: {
              code: res.code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function (res) {
              console.log("用户token为：" + res.data)
              wx.setStorageSync('token', res.data)
              //获取用户位置
              wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                  console.log("wx.getLocation获取的经纬度: " + res.longitude + ',' + res.latitude)
                  getApp().globalData.latitude = res.latitude
                  getApp().globalData.longitude = res.longitude
                  getApp().globalData.accuracy = res.accuracy
                  //写入用户登录地址
                  wx.request({
                    url: getApp().globalData.serverPath + '/user/updateLoginlog',
                    data: {
                      token: wx.getStorageSync("token"),
                      latitude: getApp().globalData.latitude,
                      longitude: getApp().globalData.longitude
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "x-access-token": wx.getStorageSync("token")
                    },
                    method: 'POST',
                    success: function (res) {
                      console.log("写入用户登录日志：" + res.data.status)
                    }
                  })
                },
              })
            }
          })
        }
      }
    })
  },
  onShow: function(){
    console.log("app onShow执行啦。。。。。")
    var network = require("/utils/network.js")
    var $that= this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("更新用户信息中。。。。。")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称")
          wx.getUserInfo({
            success: res => {
              $that.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              network.POST("/user/updateUserInfo", {
                params: {
                  token: wx.getStorageSync("token"),
                  nickName: res.userInfo.nickName,
                  head: res.userInfo.avatarUrl,
                  gender: res.userInfo.gender,
                  city: res.userInfo.city,
                  province: res.userInfo.province,
                  country: res.userInfo.country,
                  language: res.userInfo.language
                },
                success: function (res) {
                  console.log("更新用户数据是否成功:" + res.data.status)
                },
                fail: function () {
                  console.log("向后台更新用户信息失败！")
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })  
  },
  globalData: {
    userInfo: null,
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    test: 'haha',
    bookTypes: [],
    //serverPath: 'http://kischang.free.ngrok.cc'
    //serverPath: 'http://wns92d.natappfree.cc'
    serverPath:'https://sharebooks.yangyuscript.club/api/'
  }
})