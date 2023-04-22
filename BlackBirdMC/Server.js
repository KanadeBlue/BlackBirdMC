
const { RakNetServer, Frame, ReliabilityTool, InternetAddress, Connection } = require("bbmc-raknet");
const Player = require("./player");
const GamePacket = require("./network/packets/game_packet");
const PacketIdentifiers = require("./network/packet_identifiers");
const BinaryStream = require("bbmc-binarystream");
const Language = require("./language/language");

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
            let addr = connection.address.toString();
            if (this.players.has(addr)) {
                let player = this.players.get(addr);
                let packet_id = stream.readUnsignedByte();
                if (packet_id == PacketIdentifiers.GAME) {
                    let game = new GamePacket(player.enable_compression, player.compression_algorithm);
                    game.read(stream);
                    game.buffers.forEach((buffer) => {
                        player.handle_packet(buffer);
                    });
                }
            }
            console.log(`${connection.address.name}:${connection.address.port} sent a packet`);
        });
        console.log(this.language.server("loaded"));
    }
}

module.exports = Server;