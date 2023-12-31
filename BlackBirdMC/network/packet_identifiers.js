class PacketIdentifiers {
    // eslint-disable-next-line no-undef
    static PROTOCOL_VERSION = 594;
    static GAME = 0xfe;
    static REQUEST_NETWORK_SETTINGS = 0xc1;
    static NETWORK_SETTINGS = 0x8f;
    static PLAY_STATUS = 0x02;
    static LOGIN = 0x01;
    static DISCONNECT = 0x05;
    static TEXT = 0x09;
    static RESOURCE_PACKS_INFO = 0x06;
    static RESOURCE_PACK_CLIENT_RESPONSE = 0x08;
    static RESOURCE_PACK_STACK = 0x07;
    static START_GAME = 0x0b;
    static CREATIVE_CONTENT = 0x91;
    static BIOME_DEFINITION_LIST = 0x7a;
    static COMMAND_REQUEST = 0x4d;
    static LEVEL_CHUNK = 0x3a;
    static CHUNK_RADIUS_UPDATED = 0x46;
    static REQUEST_CHUNK_RADIUS = 0x45;
    static NETWORK_CHUNK_PUBLISHER_UPDATE = 0x79;
}

module.exports = PacketIdentifiers;