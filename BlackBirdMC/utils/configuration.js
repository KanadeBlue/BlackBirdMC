const { readFile } = require('fs')

function configuration() {
  readFile('bbmc/server.properties', 'utf-8', (err, data) => {
    if (err) throw err
    const arr = data.split('=')
    const obj = {}

    for (let i = 0; i < arr.length; i += 2) {
      const name = arr[i]
      const value = arr[i + 1]

      obj[name] = value
    }

    // eslint-disable-next-line no-undef
    BBMC.config = obj
  })
}

module.exports = configuration