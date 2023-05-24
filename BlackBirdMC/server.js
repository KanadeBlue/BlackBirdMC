const { RakNetServer, InternetAddress } = require("bbmc-raknet")
const Player = require("./player")
const Language = require("./language/language")
const PacketHandler = require("./network/loaders/packet_handler")
const ColorFormat = require("./utils/color_format")
const ErrorHandler = require("./utils/error_handler")
const PluginManager = require("./api/PluginManager")
const PlayStatus = require("./network/constants/play_status");
const CommandsList = require("./command/command_list");
const CommandReader = require("./utils/command_reader")

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
  // eslint-disable-next-line no-undef
  language = new Language(BBMC.config.BBMC.language);

  commands = new CommandsList();

  console_command_reader = new CommandReader(this).handle();

  /**
   * @private
   */
  plugins = new PluginManager();

  constructor() {
    let startTime = Date.now();
    this.players = new Map();
    this.raknet_server = new RakNetServer(
      // eslint-disable-next-line no-undef
      new InternetAddress(BBMC.config.Vanilla.Server.host, BBMC.config.Vanilla.Server.port, 4),
      11
    )
    this.raknet_server.message = "MCPE;Testserver;0;1.19.73;0;10;"
    this.raknet_server.on("disconnect", (address) => {
      console.info(`${address.name}:${address.port} disconnected.`, ColorFormat.format_color("Client", "bold"));
      let addr = address.toString()
      if (this.players.has(addr)) {
        this.players.delete(addr)
      }
    })

    this.raknet_server.on("connect", (connection) => {
      let addr = connection.address.toString()
      let player;
      if (!this.players.has(addr)) {
        player = this.players.set(addr, new Player(connection)).get(addr)
      }

      // eslint-disable-next-line no-undef
      if (this.players.size > BBMC.config.Vanilla.Server.max_players) {
        player.send_play_status(PlayStatus.FAILED_INVALID_TENANT)
      }

      this.commands.load();

      this.console_command_reader.handle();


      console.info(
        `${connection.address.name}:${connection.address.port} connected!`,
        ColorFormat.format_color("Client", "bold")
      )
    })
    this.raknet_server.on("packet", (stream, connection) => {
      PacketHandler.handler(stream, connection, this)
    })
    // eslint-disable-next-line no-undef
    console.info("Listening to 0.0.0.0:" + BBMC.config.Vanilla.Server.port, ColorFormat.format_color("Server", "bold"));

    (async () => {
      await this.plugins.start()
      this.plugins.doTask("onEnable")
    })()
    console.info(`Server Loaded in [${(Date.now() - startTime) / 1000}]`, ColorFormat.format_color("Server", "bold"));

    process.on('SIGINT', () => {
      this.plugins.doTask('onDisable')

      process.exit(0)
    })

    process.on('SIGUSR2', () => {
      this.plugins.doTask('onDisable')

      process.kill(process.pid, 'SIGUSR2')
    })
  }
}

process.on("uncaughtException", (e) => {
  ErrorHandler.write_error(e)
  console.error(ColorFormat.format_color(e.stack, "Red"));
  console.error(ColorFormat.format_color("Error happened and crashed the server.", "Green"));
  process.exit(0);
})

module.exports = Server
