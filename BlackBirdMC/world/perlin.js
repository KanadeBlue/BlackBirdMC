class PerlinNoise {
    constructor() {
      this.p = new Uint8Array(512);
      this.permutation = [
        151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
        // ... (the rest of the permutation array, same as before) ...
      ];
  
      for (let i = 0; i < 256; i++) {
        this.p[i] = this.p[i + 256] = this.permutation[i];
      }
    }
  
    fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
  
    lerp(t, a, b) {
      return a + t * (b - a);
    }
  
    grad(hash, x, y, z) {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
  
    noise(x, y, z) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
  
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
  
      const u = this.fade(x);
      const v = this.fade(y);
      const w = this.fade(z);
  
      const A = this.p[X] + Y;
      const AA = this.p[A] + Z;
      const AB = this.p[A + 1] + Z;
      const B = this.p[X + 1] + Y;
      const BA = this.p[B] + Z;
      const BB = this.p[B + 1] + Z;
  
      return this.lerp(
        w,
        this.lerp(
          v,
          this.lerp(u, this.grad(this.p[AA], x, y, z), this.grad(this.p[BA], x - 1, y, z)),
          this.lerp(u, this.grad(this.p[AB], x, y - 1, z), this.grad(this.p[BB], x - 1, y - 1, z))
        ),
        this.lerp(
          v,
          this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1), this.grad(this.p[BA + 1], x - 1, y, z - 1)),
          this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1), this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))
        )
      );
    }
  
    perlinNoise(x, y, z, octaves = 1, persistence = 0.5) {
      let total = 0;
      let frequency = 1;
      let amplitude = 1;
      let maxValue = 0;
  
      for (let i = 0; i < octaves; i++) {
        total += this.noise(x * frequency, y * frequency, z * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
      }
  
      return total / maxValue;
    }
  }
  
  module.exports = PerlinNoise;
  