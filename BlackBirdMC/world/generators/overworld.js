const fs = require('fs');

const width = 256;
const height = 128;
const length = 256;

const roughness = 0.5;
const amplitude = 30;

const biomes = {
  'ocean': {
    min: -Infinity,
    max: 40,
    block: 9
  },
  'plains': {
    min: 40,
    max: 60,
    block: 2
  },
  'forest': {
    min: 60,
    max: 90,
    block: 2
  },
  'mountain': {
    min: 90,
    max: Infinity,
    block: 1
  }
};

function createEmptyWorld() {
  const world = new Array(height);
  for (let y = 0; y < height; y++) {
    world[y] = new Array(length);
    for (let z = 0; z < length; z++) {
      world[y][z] = new Array(width).fill(0);
    }
  }
  return world;
}

function diamondSquareAlgorithm(world, x1, z1, x2, z2, scale) {
  const halfScale = scale / 2;

  for (let z = z1 + halfScale; z < z2; z += scale) {
    for (let x = x1 + halfScale; x < x2; x += scale) {
      const topLeft = world[z - halfScale][x - halfScale];
      const topRight = world[z - halfScale][x + halfScale];
      const bottomLeft = world[z + halfScale][x - halfScale];
      const bottomRight = world[z + halfScale][x + halfScale];

      const average = (topLeft + topRight + bottomLeft + bottomRight) / 4;
      const offset = Math.random() * scale * roughness;
      const value = Math.floor(average + offset);
      world[z][x] = value;
    }
  }

  for (let z = z1 + halfScale; z < z2; z += scale) {
    for (let x = x1 + halfScale; x < x2; x += scale) {
      const topLeft = world[z - halfScale][x - halfScale];
      const topRight = world[z - halfScale][x + halfScale];
      const bottomLeft = world[z + halfScale][x - halfScale];
      const bottomRight = world[z + halfScale][x + halfScale];

      if (z - scale >= z1) {
        const top = world[z - scale][x];
        const average = (top + topLeft + topRight + world[z][x]) / 4;
        const offset = Math.random() * scale * roughness;
        const value = Math.floor(average + offset);
        world[z - halfScale][x] = value;
      }

      if (x + scale < x2) {
        const right = world[z][x + scale];
        const average = (topRight + right + bottomRight + world[z][x]) / 4;
        const offset = Math.random() * scale * roughness;
        const value = Math.floor(average + offset);
        world[z][x + halfScale] = value;
      }

      if (z + scale < z2) {
        const bottom = world[z + scale][x];
        const average = (bottomLeft + bottomRight + bottom + world[z][x]) / 4;
        const offset = Math.random() * scale * roughness;
        const value = Math.floor(average + offset);
        world[z + halfScale][x] = value;
      }

      if (x - scale >= x1) {
        const left = world[z][x - scale];
        const average = (topLeft + bottomLeft + left + world[z][x]) / 4;
        const offset = Math.random() * scale * roughness;
        const value = Math.floor(average + offset);
        world[z][x - halfScale] = value;
      }
    }
  }

  if (halfScale >= 1) {
    diamondSquareAlgorithm(world, x1, z1, x2, z2, halfScale);
  }
}

function assignBiomes(world) {
  for (let y = 0; y < height; y++) {
    for (let z = 0; z < length; z++) {
      for (let x = 0; x < width; x++) {
        const heightValue = world[y][z][x];
        let biomeAssigned = false;

        for (const biome in biomes) {
          const { min, max, block } = biomes[biome];
          if (heightValue >= min && heightValue < max) {
            world[y][z][x] = block;
            biomeAssigned = true;
            break;
          }
        }

        if (!biomeAssigned) {
          world[y][z][x] = 1;
        }
      }
    }
  }
}

function generateWorld() {
  const world = createEmptyWorld();
  world[0][0][0] = 7;

  diamondSquareAlgorithm(world, 0, 0, width, length, Math.max(width, length));

  assignBiomes(world);

  return world;
}

function saveWorldToFile(world) {
  const data = JSON.stringify(world);
  fs.writeFileSync('world.json', data);
  console.log('World generation completed. The world data has been saved to "world.json".');
}

const world = generateWorld();
saveWorldToFile(world);
