//var API_URL = 'http://kischang.free.ngrok.cc'
var API_URL = 'http://9drpsh.natappfree.cc'

var requestHandler = {
  params: {},
  success: function(res){
    //success
  },
  fail: function(){

  }
}

//GET请求
function GET(controlPath,requestHandler){
  request('GET',controlPath,requestHandler)
}

//POST请求
function POST(controlPath,requestHandler){
  request('POST',controlPath,requestHandler)
}

function request(method,controlPath,requestHandler){
  //注意，可以对params加密等处理
  var params = requestHandler.params;

  wx.request({
    url: API_URL+controlPath,
    data: params,
    method: method,//OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
    header:{
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": wx.getStorageSync('token')
    },//设置请求头
    success:function(res){
      requestHandler.success(res)
    },
    fail: function(){
      requestHandler.fail()
    },
    complete: function(){
      //complete
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}