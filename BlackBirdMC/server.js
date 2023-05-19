const { RakNetServer, InternetAddress } = require("bbmc-raknet")
const Player = require("./player")
const Language = require("./language/language")
const PacketHandler = require("./network/loaders/packet_handler")
const ColorFormat = require("./utils/color_format")
const ErrorHandler = require("./utils/error_handler")
const PluginManager = require("./api/PluginManager")

class Server {
  /**
   * @type {RakNetServer}
   */
  raknet_server
  /**
   * @type {Map<String, Player>}
   */
  players
  /**
   * @type {Language}
   */
  language

  /**
   * @private
   */
  plugins = new PluginManager()

  constructor() {
    this.language = new Language("eng")
    this.players = new Map()
    this.raknet_server = new RakNetServer(
      new InternetAddress("0.0.0.0", 19132, 4),
      11
    )
    this.raknet_server.message = "MCPE;Testserver;0;1.19.73;0;10;"
    this.raknet_server.on("disconnect", (address) => {
      console.info(
        `${address.name}:${address.port} disconnected.`,
        ColorFormat.format_color("Client", "bold")
      )
      let addr = address.toString()
      if (this.players.has(addr)) {
        this.players.delete(addr)
      }
    })

    this.raknet_server.on("connect", (connection) => {
      let addr = connection.address.toString()
      if (!this.players.has(addr)) {
        this.players.set(addr, new Player(connection))
      }
      console.info(
        `${connection.address.name}:${connection.address.port} connected!`,
        ColorFormat.format_color("Client", "bold")
      )
    })
    this.raknet_server.on("packet", (stream, connection) => {
      PacketHandler.handler(stream, connection, this)
    })
    console.info(
      "Listening to 0.0.0.0:19132",
      ColorFormat.format_color("Server", "bold")
    )

    ;(async () => {
      await this.plugins.start()
      this.plugins.doTask("onEnable")
    })()
  }
}

process.on("uncaughtException", (e) => {
  ErrorHandler.write_error(e)
  console.error(ColorFormat.format_color(e.stack, "Red"))
  console.error(
    ColorFormat.get_color("Error happened and crashed the server.", "green")
  )
  process.exit(0)
})

module.exports = Server
