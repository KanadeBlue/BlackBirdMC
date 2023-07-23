const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");
const BinaryStream = require("bbmc-binarystream");

class LoginPacket extends PacketBase {
    /**
     * @type {Number}
     */
    protocol_version;
    /**
     * @type {String}
     */
    identity;
    /**
     * @type {String}
     */
    client;

    constructor() {
        super(PacketIdentifiers.LOGIN);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.protocol_version = stream.readIntBE();
        let inner_stream = new BinaryStream(stream.read(stream.readVarInt()));
        this.identity = StringCodec.read_string_lil(inner_stream);
        this.client = StringCodec.read_string_lil(inner_stream);
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeIntBE(this.protocolVersion);
        let inner_stream = new BinaryStream();
        StringCodec.write_string_lil(inner_stream, this.identity);
        StringCodec.write_string_lil(inner_stream, this.client);
        stream.writeVarInt(inner_stream.buffer.length);
        stream.write(inner_stream.buffer);
    }
}

module.exports = LoginPacket;