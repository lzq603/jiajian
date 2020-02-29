// pages/index/index.js
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
    this.setData({ app: app })
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
    
    let that = this
    this.setData({
      'app.globalData.userInfo.score': app.globalData.userInfo.score})

    // 获取我的排名
    wx.cloud.callFunction({
      name: 'getMyRank',
      data: {
        score: app.globalData.userInfo.score
      }
    }).then(res => {
      console.log(res)
      that.setData(res.result)
    }).catch(err => {
      console.log(err)
    })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    return {
      title: '加减大师',
      path: '/pages/loading/loading',
      imageUrl: '/images/sharebanner.png',
      success: function(res){
        console.log(res)
      },
      fail: function(res){

      }
    }
  },
  start: function(){
    wx.navigateTo({
      url: '/pages/game/game',
    })
  },
  
  goto: function(e){
    if(e.currentTarget.dataset.page == 'rule'){
      wx.navigateTo({
        url: '/pages/rule/rule',
      })
    } else if (e.currentTarget.dataset.page == 'prize'){
      wx.navigateTo({
        url: '/pages/prize/prize',
      })
    } else if (e.currentTarget.dataset.page == 'rank') {
      wx.navigateTo({
        url: '/pages/rank/rank',
      })
    }
  },
  versus: function(){
    wx.showModal({
      title: '提示',
      content: '该功能暂未开放，敬请期待',
      showCancel: false
    })
  }
})