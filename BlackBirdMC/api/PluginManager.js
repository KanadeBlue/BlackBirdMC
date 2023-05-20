const { readdir } = require("fs/promises");
const ColorFormat = require("../utils/color_format");

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

      const plugin = new Plugin(info.bbmc)
      plugin.options = info.bbmc


      this.plugins.push(plugin);
    }
  }

  doTask(event, ...args) {
    this.plugins.forEach((plu) => {
      if (plu[event]) {
        if (event === "onEnable") {
          console.info(`Enabling ${plu.options.name}:${plu.options.version}`, ColorFormat.format_color('Plugins', 'bold'))
          plu[event](...args)
        } else if (event === "onDisable") {
          console.info(`Disabling ${plu.options.name}:${plu.options.version}`, ColorFormat.format_color('Plugins', 'bold'))
          plu[event](...args)
        } else {
          plu[event](...args)
        }
      }
    })
  }
}

module.exports = PluginManager
