/* eslint-disable no-undef */

// Imports and Destructuring
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
const GeneratorManager = require("./utils/generator_manager");
const ResourceManager = require("./utils/resource_manager");
const Flat = require("./world/generators/flat");
const World = require("./world/world");
const Blocks = require("./block/block_list");
const RakNetPlayer = require('./utils/raknet_player');
const PacketsList = require("./network/packet_list");
const Normal = require("./world/generators/normal");
const EventListner = require("./event/event_list");

class Server {
  startTime = Date.now();
  
  constructor() {

    this.players = new Map();
    this.language = new Language(BBMC.config.BBMC.language);
    this.commands = new CommandsList();
    this.events = new EventListner();
    this.console_command_reader = new CommandReader(this).handle();
    this.plugins = new PluginManager();
    this.whitelist = require('../bbmc/whitelist.json');
    this.advertisement = new Advertisement(this.players);
    this.resource = new ResourceManager();
    this.resource.loadResources();
    this.generator = new GeneratorManager(this.resource.blockStatesMap);
    this.world = new World(this.generator);

    this.register_generation();

    // Refresh packets and blocks
    PacketsList.refresh();
    Blocks.refresh();

    // Query setup
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

    // RakNet Server setup
    this.raknet_server = new RakNetServer(
      new InternetAddress(BBMC.config.Vanilla.Server.host, BBMC.config.Vanilla.Server.port, 4),
      11
    );
    this.raknet_server.message = this.advertisement.getData();

    // Event handlers for RakNet Server
    this.raknet_server.on("disconnect", (address) => {
      console.info(`${address.name}:${address.port} disconnected.`, ColorFormat.format_color("Client", "bold"));
      const addr = address.toString();
      RakNetPlayer.unregister_player(addr);
      if (this.players.has(addr)) {
        this.players.delete(addr);
      }
    });

    new World(this.generator).pregenerateChunks(0, 0);

    this.raknet_server.on("connect", (connection) => {
      const addr = connection.address.toString();
      RakNetPlayer.register_player(addr, new Player(connection, this));

      // Player handling
      let player;
      if (!this.players.has(addr)) {
        player = this.players.set(addr, new Player(connection, this)).get(addr);
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

    // Plugin setup and lifecycle events
    console.info(this.language.getContent("server", "server-listening", {"ip": "0.0.0.0", "port": BBMC.config.Vanilla.Server.port}), ColorFormat.format_color("Server", "bold"));

    (async () => {
      await this.plugins.start();
      this.plugins.doTask("onEnable");
      this.query_info.plugins = Object.keys(this.plugins.plugins).map((key) => this.plugins.plugins[key].options.name);
    })();

    // Process event handlers
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
    });

    console.info(this.language.getContent("server", "server-enabled", {"time": `${(Date.now() - this.startTime) / 1000}`}), ColorFormat.format_color("Server", "bold"));
  }

  /**
     * @type {World}
   **/

  register_generation() {
    this.generator.registerGenerator(Flat);
    this.generator.registerGenerator(Normal);
  }

  /**
     * @type {Player}
     * @return {RakNetPlayer, players_data}
   **/
  getOnlinePlayers() {
    let players = [];
    RakNetPlayer.get_all_object_values().forEach((player) => {
      console.log(player)
      if (player instanceof Player) {
          players.push(player);
      }
    });
    return players;
  }
}

module.exports = Server;