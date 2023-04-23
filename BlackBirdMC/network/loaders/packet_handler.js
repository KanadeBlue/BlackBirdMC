const Player = require("../../player");
const PacketIdentifiers = require("../packet_identifiers");
const GamePacket = require("../packets/game_packet");

class PacketHandler {
    static handler(stream, connection, server) {
        let addr = connection.address.toString();
        if (server.players.has(addr)) {
            let player = server.players.get(addr);
            let packet_id = stream.readUnsignedByte();
            switch (packet_id) {
                case PacketIdentifiers.GAME: 
                    let game_packet = new GamePacket(player.enable_compression, player.compression_algorithm);
                    game_packet.read(stream);
                    game_packet.buffers.forEach((buffer) => {
                        console.log(buffer);
                        if (buffer.length) {
                            player.handle_packet(buffer);
                        }
                    });
                    break;
            }
            console.log(`${connection.address.name}:${connection.address.port} sent a packet`);
        }
    }
}

module.exports = PacketHandler;