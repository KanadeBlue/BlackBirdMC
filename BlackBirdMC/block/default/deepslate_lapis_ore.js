const Block = require("../block");
const Tool = require("../tool");

class DeepslateLapisOre extends Block {
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
        super("minecraft:deepslate_lapis_ore", 0);
    }
}

module.exports = DeepslateLapisOre;