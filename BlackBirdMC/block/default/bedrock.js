const Block = require("../block");
const Tool = require("../tool");

class Bedrock extends Block {
    maxStack = 64;
    tool = Tool.none;
    blastResistance = 3600000;
    hardness = -1;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:bedrock", 0);
    }
}

module.exports = Bedrock;