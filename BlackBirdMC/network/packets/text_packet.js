const binary_stream = require("bbmc-binarystream");
const text_types = require("../constants/text_types");
const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class textPacket extends PacketBase {
    typeID;
    sourceUserName;
    message;
    parameters;
    xuid;
    platformChatID;

    constructor() {
        super(PacketIdentifiers.TEXT);
    }

    /** 
     * @param {binary_stream} stream 
    **/
read(stream) {
    this.typeID = stream.readUnsignedByte();
    switch (this.typeID) {
        case text_types.chat:
        case text_types.whisper:
        case text_types.announcement:
            this.sourceUserName = stream.readStringVarInt();
        case text_types.raw:
        case text_types.tip:
        case text_types.system:
        case text_types.jsonWhisper:
        case text_types.json:
        case text_types.jsonAnnouncement:
            this.message = stream.readStringVarInt();
            break;
        case text_types.translation:
        case text_types.popup:
        case text_types.jukeboxPopup:
            this.message = stream.readStringVarInt();
            for (let i = 0; i < this.readVarInt(); ++i) {
                this.parameters.push(this.readStringVarInt());
            }
            break;
    }
    this.xuid = stream.readStringVarInt();
    this.platformChatID = stream.readStringVarInt();
}

/**
 * 
 * @param {binary_stream} stream 
 */
write(stream) {
    stream.writeUnsignedByte(this.typeID);
    switch (this.typeID) {
        case text_types.chat:
        case text_types.whisper:
        case text_types.announcement:
            stream.readStringVarInt(this.sourceUserName);
        case text_types.raw:
        case text_types.tip:
        case text_types.system:
        case text_types.jsonWhisper:
        case text_types.json:
        case text_types.jsonAnnouncement:
            stream.writeStringVarInt(this.message);
            break;
        case text_types.translation:
        case text_types.popup:
        case text_types.jukeboxPopup:
            stream.writeStringVarInt(this.message);
            for (let i = 0; i < this.parameters.length; ++i) {
                stream.writeStringVarInt(this.parameters[i]);
            }
            break;
    }
    stream.writeStringVarInt(this.xuid);
    stream.writeStringVarInt(this.platformChatID);
}
}



module.exports = textPacket;