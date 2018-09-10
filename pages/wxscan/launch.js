//query.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  scan: function () {
    wx.scanCode({
      onlyFromCamera: true,//只允许从相机扫码
      success: (res) => {
        console.log(res);
        if (res.result.indexOf('visitorscan') == -1) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '无效的二维码',
            success: function (res) {

            }
          })
        }else{
          wx.setStorageSync('oasis_visitor_url', res.result);
          //消息提示
          wx.showToast({
            title: '加载中',
            icon: 'success',
            duration: 1200  //提示的延迟时间
          })
          //保留当前页面，跳转到应用内的某个页面
          wx.navigateTo({
            url: "/pages/wxscan/confirm"
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'success',
          duration: 1200
        })
      },
      complete: (res) => {
      }
    })
  },
  cancel: function () {
    wx.navigateBack()
  }
})