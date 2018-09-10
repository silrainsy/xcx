const app = App({
  onLaunch: function () {
    //console.log('app...')
  }
})
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    uuid: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    motto: '请点击按钮申请成为管理员。',
  },

  onLoad: function (options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (options.scene) {
      //scene中是uuid
      var scene = decodeURIComponent(options.scene)
      wx.setStorageSync('oasis_uuid', scene)
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
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请通过扫码进入该页面',
        success: function (res) {
          wx.reLaunch({
            url: '../index/index'
          })
        }
      })
    }
    //判断是否支持自动更新版本
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })
      updateManager.onUpdateReady(function () {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        wx.showModal({
          title: '更新提示',
          content: '新版本下载失败',
          showCancel: false
        })
      })
    }

    if (wx.getStorageSync('oasis_user')) {
      this.setData({
        userInfo: wx.getStorageSync('oasis_user'),
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          wx.setStorageSync('oasis_user', res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //申请成为管理员
  applyAdmin: function () {
    console.log("applyAdmin…")
    var uuid = wx.getStorageSync('oasis_uuid')
    var user = wx.getStorageSync('oasis_user') == "" ? null : wx.getStorageSync('oasis_user')
    var code = wx.getStorageSync('oasis_code')
    var url;
    if (uuid.indexOf('rd') != -1) {
      url = 'https://oasisrdauth.h3c.com/portal/qrcode/adminscan'
    } else if (uuid.indexOf('b1') != -1) {
      url = 'https://lvzhou-portal.h3c.com:10443/portal/qrcode/adminscan'
    } else if (uuid.indexOf('re') != -1) {
      url = 'https://oasisauth.h3c.com/portal/qrcode/adminscan'
    } else {
      url = 'https://oasisrdauth.h3c.com/portal/qrcode/adminscan'
    }
    //解密手机号
    wx.request({
      url: url,
      method: 'POST',
      data: {
        uuid: uuid,
        code: code,
        userInfo: user
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // success
        console.log('登录接口返回结果：' + JSON.stringify(res.data))
        if (0 == res.data.code) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '申请成功',
            success: function (res) {
              wx.redirectTo({
                url: '../index/index',
              })
            }
          })
        } else if (71010 == res.data.code) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '申请超时，请刷新二维码重试',
            success: function (res) {

            }
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '网络超时，请稍后重试',
            success: function (res) {
              console.log("授权" + res)
            }
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '数据同步失败,请清除小程序缓存重试',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log(e.detail.userInfo)
      console.log("bindGetUserInfo...")
      wx.setStorageSync('oasis_user', e.detail.userInfo)
      var user = e.detail.userInfo
      var uuid = wx.getStorageSync('oasis_uuid')
      var code = wx.getStorageSync('oasis_code')
      var url;
      if (uuid.indexOf('rd') != -1) {
        url = 'https://oasisrdauth.h3c.com/portal/qrcode/adminscan'
      } else if (uuid.indexOf('b1') != -1) {
        url = 'https://lvzhou-portal.h3c.com:10443/portal/qrcode/adminscan'
      } else if (uuid.indexOf('re') != -1) {
        url = 'https://oasisauth.h3c.com/portal/qrcode/adminscan'
      } else {
        url = 'https://oasisrdauth.h3c.com/portal/qrcode/adminscan'
      }
      //解密手机号
      wx.request({
        url: url,
        method: 'POST',
        data: {
          uuid: uuid,
          code: code,
          userInfo: user
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // success
          console.log('登录接口返回结果：' + JSON.stringify(res.data))
          if (0 == res.data.code) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '申请成功',
              success: function (res) {
                wx.redirectTo({
                  url: '../index/index',
                })
              }
            })
          } else if (71010 == res.data.code) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '申请超时，请刷新二维码重试',
              success: function (res) {

              }
            })
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '网络超时，请稍后重试',
              success: function (res) {
                console.log("授权" + res)
              }
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '数据同步失败,请清除小程序缓存重试',
            icon: 'none',
            duration: 3000
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '申请管理员需要获取微信信息',
        success: function (res) {

        }
      })
    }
  }
})