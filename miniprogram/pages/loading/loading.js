// pages/loading/loading.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  login: function (e) {
    const db = wx.cloud.database()
    let that = this

    // 获取用户基本信息
    let userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    // 获取openid
    wx.cloud.callFunction({
      name: 'login',
      success: function (res) {
        // 查询数据库中是否已存在
        let user = db.collection('score').where({
          _openid: res.result.openid
        }).get({
          success(result) {
            console.log(result)
            // 如果不存在
            if (result.data.length == 0) {
              console.log(res.result.openid)
              // 注册用户
              that.register(userInfo, res.result.openid)
            }// 已经存在该用户
            else {
              app.globalData.userInfo.id = result.data[0]._id
              app.globalData.userInfo.score = result.data[0].score
              app.globalData.userInfo.dashika = result.data[0].dashika
            }
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        })
      },
      fail: console.error
    })
  },

  // 注册用户
  register: function (userInfo, openid) {
    console.log(userInfo)
    const db = wx.cloud.database()
    db.collection('score').add({
      data: {
        userInfo: userInfo,
        score: 0,
        dashika: 0,
        time: new Date()
      },
      success(res) {
        console.log(res)
        app.globalData.userInfo.id = res._id
        app.globalData.userInfo.score = 0
        app.globalData.userInfo.dashika = 0
        // wx.navigateTo({
        //   url: '/pages/index/index',
        // })
      },
      fail(res) {
        console.log(res)
      }
    })

  },
})