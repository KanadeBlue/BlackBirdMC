const StringCodec = require("../codecs/string_codec");

class EducationSharedResourceUri {
    /**
     * @type {String}
     */
    button_name;
    /**
     * @type {String}
     */
    link_uri;

    read(stream) {
        this.button_name = StringCodec.read_string_vil(stream);
        this.link_uri = StringCodec.read_string_vil(stream);
    }

    write(stream) {
        StringCodec.write_string_vil(stream, this.button_name);
        StringCodec.write_string_vil(stream, this.link_uri);
    }
}

module.exports = EducationSharedResourceUri;