const instance = require("../start")

function PluginAPI(name) {
  const log = {
    info(text) {
      console.info(text, name)
    },

    warn(text) {
      console.warn(text, name)
    },

    error(text) {
      console.error(text, name)
    },

    debug(text) {
      console.debug(text, name)
    },
  }

  return {
    getLogger: () => log,
    getServer: () => instance,
  }
}

module.exports = PluginAPI
