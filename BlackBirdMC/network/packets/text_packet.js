const TextTypes = require("../constants/text_types");
const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");

class textPacket extends PacketBase {
    /**
     * @type {Number}
     */
    type_id;
    /**
     * @type {String}
     */
    source_user_name;
    /**
     * @type {String}
     */
    message;
    /**
     * @type {Array<String>}
     */
    parameters;
    /**
     * @type {String}
     */
    xuid;
    /**
     * @type {String}
     */
    platform_chat_id;

    constructor() {
        super(PacketIdentifiers.TEXT);
    }

    /** 
     * @param {binary_stream} stream 
    **/
    read(stream) {
        this.type_id = stream.readUnsignedByte();
        switch (this.type_id) {
            case TextTypes.CHAT:
            case TextTypes.WHISPER:
            case TextTypes.ANNOUNCEMENT:
                this.source_user_name = StringCodec.read_string_vil(stream);
                break;
            case TextTypes.RAW:
            case TextTypes.TIP:
            case TextTypes.SYSTEM:
            case TextTypes.JSON_WHISPER:
            case TextTypes.JSON:
            case TextTypes.JSON_ANNOUNCEMENT:
                this.message = StringCodec.read_string_vil(stream);
                break;
            case TextTypes.TRANSLATION:
            case TextTypes.POPUP:
            case TextTypes.JUKEBOX_POPUP:
                this.message = StringCodec.read_string_vil(stream);
                for (let i = 0; i < this.readVarInt(); ++i) {
                    this.parameters.push(this.readStringVarInt());
                }
                break;
        }
        this.xuid = StringCodec.read_string_vil(stream);
        this.platform_chat_id = StringCodec.read_string_vil(stream);
    }

    /**
     * 
     * @param {binary_stream} stream 
     */
    write(stream) {
        stream.writeUnsignedByte(this.type_id);
        switch (this.type_id) {
            case TextTypes.CHAT:
            case TextTypes.WHISPER:
            case TextTypes.ANNOUNCEMENT:
                StringCodec.write_string_vil(stream, this.source_user_name);
                break;
            case TextTypes.RAW:
            case TextTypes.TIP:
            case TextTypes.SYSTEM:
            case TextTypes.JSON_WHISPER:
            case TextTypes.JSON:
            case TextTypes.JSON_ANNOUNCEMENT:
                stream.writeStringVarInt(this.message);
                break;
            case TextTypes.TRANSLATION:
            case TextTypes.POPUP:
            case TextTypes.JUKEBOX_POPUP:
                StringCodec.write_string_vil(stream, this.message);
                this.parameters.forEach(param => StringCodec.write_string_vil(stream, param));
                break;
        }
        StringCodec.write_string_vil(stream, this.xuid);
        StringCodec.write_string_vil(stream, this.platform_chat_id);
    }
}



module.exports = textPacket;