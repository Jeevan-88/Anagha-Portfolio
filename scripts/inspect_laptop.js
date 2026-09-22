const fs = require('fs');

const buf = fs.readFileSync('public/assets/models/laptop.glb');
const jsonLen = buf.readUInt32LE(12);
const jsonChunk = buf.subarray(20, 20 + jsonLen).toString('utf8');
const gltf = JSON.parse(jsonChunk);

console.log('Nodes:');
gltf.nodes.forEach((n, i) => {
  console.log(`  node[${i}]: ${n.name}, mesh=${n.mesh}, children=${JSON.stringify(n.children)}`);
});

console.log('Meshes:');
gltf.meshes.forEach((m, i) => {
  console.log(`  mesh[${i}]: ${m.name}`);
  m.primitives.forEach((p, pi) => {
    const matName = gltf.materials ? gltf.materials[p.material]?.name : p.material;
    console.log(`    prim[${pi}]: material=${matName}, attrs=${Object.keys(p.attributes).join(',')}`);
  });
});

console.log('Materials:');
if (gltf.materials) {
  gltf.materials.forEach((m, i) => {
    console.log(`  mat[${i}]: ${m.name}`);
  });
}
