const Block = require("../block");
const Tool = require("../tool");

class CoalBlock extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 6;
    hardness = 5;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = true;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:coal_block", 0);
    }
}

module.exports = CoalBlock;