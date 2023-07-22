class CoordinateUtils {
    static hashXZ(x, z) {
        return BigInt(x & 0xffffffff) << 32n | BigInt(z & 0xffffffff);
    }

    static unhashXZ(xz) {
        const x = Number(xz >> 32n & 0xffffffff);
        const z = Number(xz & 0xffffffff);
        return [x, z];
    }
}

module.exports = CoordinateUtils;