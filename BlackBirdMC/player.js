/* eslint-disable no-case-declarations */
const Frame = require("bbmc-raknet").Frame;
const ReliabilityTool = require("bbmc-raknet").ReliabilityTool;
const BinaryStream = require("bbmc-binarystream");
const PacketIdentifiers = require("./network/packet_identifiers");
const RequestNetworkSettingsPacket = require("./network/packets/request_network_settings_packet");
const NetworkSettingsPacket = require("./network/packets/network_settings_packet");
const GamePacket = require("./network/packets/game_packet");
const PlayStatusPacket = require("./network/packets/play_status_packet");
const PlayStatus = require("./network/constants/play_status");
const ResourcePacksInfoPacket = require("./network/packets/resource_packs_info_packet");

class Player {
    connection;
    enable_compression;
    compression_algorithm;

    constructor(connection) {
        this.connection = connection;
        this.enable_compression = false;
        this.compression_algorithm = 0;
    }

    handle_packet(buffer) {
        let stream = new BinaryStream(buffer);
        let packet_id = stream.readVarInt();
        switch (packet_id) {
            case PacketIdentifiers.REQUEST_NETWORK_SETTINGS:
                let request_network_settings = new RequestNetworkSettingsPacket();
                request_network_settings.read(stream);
                this.send_network_settings();

                if (PacketIdentifiers.PROTOCOL_VERSION) {
                    if (request_network_settings.client_protocol !== PacketIdentifiers.PROTOCOL_VERSION) {
                        this.send_play_status(PlayStatus.FAILED_CLIENT);
                    }
                }
                break;
            case PacketIdentifiers.LOGIN:
                this.send_play_status(PlayStatus.LOGIN_SUCCESS);
                this.send_resource_packs_info();
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

    send_resource_packs_info() {
        let resource_packs_info = new ResourcePacksInfoPacket();
        resource_packs_info.must_accept = false;
        resource_packs_info.has_scripts = false;
        resource_packs_info.force_server_packs = false;
        resource_packs_info.behavior_packs = [];
        resource_packs_info.texture_packs = [];
        let stream = new BinaryStream();
        resource_packs_info.write(stream);
        this.send_packet(stream.buffer);
    }

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
