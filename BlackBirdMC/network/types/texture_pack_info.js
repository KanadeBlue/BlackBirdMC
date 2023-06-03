const StringCodec = require("../codecs/string_codec");

class TexturePackInfo {
    /**
     * @type {String}
     */
    uuid;
    /**
     * @type {String}
     */
    version;
    /**
     * @type {Number}
     */
    size;
    /**
     * @type {String}
     */
    content_key;
    /**
     * @type {String}
     */
    sub_pack_name;
    /**
     * @type {String}
     */
    content_identity;
    /**
     * @type {Boolean}
     */
    has_scripts;
    /**
     * @type {Boolean}
     */
    rtx_enabled;

    read(stream) {
        this.uuid = StringCodec.read_string_vil(stream);
        this.version = StringCodec.read_string_vil(stream);
        this.size = stream.readUnsignedLongLE();
        this.content_key = StringCodec.read_string_vil(stream);
        this.sub_pack_name = StringCodec.read_string_vil(stream);
        this.content_identity = StringCodec.read_string_vil(stream);
        this.has_scripts = stream.readBool();
        this.rtx_enabled = stream.readBool();
    }

    write(stream) {
        StringCodec.write_string_vil(stream, this.uuid);
        StringCodec.write_string_vil(stream, this.version);
        stream.writeUnsignedLongLE(this.size);
        StringCodec.write_string_vil(stream, this.content_key);
        StringCodec.write_string_vil(stream, this.sub_pack_name);
        StringCodec.write_string_vil(stream, this.content_identity);
        stream.writeBool(this.has_scripts);
        stream.writeBool(this.rtx_enabled);
    }
}

module.exports = TexturePackInfo;