// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let ranklist = (await db.collection('rank').doc('ranklist').get()).data.top500
  var i = 0
  for(i = 0;i < ranklist.length;i++){
    if(ranklist[i].score <= event.score)
      break
  }
  if(i >= ranklist.length)
    return {myRank: '500+'}
  else return {myRank: i + 1}
}