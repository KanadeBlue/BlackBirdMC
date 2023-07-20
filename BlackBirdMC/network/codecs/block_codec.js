const BlockCoordinates = require("../types/block_coordinates");

class BlockCodec {
    static readBlockCoordinates(stream) {
        let value = new BlockCoordinates();
        value.x = stream.readSignedVarInt();
        value.y = stream.readVarInt();
        value.z = stream.readSignedVarInt();
        return value;
    }

    static writeBlockCoordinates(stream, value) {
        stream.writeSignedVarInt(value.x);
        stream.writeVarInt(value.y);
        stream.writeSignedVarInt(value.z);
    }
}
module.exports = BlockCodec;