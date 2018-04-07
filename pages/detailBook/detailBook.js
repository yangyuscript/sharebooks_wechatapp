// pages/detailBook/detailBook.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[],
    serverPath:getApp().globalData.serverPath+'/',
    isShow:true
  },

  deleteBook:function(e){
    var $bid = e.currentTarget.dataset.bid
    console.log("待删除书籍id是:"+$bid)
    wx.showModal({
      title: '提示',
      content: '确定删除该书籍么？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户确定删除书籍')
          network.POST('/user/deleteBookByBid', {
            params: {
              'bid': $bid
            },
            success: function (res) {
              if(res.data.result=='ok'){
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.redirectTo({
                  url: '../mybooks/mybooks',
                })
              }else{
                wx.showToast({
                  title: '请检查您的网络',
                  icon: 'loading',
                  duration: 2000
                })
              }
            },
            fail: function () {
              console.log('删除书籍异常！')
              wx.showToast({
                title: '请检查您的网络',
                icon: 'loading',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户取消删除书籍')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $bid= options.bid
    var $userInfo = getApp().globalData.userInfo.nickName
    console.log("bookid is "+$bid)
    var $that= this
    network.POST('/user/getDetailBookByBid', {
      params: {
        'bid':$bid
      },
      success: function (res) {
        var $book=res.data.book
        console.log("username" + $book.user.nickname)
        console.log("username" + $userInfo)
        if ($book.user.nickname == $userInfo){
          $that.setData({
            isShow:false
          })
        }
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