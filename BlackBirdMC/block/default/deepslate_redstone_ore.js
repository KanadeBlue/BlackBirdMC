const Block = require("../block");
const Tool = require("../tool");

class DeepslateRedstoneOre extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 3;
    hardness = 4.5;
    isLuminant = true;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:deepslate_redstone_ore", 0);
    }
}

module.exports = DeepslateRedstoneOre;