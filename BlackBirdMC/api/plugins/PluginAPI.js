const API_1 = require("./PluginAPI/1.0.0")

/**
 * 
 * @param {"1.0.0"} version 
 * @param {any} name
 */
function PluginAPI(version, name) {
  if (version >= "1.0.0") {
    const v = name ? API_1(name) : API_1()
    return v
  } else {
    // if version unmatched, selecting the latest one
    const v = name ? API_1(name) : API_1()
    return v
  }
}

module.exports = PluginAPI
