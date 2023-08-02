const fs = require("fs").promises;

class BlocksList {
  static list = new Map();
  static dirPath = `${__dirname}/default`;

  static async refresh() {
      const files = await fs.readdir(this.dirPath);
      for (const file of files) {
        const block = await require(`${this.dirPath}/${file}`);
        this.add(new block());
      }
  }

  static add(block) {
    const blockAndMetadata = `${block.blockName} ${block.metadata}`;
    if (!this.list.has(blockAndMetadata)) {
      this.list.set(blockAndMetadata, block);
    }
  }

  static remove(block) {
    const blockAndMetadata = `${block.blockName} ${block.metadata}`;
    if (this.list.has(blockAndMetadata)) {
      this.list.delete(blockAndMetadata);
    }
  }

  static get(blockName, metadata = 0) {
    const blockAndMetadata = `${blockName} ${metadata}`;
    if (!this.list.has(blockAndMetadata)) {
      throw new Error("Trying to get unregistered block");
    }
    return this.list.get(blockAndMetadata);
  }
}

(async () => {
    await BlocksList.refresh();
})();

module.exports = BlocksList;
