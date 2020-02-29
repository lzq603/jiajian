// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  // let ranklist = (await db.collection('rank').doc('ranklist').get()).data.top500.slice(0, 50)
  var i = 0
  // for (i = 0; i < ranklist.length; i++) {
    let id = 'f885cb355d85bed201dbd0b36e66e8a8'
    console.log(id)
    await db.collection('score').doc(id).update({
      dashika:_.inc(1)
    })
  // }

  // return 'OK'
}