const Block = require("../block");
const Tool = require("../tool");

class RedstoneBlock extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 6;
    hardness = 5;
    isLuminant = false; 
    isTransparrent = true; // TODO: Add partial transparency
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:redstone_block", 0);
    }
}

module.exports = RedstoneBlock;