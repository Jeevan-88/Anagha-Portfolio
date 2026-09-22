const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');

const buf = fs.readFileSync('public/assets/models/laptop.glb');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  gltf.scene.traverse((child) => {
    if (child.name.includes('007')) {
      console.log('Object:', child.name, child.type);
      if (child.geometry) {
        child.geometry.computeBoundingBox();
        console.log('  Bounding box:', JSON.stringify(child.geometry.boundingBox));
        const pos = child.geometry.attributes.position;
        console.log('  Vertex count:', pos.count);
        // Sample min/max
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;
        for (let i = 0; i < pos.count; i++) {
          minX = Math.min(minX, pos.getX(i)); maxX = Math.max(maxX, pos.getX(i));
          minY = Math.min(minY, pos.getY(i)); maxY = Math.max(maxY, pos.getY(i));
          minZ = Math.min(minZ, pos.getZ(i)); maxZ = Math.max(maxZ, pos.getZ(i));
        }
        console.log(`  X: [${minX.toFixed(5)}, ${maxX.toFixed(5)}]`);
        console.log(`  Y: [${minY.toFixed(5)}, ${maxY.toFixed(5)}]`);
        console.log(`  Z: [${minZ.toFixed(5)}, ${maxZ.toFixed(5)}]`);
        const uv = child.geometry.attributes.uv;
        if (uv) {
          let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
          for (let i = 0; i < uv.count; i++) {
            minU = Math.min(minU, uv.getX(i)); maxU = Math.max(maxU, uv.getX(i));
            minV = Math.min(minV, uv.getY(i)); maxV = Math.max(maxV, uv.getY(i));
          }
          console.log(`  Original UV: U: [${minU.toFixed(5)}, ${maxU.toFixed(5)}], V: [${minV.toFixed(5)}, ${maxV.toFixed(5)}]`);
        }
      }
    }
  });
}, (err) => console.error(err));
