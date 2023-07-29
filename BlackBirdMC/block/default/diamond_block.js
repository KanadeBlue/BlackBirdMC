const Block = require("../block");
const Tool = require("../tool");

class DiamondBlock extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 6;
    hardness = 5;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:diamond_block", 0);
    }
}

module.exports = DiamondBlock;