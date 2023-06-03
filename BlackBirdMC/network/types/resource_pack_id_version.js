const StringCodec = require("../codecs/string_codec");

class ResourcePackIdVersion {
    /**
     * @type {String}
     */
    uuid;
    /**
     * @type {String}
     */
    version;
    /**
     * @type {String}
     */
    name;

    read(stream) {
        this.uuid = StringCodec.read_string_vil(stream);
        this.version = StringCodec.read_string_vil(stream);
        this.name = StringCodec.read_string_vil(stream);
    }

    write(stream) {
        StringCodec.write_string_vil(stream, this.uuid);
        StringCodec.write_string_vil(stream, this.version);
        StringCodec.write_string_vil(stream, this.name);
    }
}

module.exports = ResourcePackIdVersion;