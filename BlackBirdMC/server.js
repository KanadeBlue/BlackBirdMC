
const { RakNetServer, Frame, ReliabilityTool, InternetAddress, Connection } = require("bbmc-raknet");
const Player = require("./player");
const Language = require("./language/language");
const PacketHandler = require("./network/loaders/packet_handler");
const ColorFormat = require("./utils/color_format");
const ErrorHandler = require("./utils/error_handler");

class Server {
    /**
     * @type {RakNetServer}
     */
    raknet_server;
    /**
     * @type {Map<String, Player>}
     */
    players;
    /**
     * @type {Language}
     */
    language;

    constructor() {
        this.language = new Language("eng");
        this.players = new Map();
        this.raknet_server = new RakNetServer(
            new InternetAddress("0.0.0.0", 19132, 4),
            11
        );
        this.raknet_server.message = "MCPE;Testserver;0;1.19.73;0;10;"
        this.raknet_server.on("disconnect", (address) => {
            console.log(`${address.name}:${address.port} disconnected.`);
            let addr = address.toString();
            if (this.players.has(addr)) {
                this.players.delete(addr);
            }
        });

        this.raknet_server.on("connect", (connection) => {
            let addr = connection.address.toString();
            if (!this.players.has(addr)) {
                this.players.set(addr, new Player(connection));
            }
            console.log(`${connection.address.name}:${connection.address.port} connected!`);
        });
        this.raknet_server.on("packet", (stream, connection) => {
            PacketHandler.handler(stream, connection, this);
        });
        console.log(ColorFormat.get_color("Green") + this.language.server("loaded") + ColorFormat.get_color("Reset"));
    }
}

process.on("uncaughtException", (e) => {
    ErrorHandler.write_error(e);
    console.log(ColorFormat.get_color("red") + e.stack + ColorFormat.get_color("reset"));
    console.log(ColorFormat.get_color("green") + 'Error happend and crashed the server.' + ColorFormat.get_color("reset"));
    process.exit(0);
});

module.exports = Server;