const Block = require("../block");
const Tool = require("../tool");

class Air extends Block {
    maxStack = 64;
    tool = Tool.none;
    blastResistance = 0;
    hardness = 0;
    isLuminant = false;
    isTransparrent = true;
    isFlammable = false;
    catchesFireFromLava = false;

    constructor() {
        super("minecraft:air", 1);
    }
}

module.exports = Air;