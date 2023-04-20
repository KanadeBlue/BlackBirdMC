const BinaryStream = require("bbmc-binarystream");

class PacketBase {
    /**
     * @type {Number}
     */
    id;

    /**
     * Constructs the packet base
     * @param {Number} packet_id 
     */
    constructor(packet_id) {
        this.id = packet_id;
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {}

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {}

    /**
     * Reads the packet from the stream
     * @param {BinaryStream} stream 
     */
    read(stream) {
        this.read_body(stream);
    }

    /**
     * Writes the packet to the stream
     * @param {BinaryStream} stream 
     */
    write(stream) {
        stream.writeVarInt(this.id);
        this.write_body(stream);
    }
}

module.exports = PacketBase;