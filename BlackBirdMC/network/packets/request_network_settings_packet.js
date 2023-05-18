const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class RequestNetworkSettingsPacket extends PacketBase {
    /**
     * @type {Number}
     */
    client_protocol;

    constructor() {
        super(PacketIdentifiers.REQUEST_NETWORK_SETTINGS);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.client_protocol = stream.readIntBE();
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeIntBE(this.client_protocol);
    }
}

module.exports = RequestNetworkSettingsPacket;