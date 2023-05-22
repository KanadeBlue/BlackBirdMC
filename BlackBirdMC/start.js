globalThis.BBMC = {}
const Server = require("./server")

async function main() {
  await require("./utils/logging_format")()
  await require("./utils/configuration")()

  return new Server()
}

main().then((v) => {
  module.exports = v
})
