const Block = require("../block");
const Tool = require("../tool");

class Sand extends Block {
    maxStack = 64;
    tool = Tool.shovel;
    blastResistance = 0.5;
    hardness = 0.5;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = true;

    constructor() {
        super("minecraft:sand", 0);
    }
}

module.exports = Sand;