// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  
  // 大师卡减少
  await db.collection('score').doc(event.userId).update({
    data: {
      dashika: _.inc(parseInt(-event.cost))
    }
  })
  // 添加领奖记录
  return await db.collection('draw').add({
    data: {
      userId: event.userId,
      pid: event.pid,
      pname: event.pname,
      name: event.name,
      address: event.address,
      phone: event.phone,
      image: event.image,
      cost: event.cost,
      time: new Date(),
      postid: null
    }
  })

}