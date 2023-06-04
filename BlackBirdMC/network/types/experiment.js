const StringCodec = require("../codecs/string_codec");

class Experiment {
    /**
     * @type {String}
     */
    name;
    /**
     * @type {Boolean}
     */
    enabled;

    read(stream) {
        this.name = StringCodec.read_string_vil(stream);
        this.enabled = stream.readBool();
    }

    write(stream) {
        StringCodec.write_string_vil(stream, this.name);
        stream.writeBool(this.enabled)
    }
}

module.exports = Experiment;