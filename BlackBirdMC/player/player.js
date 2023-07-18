const Human = require("../entity/living/human");
const TextTypes = require("../network/constants/text_types");
const TextPacket = require("../network/packets/text_packet");
const Vector2F = require("../network/constants/vector2f");
const Vector3F = require("../network/constants/vector3f");


class Player extends Human {

    constructor(server) {
        super(server);
        this.name = "Console";
    }

    message(value) {
        this.text(TextTypes.RAW, value)
    }
   // stole from bluebirdmc for testing.
     text(id, message, needsTranslation = false, sourceName = "", parameters = [], xuid = "", platformChatID = "") {
        let text = new TextPacket();
        text.typeID = id;
        text.message = message;
        text.needsTranslation = needsTranslation;
        text.sourceName = sourceName;
        text.parameters = parameters;
        text.xuid = xuid;
        text.platformChatID = platformChatID;
        text.sendTo(this);
    }
}

module.exports = Player;