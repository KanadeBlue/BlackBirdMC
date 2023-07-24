const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");
// eslint-disable-next-line no-unused-vars
const BinaryStream = require("bbmc-binarystream");
const CommandOrigin = require("../types/command_origin");
const CommandOriginTypes = require("../constants/command_origin_types");

class CommandRequestPacket extends PacketBase {
    /**
     * @type {String}
     */
    command;
    origin;
    internal;
    version;

    constructor() {
        super(PacketIdentifiers.COMMAND_REQUEST);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.command = StringCodec.read_string_lil(stream);
        this.origin = this.command_origin(stream);
        this.internal = stream.readBool();
        this.version = stream.readVarInt();   
    }

      

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        StringCodec.write_string_lil(stream, this.command);
    }

    command_origin(stream) {
        let origin = new CommandOrigin();
        origin.typeID = stream.readVarInt();
        origin.uuid = this.read_UUID()
        origin.requestID = stream.read_string_vil(stream);
        if (origin.typeID === CommandOriginTypes.dev_console || value.typeID === CommandOriginTypes.test) {
            origin.entityID = stream.readSignedVarLong();
        }
        return value;
    }

    read_UUID() {
        const temp = this.read(16);
        let value = "";
        
        for (let i = 0; i < 16; i++) {
          value += (i === 4 || i === 6 || i === 8 || i === 10) ? '-' : '';
          value += temp[i].toString(16).padStart(2, '0');
        }
        
        return value;
      }
}

module.exports = CommandRequestPacket;
