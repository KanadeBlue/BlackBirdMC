class PacketIdentifiers {
    static PROTOCOL_VERSION = 575;
    static GAME = 0xfe;
    static REQUEST_NETWORK_SETTINGS = 0xc1;
    static NETWORK_SETTINGS = 0x8f;
    static PLAY_STATUS = 0x02;
    static LOGIN = 0x01;
}

module.exports = PacketIdentifiers;