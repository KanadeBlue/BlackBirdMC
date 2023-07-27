const API_1 = require("./PluginAPI/1.0.0");

/**
 * 
 * @param {"1.0.0"} version 
 * @param {any} name
 */
function PluginAPI(version, name) {
  if (version >= "1.0.0") {
    // if version >= "1.0.0", return the corresponding API_1 function
    return name ? API_1(name) : API_1();
  } else {
    // if version unmatched, selecting the latest one (which is API_1 in this case)
    return name ? API_1(name) : API_1();
  }
}

module.exports = PluginAPI;
