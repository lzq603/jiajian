// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let tail = (await db.collection('rank').doc('ranklist').get()).data.tail
  let top50 = (await db.collection('rank').doc('ranklist').get()).data.top500.slice(0,50)
  return {tail:tail,top50:top50}
}
