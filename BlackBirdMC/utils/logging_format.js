function LoggingFormat() {
  ["info", "warn", "error", "debug", 'log'].forEach((v) => {
    const backup = console[v]
    console[v] = (text) => {
      const date = new Date().toLocaleString().replace(", ", " ").toUpperCase()
      
      // eslint-disable-next-line no-undef
      if((v === "debug" || v === "log") && BBMC?.config?.debug === 'false') return

      const a = {
        info: "INFO",
        warn: "WARN",
        error: "ERRR",
        debug: "DBUG",
        log: 'DBUG'
      }
      backup(`[${date} ${a[v]}]`, text) 
    }
  })
}

module.exports = LoggingFormat
