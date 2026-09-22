const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');

const buf = fs.readFileSync('public/assets/models/laptop.glb');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  let screenMesh = null;
  gltf.scene.traverse(c => {
    if (c.name === 'Laptop007_Material006_0') screenMesh = c;
  });

  const pos = screenMesh.geometry.attributes.position;
  const normal = screenMesh.geometry.attributes.normal;
  const index = screenMesh.geometry.index;

  // Let's inspect the triangles
  let faceCount = index ? index.count / 3 : pos.count / 3;
  console.log('Total triangles in screenMesh:', faceCount);

  // Group vertices by normal
  const planarVerts = [];
  for (let i = 0; i < pos.count; i++) {
    const nx = normal.getX(i);
    const ny = normal.getY(i);
    const nz = normal.getZ(i);
    if (nx < -0.9) {
      planarVerts.push({
        i,
        x: pos.getX(i),
        y: pos.getY(i),
        z: pos.getZ(i)
      });
    }
  }
  console.log(`Planar front-facing vertices: ${planarVerts.length} out of ${pos.count}`);
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  let minX = Infinity, maxX = -Infinity;
  planarVerts.forEach(v => {
    minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y);
    minZ = Math.min(minZ, v.z); maxZ = Math.max(maxZ, v.z);
    minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x);
  });
  console.log(`Planar bounds:`);
  console.log(`  X: [${minX.toFixed(5)}, ${maxX.toFixed(5)}]`);
  console.log(`  Y: [${minY.toFixed(5)}, ${maxY.toFixed(5)}]`);
  console.log(`  Z: [${minZ.toFixed(5)}, ${maxZ.toFixed(5)}]`);
});
