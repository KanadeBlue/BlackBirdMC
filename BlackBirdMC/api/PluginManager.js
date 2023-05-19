const { readdir } = require("fs/promises")
const PluginAPI = require("./PluginAPI")

class PluginManager {
  /**
   * @type {import('../api/PluginBase')[]}
   */
  plugins = []

  async start() {
    const folders = await readdir("bbmc/plugins")
    for await (const folder of folders) {
      const info = require(`../../bbmc/plugins/${folder}/package.json`)
      const main = info.main.replace('./', '');
      const Plugin = require(`../../bbmc/plugins/${folder}/${main}`)

      if (info.bbmc.api_version < "1.0.0") {
        console.info(info.bbmc.name + " has been disabled.");
        return console.error("Our API does not support the requested version. However, we ensure compatibility with versions 1.0.0 and above.")
      }

      /**
       * @type {import('../api/PluginBase')}
       */
      const plugin = new Plugin()
      plugin.options = info.bbmc
      plugin.api = PluginAPI(info.bbmc.name)

      this.plugins.push(plugin);
    }
  }

  doTask(event, ...args) {
    this.plugins.forEach((plu) => {
      if (plu[event]) plu[event](...args)
    })
  }
}

module.exports = PluginManager
