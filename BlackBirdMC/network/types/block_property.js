const StringCodec = require("../codecs/string_codec");
const {Compound, NBTNetworkBinaryStream} = require("bbmc-nbt");

class BlockProperty {
    /**
     * @type {String}
     */
    name;
    /**
     * @type {Compound}
     */
    state;

    read(stream) {
        this.name = StringCodec.read_string_vil(stream);
        let nbt_stream = new NBTNetworkBinaryStream(stream.buffer, stream.offset);
        this.state = nbt_stream.readRootTag();
        stream.offset = nbt_stream.offset;
    }

    write(stream) {
        StringCodec.write_string_vil(stream, this.name);
        let nbt_stream = new NBTNetworkBinaryStream();
        nbt_stream.writeRootTag(this.state);
        stream.write(nbt_stream.buffer);
    }
}

module.exports = BlockProperty;