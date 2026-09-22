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
  console.log('Position count:', pos.count);
  for (let i = 0; i < Math.min(pos.count, 20); i++) {
    console.log(`v${i}: pos=(${pos.getX(i).toFixed(3)}, ${pos.getY(i).toFixed(3)}, ${pos.getZ(i).toFixed(3)}) normal=(${normal.getX(i).toFixed(3)}, ${normal.getY(i).toFixed(3)}, ${normal.getZ(i).toFixed(3)})`);
  }
});
