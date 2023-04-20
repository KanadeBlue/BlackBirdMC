const BinaryStream = require("bbmc-binarystream");
const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const CompressAlgs = require("../constants/compress_algs");
const zlib = require("zlib");
const snappy = require("snappy");

class GamePacket extends PacketBase {
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
        super(PacketIdentifiers.GAME);
        this.enable_compression = enable_compression;
        this.compression_algorithm = compression_algorithm;
        this.buffers = [];
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        let data;
        if (this.compression_algorithm == CompressAlgs.ZLIB) {
            data = zlib.inflateRawSync(stream.readRemaining());
        } else if (this.compression_algorithm == CompressAlgs.SNAPPY) {
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
    write_body(stream) {
        let buffers_stream = new BinaryStream(data);
        this.buffers.forEach((buffer) => {
            buffers_stream.writeVarInt(buffer.length);
            buffers_stream.write(buffer);
        });
        if (this.compression_algorithm == CompressAlgs.ZLIB) {
            stream.write(zlib.deflateRawSync(buffers_stream.buffer));
        } else if (this.compression_algorithm == CompressAlgs.SNAPPY) {
            stream.write(snappy.compressSync(buffers_stream.buffer));
        } else {
            stream.write(buffers_stream.buffer);
        }
    }
}

module.exports = GamePacket;