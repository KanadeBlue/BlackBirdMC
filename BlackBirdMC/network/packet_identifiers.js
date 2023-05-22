const Versions = require("./constants/versions");

class PacketIdentifiers {
    // eslint-disable-next-line no-undef
    static PROTOCOL_VERSION = Versions[BBMC.config?.Vanilla?.Server?.version.join('.')];
    static GAME = 0xfe;
    static REQUEST_NETWORK_SETTINGS = 0xc1;
    static NETWORK_SETTINGS = 0x8f;
    static PLAY_STATUS = 0x02;
    static LOGIN = 0x01;
    static DISCONNECT = 0x05;
    static TEXT = 0x09;
}

module.exports = PacketIdentifiers;