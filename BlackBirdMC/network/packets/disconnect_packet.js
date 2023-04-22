const BinaryStream = require("bbmc-binarystream");
const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class DisconnectPacket extends PacketBase {
    /**
     * @type {Number}
     */
    hideNotification;
    message;

    constructor() {
        super(PacketIdentifiers.DISCONNECT);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read(stream) {
        this.hideNotification = stream.readBool();
        this.message = stream.readStringVarInt();
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write(stream) {
        stream.writeBool(this.hideNotification);
        stream.writeStringVarInt(this.message);
    }
}

module.exports = DisconnectPacket;