const Block = require("../block");
const Tool = require("../tool");

class Gravel extends Block {
    maxStack = 64;
    tool = Tool.shovel;
    blastResistance = 0.6;
    hardness = 0.6;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = true;

    constructor() {
        super("minecraft:gravel", 0);
    }
}

module.exports = Gravel;