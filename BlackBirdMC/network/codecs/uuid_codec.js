class UuidCodec {
    static read(stream) {
        let temp = stream.read(16);
        let value = "";
        let conv;
        for (let i = 0; i < 16; ++i) {
            conv = temp[i].toString(16);
            if (conv.length === 1) {
                value += "0";
            }
            value += conv;
            if (i == 3 || i == 5 || i == 7 || i == 9) {
                value += "-";
            }
        }
        return value;
    }

    static write(stream, value) {
        stream.writeUnsignedByte(parseInt(value.slice(0, 2), 16));
        stream.writeUnsignedByte(parseInt(value.slice(2, 4), 16));
        stream.writeUnsignedByte(parseInt(value.slice(4, 6), 16));
        stream.writeUnsignedByte(parseInt(value.slice(6, 8), 16));
        stream.writeUnsignedByte(parseInt(value.slice(9, 11), 16));
        stream.writeUnsignedByte(parseInt(value.slice(11, 13), 16));
        stream.writeUnsignedByte(parseInt(value.slice(14, 16), 16));
        stream.writeUnsignedByte(parseInt(value.slice(16, 18), 16));
        stream.writeUnsignedByte(parseInt(value.slice(19, 21), 16));
        stream.writeUnsignedByte(parseInt(value.slice(21, 23), 16));
        stream.writeUnsignedByte(parseInt(value.slice(24, 26), 16));
        stream.writeUnsignedByte(parseInt(value.slice(26, 28), 16));
        stream.writeUnsignedByte(parseInt(value.slice(28, 30), 16));
        stream.writeUnsignedByte(parseInt(value.slice(30, 32), 16));
        stream.writeUnsignedByte(parseInt(value.slice(32, 34), 16));
        stream.writeUnsignedByte(parseInt(value.slice(34, 36), 16));
    }
}
module.exports = UuidCodec;