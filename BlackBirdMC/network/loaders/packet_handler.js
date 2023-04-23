const Player = require("../../player");
const PacketIdentifiers = require("../packet_identifiers");
const GamePacket = require("../packets/game_packet");

class PacketHandler {


    static handler(stream, connection) {
            let packet_id = stream.readUnsignedByte();
            let player = new Player(connection);
            switch (packet_id) {
                case PacketIdentifiers.GAME: 
                    let game_packet = new GamePacket(connection.enable_compression, connection.compression_algorithm);
                    game_packet.read(stream);
                    game_packet.buffers.forEach((buffer) => {
                        player.handle_packet(buffer);
                        console.log(buffer);
                    })
                    
            }
        console.log(`${connection.address.name}:${connection.address.port} sent a packet`);
    }
}

module.exports = PacketHandler;