
const host = 'http://xxx.com'
const cookie = ''

const urllib = require('urllib')

const DEF_DELAY = 1000

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY))
}

async function main () {
  await sleep()
  for (let i = 1; i++; i < 500) {
    const resp = await urllib.request(host, {
      headers: {
        cookie
      },
      method: 'post',
      contentType: 'json',
      dataType: 'json',
      data: {
      }
    })
    console.log(resp.status)
  }
}

main().then(() => {
  process.exit(0)
}).catch(e => {
  console.error(e)
  process.exit(1)
})
