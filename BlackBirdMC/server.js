/* eslint-disable no-undef */
const { RakNetServer, InternetAddress } = require("bbmc-raknet");
const Player = require("./player");
const Language = require("./language/language");
const PacketHandler = require("./network/loaders/packet_handler");
const ColorFormat = require("./utils/color_format");
const ErrorHandler = require("./utils/error_handler");
const PluginManager = require("./api/plugins/PluginManager");
const PlayStatus = require("./network/constants/play_status");
const CommandsList = require("./command/command_list");
const CommandReader = require("./utils/command_reader");
const ServerInfo = require("./server_info");
const Query = require("./api/Query");
const Advertisement = require("./advertisement");

class Server {
  constructor() {
    const startTime = Date.now();
    this.players = new Map();
    this.language = new Language(BBMC.config.BBMC.language);
    this.commands = new CommandsList();
    this.console_command_reader = new CommandReader(this).handle();
    this.plugins = new PluginManager();
    this.whitelist = require('../bbmc/whitelist.json');
    this.advertisement = new Advertisement(this.players);

    if (BBMC.config.BBMC.Protocol.Query.enable) {
      const queryInfo = {
        host: BBMC.config.Vanilla.Server.ip,
        port: BBMC.config.Vanilla.Server.port,
        max_players: BBMC.config.Vanilla.Server.max_players,
        players: this.players,
        motd: BBMC.config.Vanilla.Server.motd,
        version: BBMC.config.Vanilla.Server.version.join('.'),
        plugins: [],
        engine: `${ServerInfo.engine} ${ServerInfo.version}`,
      };

      this.query_info = Object.assign({}, queryInfo);
      this.query = new Query(this.query_info);
    }

    this.raknet_server = new RakNetServer(
      new InternetAddress(BBMC.config.Vanilla.Server.host, BBMC.config.Vanilla.Server.port, 4),
      11
    );
    this.raknet_server.message = this.advertisement.getData();

    this.raknet_server.on("disconnect", (address) => {
      console.info(`${address.name}:${address.port} disconnected.`, ColorFormat.format_color("Client", "bold"));
      const addr = address.toString();
      if (this.players.has(addr)) {
        this.players.delete(addr);
      }
    });

    this.raknet_server.on("connect", (connection) => {
      const addr = connection.address.toString();
      /**
       * @type {Player}
       */
      let player;

      if (!this.players.has(addr)) {
        player = this.players.set(addr, new Player(connection)).get(addr);
      }

      if (this.players.size > BBMC.config.Vanilla.Server.max_players) {
        player.send_play_status(PlayStatus.FAILED_SERVER_FULL);
      }

      // TODO: Disconnect when player name is not included in whitelist.json

      console.info(
        `${connection.address.name}:${connection.address.port} connected!`,
        ColorFormat.format_color("Client", "bold")
      );
    });

    this.raknet_server.on("packet", (stream, connection) => {
      PacketHandler.handler(stream, connection, this);
    });

    console.info(this.language.getContent("server", "server-listening", {"ip": "0.0.0.0", "port": BBMC.config.Vanilla.Server.port}), ColorFormat.format_color("Server", "bold"));

    (async () => {
      await this.plugins.start();
      this.plugins.doTask("onEnable");
      

      this.query_info.plugins = Object.keys(this.plugins.plugins).map((key) => this.plugins.plugins[key].options.name);
    })();

    process.on('SIGINT', () => {
      this.plugins.doTask('onDisable');
      process.exit(0);
    });

    process.on("SIGUSR2", () => {
      this.plugins.doTask("onDisable");
      process.kill(process.pid, "SIGUSR2");
    });

    process.on("uncaughtException", (e) => {
      ErrorHandler.write_error(e);
      console.error(ColorFormat.format_color(e.stack, "Red"));
      console.error(ColorFormat.format_color("Error happened and crashed the server.", "Red"));
      return;
    });

    console.info(this.language.getContent("server", "server-enabled", {"time": `${(Date.now() - startTime) / 1000}`}), ColorFormat.format_color("Server", "bold"));
  }
}

module.exports = Server;
