// pages/addBook/addBook.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookTypes: [],
    cur_bt_index: 0,
    bookName: '',
    bookDesc: '',
    tempChoosePicUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var params = new Object()
    network.GET('/index/getBookTypes', {
      params: params,
      success: function (res) {
        var bookTypes = res.data.bookTypes
        var bt = []
        for (var i = 0; i < bookTypes.length; i++) {
          bt[i] = bookTypes[i].name
        }
        that.setData({
          bookTypes: bt
        })
        getApp().globalData.bookTypes = res.data.bookTypes
        console.log(res.data.bookTypes[0].name)
      },
      fail: function () {
        console.log('调用接口获取所有书籍种类')
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

  },
  bindPickerChange: function (e) {
    console.log("当前书籍种类下标：" + e.detail.value)
    this.setData({
      cur_bt_index: e.detail.value
    })
  },
  //提交表单
  formSubmit: function (e) {
    var $that= this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var $bookname = e.detail.value.bookName
    var $booktypeid = getApp().globalData.bookTypes[e.detail.value.bookType].btid
    console.log($booktypeid)
    var $bookdesc = e.detail.value.desc
    console.log($bookdesc+"fuck" + this.data.tempChoosePicUrls[0])
    var $tempfile = this.data.tempChoosePicUrls[0]
    if ($bookname.trim() == '' || $bookdesc.trim() == '' || $tempfile==undefined){
      console.log("内容不完整")
      wx.showToast({
        title: '请完善书籍内容',
        icon: 'loading',
        duration: 2000
      })
    }else{
      wx.uploadFile({
        url: getApp().globalData.serverPath + '/user/addBook',
        filePath: $tempfile,
        name: 'bookHead',
        formData: {
          'bookName': $bookname,
          'bookTypeId': $booktypeid,
          'bookDesc': $bookdesc,
          'token': wx.getStorageSync("token")
        },
        success: function (res) {
          if (res.data == '{"status":"ok"}') {
            wx.showToast({
              title: '添加书籍成功',
              icon: 'success',
              duration: 2000
            })
          }
          $that.setData({
            bookName: '',
            bookDesc: '',
            bookHeadUrl: '',
            tempChoosePicUrls: []
          })
        }
      })
    }
  },
  formReset: function (e) {
    console.log('form发生了reset事件')
    this.setData({
      bookName: '',
      bookDesc: '',
      bookHeadUrl: '',
      tempChoosePicUrls: ''
    })
  },
  //添加书籍图片
  chooseBookHead: function (e) {
    var $that=this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        $that.setData({
          tempChoosePicUrls: res.tempFilePaths
        })
        console.log("2" + $that.data.tempChoosePicUrls[0])
      },
    })
  }
})