// pages/game/game.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: 30, //进度变化时间间隔
    progress: 0,  //时间条进度
    no: 1,
    season: '一',
    formula: {
      Q: '1 + 1',
      value: '2'
    },
    gameover:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.spawnFormula()
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
  onShareAppMessage: function (res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '加减大师',
      path: '/pages/loading/loading',
      imageUrl: '/images/sharebanner.png'
    }
  },

  // 时间截止
  timeout: function(e){
    this.gameover()
  },

  // 切换下一题
  nextQ: function(e){
    // 重设定时器
    this.resetTimer()
    // 生成新式子
    this.spawnFormula()
    // 重置进度条
    this.setData({progress:0})
    // 题号加1
    this.setData({no: this.data.no + 1})
  },

  // 产生新式子
  spawnFormula: function(res){
    // if(this.data.no < 35){
    if (true) {
      // 取两个随机数
      var a = Math.floor(Math.random() * 20)
      var b = Math.floor(Math.random() * 11)
      var value = 0
      var opt = '+'
      var formula = {}
      value = a + b
      if(Math.random() > 0.5){
        opt = '-'
        value = a - b
      }
      formula = {
        Q: a + ' ' + opt + ' ' + b,
        value: value,
        isRight: true
      }

      if (Math.random() < 0.5) {
        formula.value = formula.value + Math.floor((Math.random()) * 5 + 1)
        formula.isRight = false
      }

      console.log(formula)
      this.setData({formula: formula})
    }
  },

  // 判断正误
  judge: function(e){
    console.log(e.currentTarget.dataset.isright)
    console.log(this.data.formula.isRight)
    if(e.currentTarget.dataset.isright == this.data.formula.isRight){
      this.nextQ()
    }else{
      this.gameover()
    }
  },

  // 重置定时器
  resetTimer: function(){
    let that = this
    clearInterval(this.data.timer)
    // 设置定时器
    let timer = setInterval(function () {
      that.setData({ progress: that.data.progress + 0.5 })
      if (that.data.progress >= 100) {
        clearInterval(timer)
        that.timeout()
      }
    }, that.data.interval)
    this.setData({ timer: timer })
    this.setData({ interval: that.data.interval - 0.4 })
  },
  
  gameover: function(){
    // 清除定时器
    clearInterval(this.data.timer)
    // 设置游戏状态
    this.setData({gameover: true})
    // 计分
    this.recordScore()
  },
  skip: function(){
    wx.navigateBack({})
  },
  recordScore: function(){
    let that = this
    const db = wx.cloud.database()
    let userId = app.globalData.userInfo.id
    console.log(userId)
    db.collection('score').doc(userId).get({
      success: function(res){
        console.log(res)
        if(that.data.no - 1 > res.data.score){
          db.collection('score').doc(userId).update({
            data:{
              score: that.data.no - 1,
              time: new Date()
            },
            success(res){
              app.globalData.userInfo.score = that.data.no - 1
              console.log(res)
            },
            fail(res){
              console.log(res)
            }
          })
        }
      },
      fail: function(res){
        console.log(res)
      }
    })
  }
})