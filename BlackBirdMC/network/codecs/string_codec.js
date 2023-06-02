class StringCodec {
    /**
     * Reads a string from the stream with a var-int length header
     * @param {BinaryStream} stream
     * @returns {String}
     */
    static read_string_vil(stream) {
        return stream.read(stream.readVarInt()).toString("utf-8");
    }

    /**
     * Writes a string to the stream with a var-int length header
     * @param {BinaryStream} stream
     * @param {String} value
     */
    static write_string_vil(stream, value) {
        let buf = Buffer.from(value);
        stream.writeVarInt(buf.length);
        stream.write(buf);
    }

    /**
     * Reads a string from the stream with a var-int length header
     * @param {BinaryStream} stream
     * @returns {String}
     */
    static read_string_lil(stream) {
        return stream.read(stream.readIntLE()).toString("utf-8");
    }

    /**
     * Writes a string to the stream with a var-int length header
     * @param {BinaryStream} stream
     * @param {String} value
     */
    static write_string_lil(stream, value) {
        let buf = Buffer.from(value);
        stream.writeIntLE(buf.length);
        stream.write(buf);
    }
}

module.exports = StringCodec;