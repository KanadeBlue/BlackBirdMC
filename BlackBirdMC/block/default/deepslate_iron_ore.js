const Block = require("../block");
const Tool = require("../tool");

class DeepslateIronOre extends Block {
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
        super("minecraft:deepslate_iron_ore", 0);
    }
}

module.exports = DeepslateIronOre;