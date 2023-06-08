const GameRuleTypes = require("../constants/game_rule_types");
const StringCodec = require("../codecs/string_codec");

class GameRule {
    /**
     * @type {String}
     */
    name;
    /**
     * @type {Boolean}
     */
    editable;
    /**
     * @type {Number}
     */
    type;
    /**
     * @type {Number|Boolean}
     */
    value;

    read(stream) {
        this.name = StringCodec.read_string_vil(stream);
        this.editable = stream.readBool();
        this.type = stream.readVarInt();
        switch (this.type) {
            case GameRuleTypes.BOOL:
                this.value = stream.readBool();
                break;
            case GameRuleTypes.FLOAT:
                this.value = stream.readFloatLE();
                break;
            case GameRuleTypes.INT:
                this.value = stream.readSignedVarInt();
                break;
        }
    }

    write(stream) {
        StringCodec.write_string_vil(stream, this.name);
        stream.writeBool(this.editable);
        stream.writeVarInt(this.type);
        switch (this.type) {
            case GameRuleTypes.BOOL:
                stream.writeBool(this.value);
                break;
            case GameRuleTypes.FLOAT:
                stream.writeFloatLE(this.value);
                break;
            case GameRuleTypes.INT:
                stream.writeSignedVarInt(this.value);
                break;
        }
    }
}

module.exports = GameRule;