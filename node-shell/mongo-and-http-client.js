
const MongoClient = require('mongodb').MongoClient
const urllib = require('urllib')

const host = 'http://xxx.com'
const token = ''
const doRun = false // 是否立刻执行
const mongoUrl = ''

async function main () {
  let count = 0

  // 连接数据库
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = client.db('db')
  const ops = await db.collection('collections')
    .find({
    })
    .toArray()
  for (const op of ops) {
    if (doRun) {
      const resp = await urllib.request(`${host}/xxxx`, {
        headers: {
          Authorization: token
        },
        method: 'post',
        contentType: 'json',
        dataType: 'json',
        data: {

        },
        timeout: 50000
      })
      console.log(resp.status)
    }
    count++
  }
  console.log('更新数据总数', count)
}

main().then(() => {
  process.exit(0)
}).catch(e => {
  console.error(e)
  process.exit(1)
})
