const Block = require("../block");
const Tool = require("../tool");

class Redstone extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 6;
    hardness = 5;
    isLuminant = false; // TODO: Add partial luminance
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:redstone_block", 0);
    }
}

module.exports = Redstone;