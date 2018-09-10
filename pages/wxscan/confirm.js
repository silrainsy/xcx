//获取应用实例
const app = getApp()
Page({
  onLoad: function (option) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求  
          console.log(res.code)
          wx.setStorageSync('oasis_code', res.code)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  confirm: function () {
    var visitor_url = wx.getStorageSync('oasis_visitor_url') +"&code="+ wx.getStorageSync('oasis_code');
    console.log("visitor_url:" + visitor_url)
    //点击确认事件
    wx.request({
      url: visitor_url,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('登录接口返回结果：' + JSON.stringify(res.data))
        if (0 == res.data.code) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '申请成功',
            success: function (res) {
              wx.navigateBack({
                delta : 1
              })
            }
          })
        } else if (71017 == res.data.code){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '认证超时，请刷新重试',
            success: function (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else if (71018 == res.data.code){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '获取用户信息失败,请扫码重试',
            success: function (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else{
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '网络超时，请稍后重试',
            success: function (res) {
              console.log("授权" + res)
            }
          })
        }
      }
    })
  },
  cancel: function () {
    wx.navigateBack()
  }
})