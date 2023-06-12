const StringCodec = require("../codecs/string_codec");

class ItemState {
    /**
     * @type {String}
     */
    name;
    /**
     * @type {Number}
     */
    runtime_id;
    /**
     * @type {Boolean}
     */
    component_based;

    read(stream) {
        this.name = StringCodec.read_string_vil(stream);
        this.runtime_id = stream.readShortLE();
        this.component_based = stream.readBool();
    }

    write(stream) {
        StringCodec.write_string_vil(stream, this.name);
        stream.writeShortLE(this.runtime_id);
        stream.writeBool(this.component_based);
    }
}

module.exports = ItemState;