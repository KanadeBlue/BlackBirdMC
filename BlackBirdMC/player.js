const {Frame, ReliabilityTool, InternetAddress, Connection} = require("bbmc-raknet");
const BinaryStream = require("bbmc-binarystream");
const PacketIdentifiers = require("./network/packet_identifiers");
const RequestNetworkSettingsPacket = require("./network/packets/request_network_settings_packet");
const NetworkSettingsPacket = require("./network/packets/network_settings_packet");
const GamePacket = require("./network/packets/game_packet");
const PlayStatusPacket = require("./network/packets/play_status_packet");
const PlayStatus = require("./network/constants/play_status");

class Player {
    /**
     * @type {Connection}
     */
    connection;
    /**
     * @type {Boolean}
     */
    enable_compression;
    /**
     * @type {Number}
     */
    compression_algorithm;

    /**
     * @param {Connection} connection
     */
    constructor(connection) {
        this.connection = connection;
        this.enable_compression = false;
        this.compression_algorithm = 0;
    }

    /**
     * @param {Buffer} buffer
     */
    handle_packet(buffer) {
        let stream = new BinaryStream(buffer);
        let packet_id = stream.readVarInt();
        console.log(packet_id.toString(16));
        switch(packet_id) {
            case PacketIdentifiers.REQUEST_NETWORK_SETTINGS:
                let request_network_settings = new RequestNetworkSettingsPacket();
                request_network_settings.read(stream);
                // check the protocol version
                this.send_network_settings();
                if (request_network_settings.client_protocol != PacketIdentifiers.PROTOCOL_VERSION) {
                    this.send_play_status(PlayStatus.FAILED_CLIENT);
                }
                break;
            case PacketIdentifiers.LOGIN:
                this.send_play_status(PlayStatus.LOGIN_SUCCESS);
                break;
        }
    }

    send_play_status(status) {
        let play_status = new PlayStatusPacket();
        play_status.status = status;
        let stream = new BinaryStream();
        play_status.write(stream);
        this.send_packet(stream.buffer);
    }

    send_network_settings() {
        let network_settings = new NetworkSettingsPacket();
        network_settings.compression_algorithm = this.compression_algorithm;
        network_settings.compression_threshold = 0;
        network_settings.client_throttle = false;
        network_settings.client_throttle_threshold = 0;
        network_settings.client_throttle_scalar = 0;
        let stream = new BinaryStream();
        network_settings.write(stream);
        this.send_packet(stream.buffer);
        this.enable_compression = true;
    }

    /**
     * @param {Buffer} buffer
     */
    send_packet(buffer) {
        let game_packet = new GamePacket(this.enable_compression, this.compression_algorithm);
        game_packet.buffers = [buffer];
        let stream = new BinaryStream();
        game_packet.write(stream);
        let frame = new Frame();
        frame.isFragmented = false;
        frame.reliability = ReliabilityTool.RELIABLE_ORDERED;
        frame.orderChannel = 0;
        frame.stream = stream;
        this.connection.addToQueue(frame);
    }
}

module.exports = Player;