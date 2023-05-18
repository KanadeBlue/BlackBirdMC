function LoggingFormat() {
  ;["info", "warn", "error", "debug", 'log'].forEach((v) => {
    const backup = console[v]
    console[v] = (text) => {
      const date = new Date().toLocaleString().replace(", ", " ").toUpperCase()
      
      if(v === "debug" || v === "log" && BBMC?.config?.debug === 'false') return

      backup(`[${date} ${v.toUpperCase()}]`, text) 
    }
  })
}

module.exports = LoggingFormat
