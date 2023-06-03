const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");

class ResourcePackClientResponsePacket extends PacketBase {
    /**
     * @type {Number}
     */
    response_status;
    /**
     * @type {Array<String>}
     */
    resource_pack_ids;

    constructor() {
        super(PacketIdentifiers.RESOURCE_PACK_CLIENT_RESPONSE);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.response_status = stream.readUnsignedByte();
        let length = stream.readShortLE();
        this.resource_pack_ids = new Array(length);
        for (let i = 0; i < length; ++i) {
            this.resource_pack_ids[i] = StringCodec.read_string_vil(stream);
        }
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeUnsignedByte(this.response_status);
        stream.writeShortLE(this.resource_pack_ids.length);
        this.resource_pack_ids.forEach(pack_id => StringCodec.write_string_vil(stream, pack_id));
    }
}

module.exports = ResourcePackClientResponsePacket;