// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let myPrize = await db.collection('draw').where({
    data:{
      userId: event.id
    }
  }).get()
  myPrize = myPrize.data
  for(var i = 0;i < myPrize.length;i++){
    
    myPrize[i].time = myPrize[i].time.toLocaleString()
    
  }
  return myPrize
}