const ColorFormat = require("../../utils/color_format");
const PacketIdentifiers = require("../packet_identifiers");
const PacketsList = require("../packet_list");
const GamePacket = require("../packets/game_packet");
const LoginPacket = require("../packets/login_packet");

class PacketHandler {
    static handler(stream, connection, server) {
        let addr = connection.address.toString();
        if (server.players.has(addr)) {
            let player = server.players.get(addr);
            let packet_id = stream.readUnsignedByte();
            switch (packet_id) {
                case PacketIdentifiers.GAME: 
                    var game_packet = new GamePacket(player.enable_compression, player.compression_algorithm);
                    game_packet.read(stream);
                    game_packet.buffers.forEach((buffer) => {
                        if (buffer.length) {
                            player.handle_packet(buffer);
                        }
                    });
                    break;
                case PacketIdentifiers.LOGIN:
                    var login_packet = new LoginPacket();
                    login_packet.read(stream); 
                    break;
            }
            console.debug(`${connection.address.name}:${connection.address.port} sent a packet`, ColorFormat.format_color('Client', 'bold'));
        }
    }
}

module.exports = PacketHandler;