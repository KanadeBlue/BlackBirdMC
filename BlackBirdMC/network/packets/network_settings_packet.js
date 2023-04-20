const BinaryStream = require("bbmc-binarystream");
const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class NetworkSettingsPacket extends PacketBase {
    /**
     * @type {Number}
     */
    compression_threshold;
    /**
     * @type {Number}
     */
    compression_algorithm;
    /**
     * @type {Boolean}
     */
    client_throttle;
    /**
     * @type {Number}
     */
    client_throttle_threshold;
    /**
     * @type {Number}
     */
    client_throttle_scalar;

    constructor() {
        super(PacketIdentifiers.NETWORK_SETTINGS);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.compression_threshold = stream.readUnsignedShortLE();
        this.compression_algorithm = stream.readUnsignedShortLE();
        this.client_throttle = stream.readBool();
        this.client_throttle_threshold = stream.readUnsignedByte();
        this.client_throttle_scalar = stream.readFloatLE();
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeUnsignedShortLE(this.compression_threshold);
        stream.writeUnsignedShortLE(this.compression_algorithm);
        stream.writeBool(this.client_throttle);
        stream.writeUnsignedByte(this.client_throttle_threshold);
        stream.writeFloatLE(this.client_throttle_scalar);
    }
}

module.exports = NetworkSettingsPacket;