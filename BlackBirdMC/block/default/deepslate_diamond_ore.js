const Block = require("../block");
const Tool = require("../tool");

class DeepslateDiamondOre extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 3;
    hardness = 4.5;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:deepslate_diamond_ore", 0);
    }
}

module.exports = DeepslateDiamondOre;