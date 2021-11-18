const request = require('request')

function fetchGet (options) {
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

async function main () { 
  let errCount = 0

  const options = {
    method: 'GET',
    url: host,
    headers: {
      Authorization: ''
    },     
    timeout: 1000
  }
  for (let i = 0; i < limit; i++) { 
    try { 
      const response = await fetchGet(options) 
      console.log('------response', response.body) 
    } catch (err) { 
      console.log('------err', err) 
      errCount++
    }
  }
  console.log('result', errCount) 
}

main().then(() => {
  process.exit(0)
}).catch(e => {
  console.error(e)
  process.exit(1)
})
