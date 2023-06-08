const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");

class DisconnectPacket extends PacketBase {
    /**
     * @type {Boolean}
     */
    hide_notification;
    /**
     * @type {String}
     */
    message;

    constructor() {
        super(PacketIdentifiers.DISCONNECT);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read(stream) {
        this.hide_notification = stream.readBool();
        this.message = StringCodec.read_string_vil(stream);
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write(stream) {
        stream.writeBool(this.hide_notification);
        StringCodec.write_string_vil(stream, this.message);
    }
}

module.exports = DisconnectPacket;