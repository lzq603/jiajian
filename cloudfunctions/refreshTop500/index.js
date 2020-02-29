// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command

  // 先取出集合记录总数
  const countResult = await db.collection('score').count()
  const total = countResult.total
  // 计算需分几次取
  let batchTimes = Math.ceil(total / 100)
  console.log(batchTimes)
  if (batchTimes > 500) batchTimes = 5
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('score').orderBy('score', 'desc').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  
  // 等待所有
  let top500 = (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })

  // 前500最后一名
  let tail = null
  if(top500.length > 50){
    tail = {
      rank: top500.length,
      data: top500[top500.length - 1]
    }
  }

  return await db.collection('rank').doc('ranklist').update({
    data: {
      top500: top500.data,
      tail: tail
    }
  })
}