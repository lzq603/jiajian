// pages/prize/prize.js
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
    let that = this
    const db = wx.cloud.database()
    // 奖品列表
    db.collection('prize').get().then(res=>{
      console.log(res)
      that.setData({prizeList:res.data})
    })
    
    this.setData({ opt1: 'active'})
    this.setData({ opt2: ''})
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
    this.setData({ app: app })
    // 领奖记录
    wx.cloud.callFunction({
      name: 'getMyPrize',
      data: {
        userId: app.globalData.userInfo.id
      },
      success: (res => {
        console.log(res.result)
        that.setData({ myPrize: res.result })
      })
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
  onShareAppMessage: function () {

  },
  switchOpt1: function(){
    this.setData({ opt1: 'active' })
    this.setData({ opt2: '' })
  },

  switchOpt2: function () {
    this.setData({ opt1: '' })
    this.setData({ opt2: 'active' })
  },
  draw: function(e){
    let prize = this.data.prizeList[e.currentTarget.dataset.index]

    if(app.globalData.userInfo.dashika < prize.cost){
      wx.showToast({
        title: '大师卡不足',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/setname/setname?pid=' + prize._id + '&pname=' + prize.name + '&cost=' + prize.cost + '&pimage=' + prize.image
      })
    }
  }
})