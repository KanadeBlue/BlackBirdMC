require('./utils/logging_format')()
const Server = require("./server");

(() => {
    const instance = new Server();
})();