const ColorFormat = require("../../utils/color_format");
const { GAME, LOGIN } = require("../packet_identifiers");
const GamePacket = require("../packets/game_packet");
const LoginPacket = require("../packets/login_packet");
const LoginHandle = require("./handler/login_handle");

class PacketHandler {
  static handler(stream, connection, server) {
    const addr = connection.address.toString();

    if (server.players.has(addr)) {
      const player = server.players.get(addr);
      const packet_id = stream.readUnsignedByte();

      const packetHandlers = {
        [LOGIN]: () => {
          const login_packet = new LoginPacket();
          login_packet.read(stream);
          LoginHandle.handler(login_packet, player);
        },
        [GAME]: () => {
          const game_packet = new GamePacket(player.enable_compression, player.compression_algorithm);
          game_packet.read(stream);
          game_packet.buffers.forEach((buffer) => {
            if (buffer.length) {
              player.handle_packet(buffer);
            }
          });
        },
      };

      const handlerFunc = packetHandlers[packet_id];
      if (handlerFunc) {
        handlerFunc();
      }

      console.debug(`${connection.address.name}:${connection.address.port} sent a packet`, ColorFormat.format_color('Client', 'bold'));
    }
  }
}

module.exports = PacketHandler;
