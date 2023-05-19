globalThis.BBMC = {}

require("./utils/logging_format")()
require("./utils/configuration")()
const Server = require("./server")

const instance = new Server()
module.exports = instance
