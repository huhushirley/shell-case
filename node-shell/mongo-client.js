/**
 * @desc 使用 node-shell 刷 mongo 数据，只要不垮集群，可以操作多个数据库
 * 只依赖 mongodb npm
 * 执行：node mongo-client.js true  node mongo-client.js 0
 */

 const MongoClient = require('mongodb').MongoClient

 const agvs = process.argv.slice(2)
 const doRun = Number(agvs && agvs[0]) || false
 
 async function main () {
   const caseMongoUrl = process.env.CASE_MONGO_URL
   const case2MongoUrl = process.env.CASE2_MONGO_URL
   if (!caseMongoUrl || !case2MongoUrl) {
     throw new Error('!!! Please set process.env.CASE_MONGO_URL & process.env.CASE2_MONGO_URL')
   }
   console.log(`-----Do Run: ${Boolean(doRun)}----`)
 
   // 连接 case 数据库
   const caseClient = await MongoClient.connect(caseMongoUrl, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   const db1 = caseClient.db('db1')
 
   // 连接 case2 数据库
   const case2Client = await MongoClient.connect(case2MongoUrl, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   const db2 = case2Client.db('db2')

   /* ------------- 业务 --------------- */
   let updateCount = 0
   let processInfo = 0
 
   const cursor = db1.collection('collection')
     .find({
     })
     .sort({ _id: -1 })
 
   for (let field = await cursor.next(); field != null; field = await cursor.next()) {
     if (processInfo % 1000 === 0) {
       console.log('----processInfo', processInfo)
     }
     processInfo++
 
     updateCount++
     if (!doRun) continue
 
     await db2.collection('collection2').findOneAndUpdate({
     }, {
       $set: {
       },
       $setOnInsert: {
       }
     }, {
       upsert: true,
     })
   }
 
   console.log('---更新总数：', updateCount)
 }
 
 main()
   .then(() => {
     process.exit(0)
   })
   .catch(e => {
     console.error(e.message)
     process.exit(1)
   })
 