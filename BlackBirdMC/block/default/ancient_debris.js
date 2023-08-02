const Block = require("../block");
const Tool = require("../tool");

class AncientDebris extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 1200;
    hardness = 30;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:ancient_debris", 0);
    }
}

module.exports = AncientDebris;