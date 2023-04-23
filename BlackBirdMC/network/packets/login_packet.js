const BinaryStream = require("bbmc-binarystream");
const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class LoginPacket extends PacketBase {
    /**
     * @type {Number}
     */
    protocolVersion;
    loginTokens;

    constructor() {
        super(PacketIdentifiers.LOGIN);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read(stream) {
        this.protocolVersion = stream.readIntBE();
        //this.loginTokens = stream.readLoginTokens();
        //console.log(this.loginTokens);
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write(stream) {
        stream.writeIntBE(this.protocolVersion);
        //stream.writeLoginTokens(this.loginTokens);
        //stream.writeByteArrayVarInt(stream.buffer);
    }
}

module.exports = LoginPacket;