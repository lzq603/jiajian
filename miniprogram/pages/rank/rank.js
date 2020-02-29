// pages/rank/rank.js
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
    this.setData({app:app})
    let that = this
    // 获取前50名单
    wx.cloud.callFunction({
      name: 'getTop50'
    }).then(res=>{
      // for(var i = 1;i < 50;i++)
      //   res.result.data.push(res.result.data[0])
      that.setData({rankList:res.result})
    }).catch(err=>{
      console.log(err)
    })

    // 获取我的排名
    wx.cloud.callFunction({
      name: 'getMyRank',
      data:{
        score: app.globalData.userInfo.score
      }
    }).then(res=>{
      console.log(res)
      that.setData(res.result)
    }).catch(err=>{
      console.log(err)
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