const {
  RakNetServer,
  Frame,
  ReliabilityTool,
  InternetAddress,
  Connection,
} = require("bbmc-raknet")
const Player = require("./player")
const Language = require("./language/language")
const PacketHandler = require("./network/loaders/packet_handler")

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

  constructor() {
    if (
      typeof process === "undefined" ||
      process.versions.node.split(".")[0] <= 14
    ) {
      console.error(
        `Supported node version is ^15.x but received ${process.version.node}`
      )
      process.exit(-1)
    }

    this.language = new Language("eng")
    this.players = new Map()
    this.raknet_server = new RakNetServer(
      new InternetAddress("0.0.0.0", 19132, 4),
      11
    )
    this.raknet_server.message = "MCPE;Testserver;0;1.19.73;0;10;"
    this.raknet_server.on("disconnect", (address) => {
      console.log(`${address.name}:${address.port} disconnected.`)
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
      console.log(
        `${connection.address.name}:${connection.address.port} connected!`
      )
    })
    this.raknet_server.on("packet", (stream, connection) => {
      PacketHandler.handler(stream, connection)
    })
    console.log(this.language.server("loaded"))
  }
}

module.exports = Server
