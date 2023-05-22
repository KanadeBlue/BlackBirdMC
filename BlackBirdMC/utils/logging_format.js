function LoggingFormat() {
  ["info", "warn", "error", "debug", 'log'].forEach((v) => {
    const backup = console[v]
    console[v] = (text, group) => {
      const date = new Date().toLocaleString().replace(", ", " ").toUpperCase()

      // eslint-disable-next-line no-undef
      if ((v === "debug" || v === "log") && BBMC?.config?.BBMC?.debug === 'false') return

      const a = {
        info: "INFO",
        warn: "WARN",
        error: "ERRR",
        debug: "DBUG",
        log: 'DBUG'
      }

      // eslint-disable-next-line no-undef
      if (BBMC.config.BBMC.Terminal.showDate) {
        const datePrefix = `[${date} ${a[v]}]`;
        // eslint-disable-next-line no-undef
        if (BBMC.config.BBMC.Terminal.showGroup) {
          if (group) backup(datePrefix, `[${group}]`, text);
          else backup(datePrefix, text);
        } else {
          backup(datePrefix, text);
        }
        // eslint-disable-next-line no-undef
      } else if (BBMC.config.BBMC.Terminal.showGroup) {
        const groupPrefix = `[${a[v]}]`;
        if (group) backup(groupPrefix, `[${group}]`, text);
        else backup(groupPrefix, text);
      } else {
        backup(`${a[v]} |`, text);
      }

    }
  })
}

module.exports = LoggingFormat
