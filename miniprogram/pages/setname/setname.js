// pages/setname/setname.js
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
    this.setData({ pid: options.pid })
    this.setData({ pname:options.pname })
    this.setData({cost: options.cost})
    this.setData({pimage: options.pimage})
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
  bind: function (res) {
    let formdata = res.detail.value
    let that = this
    wx.showModal({
      title: '提示',
      content: '提交后信息不可修改，确定提交吗？',
      success(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name: 'draw',
            data: {
              userId: app.globalData.userInfo.id,
              pid: that.data.pid,
              pname: that.data.pname,
              name: formdata.name,
              address: formdata.address,
              phone: formdata.phone,
              cost: that.data.cost,
              image: that.data.pimage
            },
            success(res){
              console.log(res)
              console.log(app.globalData.userInfo.dashika - that.data.cost)
              app.globalData.userInfo.dashika = app.globalData.userInfo.dashika - that.data.cost
              wx.navigateBack({})
            }
          })
        }
      }
    })
  }
})