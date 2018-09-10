//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎使用微信连Wi-Fi，如果有任何意见或者建议，可以点击下面的按钮进行意见反馈。',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // bindCheckTap: function() {
  //   console.log('check tap')
  //   wx.navigateTo({
  //     url: '../check/check'
  //   })
  // },
  autoLoginTap: function(){
    console.log('autoLogin tap');
    wx.navigateTo({
      url: '../autoLogin/query'
    })
  },
  // bindAdminManageTap: function(){
  //   console.log('bindAdminManage tap')
  //   wx.navigateTo({
  //     url: '../admin/login',
  //   })
  // },
  bindWxscanTap: function(){
    console.log('bindWxscan tap')
    wx.navigateTo({
      url: '../wxscan/launch',
    })
  },
  // pcwifiTap: function () {
  //   console.log('pcwifi tap')
  //   wx.navigateTo({
  //     url: '../pcwifi/pcwifi',
  //   })
  // },
  // visitorAdminTap: function () {
  //   console.log('visitorAdmin tap')
  //   wx.navigateTo({
  //     url: '../visitorAdmin/visitorAdmin',
  //   })
  // },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
