const Block = require("../block");
const Tool = require("../tool");

class Glowtone extends Block {
    maxStack = 64;
    tool = Tool.none;
    blastResistance = 0.3;
    hardness = 0.3;
    isLuminant = true;
    isTransparrent = true;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:glowstone", 0);
    }
}

module.exports = Glowtone;