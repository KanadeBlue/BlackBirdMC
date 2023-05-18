function LoggingFormat() {
  ;["info", "warn", "error", "debug", 'LOG'].forEach((v) => {
    const backup = console[v]
    console[v] = (text) => {
      const date = new Date().toLocaleString().replace(", ", " ").toUpperCase()
      backup(`[${date} ${v.toUpperCase()}] ${text}`)
    }
  })
}

module.exports = LoggingFormat
