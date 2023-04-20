const BinaryStream = require("bbmc-binarystream");
const PacketIdentifiers = require("../packet_identifiers");
const CompressAlgs = require("../constants/compress_algs");
const zlib = require("zlib");
const snappy = require("snappy");

class GamePacket {
    /**
     * @type {Boolean}
     */
    enable_compression;
    /**
     * @type {Number}
     */
    compression_algorithm;

    /**
     * @type {Array<Buffer>}
     */
    buffers;

    constructor(enable_compression, compression_algorithm) {
        this.enable_compression = enable_compression;
        this.compression_algorithm = compression_algorithm;
        this.buffers = [];
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read(stream) {
        let data;
        if (this.compression_algorithm == CompressAlgs.ZLIB && this.enable_compression) {
            data = zlib.inflateRawSync(stream.readRemaining());
        } else if (this.compression_algorithm == CompressAlgs.SNAPPY && this.enable_compression) {
            data = snappy.uncompressSync(stream.readRemaining());
        } else {
            data = stream.readRemaining();
        }
        let buffers_stream = new BinaryStream(data);
        while (!buffers_stream.feos()) {
            this.buffers.push(buffers_stream.read(buffers_stream.readVarInt()));
        }
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write(stream) {
        stream.writeUnsignedByte(PacketIdentifiers.GAME);
        let buffers_stream = new BinaryStream();
        this.buffers.forEach((buffer) => {
            buffers_stream.writeVarInt(buffer.length);
            buffers_stream.write(buffer);
        });
        if (this.compression_algorithm == CompressAlgs.ZLIB && this.enable_compression) {
            stream.write(zlib.deflateRawSync(buffers_stream.buffer));
        } else if (this.compression_algorithm == CompressAlgs.SNAPPY && this.enable_compression) {
            stream.write(snappy.compressSync(buffers_stream.buffer));
        } else {
            stream.write(buffers_stream.buffer);
        }
    }
}

module.exports = GamePacket;