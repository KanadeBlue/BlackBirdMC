const fs = require("fs").promises;

class BlocksList {
  static list = new Map();
  static dirPath = `${__dirname}/default`;

  static async refresh() {
    try {
      const files = await fs.readdir(this.dirPath);
      for (const file of files) {
        const block = await import(`${this.dirPath}/${file}`);
        this.add(new block.default());
      }
    } catch (err) {
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
  try {
    await BlocksList.refresh();
  } catch (err) {
    console.error("Error initializing BlocksList:", err);
  }
})();

module.exports = BlocksList;
