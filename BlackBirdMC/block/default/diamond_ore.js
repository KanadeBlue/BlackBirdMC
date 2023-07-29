const Block = require("../block");
const Tool = require("../tool");

class DiamondOre extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 3;
    hardness = 3;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:diamond_ore", 0);
    }
}

module.exports = DiamondOre;