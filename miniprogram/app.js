//app.js
App({
  onLaunch: function (res) {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
    wx.getSetting({
      success(res){
        console.log(res)
        // 已授权
        if (res.authSetting["scope.userInfo"]){
          wx.getUserInfo({
            
          })
        }
      }
    })
  }
})
