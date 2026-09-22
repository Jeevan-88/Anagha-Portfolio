const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');

const buf = fs.readFileSync('public/assets/models/laptop.glb');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  let screenMesh = null;
  gltf.scene.traverse((child) => {
    if (child.name === 'Laptop007_Material006_0') screenMesh = child;
  });

  const pos = screenMesh.geometry.attributes.position;
  const normal = screenMesh.geometry.attributes.normal;
  
  // Find vertices pointing towards front (normal)
  const forwardVerts = [];
  for (let i = 0; i < pos.count; i++) {
    forwardVerts.push({
      i,
      x: pos.getX(i),
      y: pos.getY(i),
      z: pos.getZ(i),
      nx: normal.getX(i),
      ny: normal.getY(i),
      nz: normal.getZ(i),
    });
  }
  forwardVerts.sort((a, b) => b.x - a.x);
  console.log('Top 10 highest X:');
  forwardVerts.slice(0, 10).forEach(v => console.log(`x=${v.x.toFixed(4)}, y=${v.y.toFixed(4)}, z=${v.z.toFixed(4)}, n=(${v.nx.toFixed(2)},${v.ny.toFixed(2)},${v.nz.toFixed(2)})`));
  console.log('Top 10 lowest X:');
  forwardVerts.slice(-10).forEach(v => console.log(`x=${v.x.toFixed(4)}, y=${v.y.toFixed(4)}, z=${v.z.toFixed(4)}, n=(${v.nx.toFixed(2)},${v.ny.toFixed(2)},${v.nz.toFixed(2)})`));
});
