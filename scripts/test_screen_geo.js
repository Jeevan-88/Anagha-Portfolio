const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');

const buf = fs.readFileSync('public/assets/models/laptop.glb');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  let lid = null;
  gltf.scene.traverse(c => {
    if (c.name === 'Laptop007') lid = c;
  });

  // Calculate world positions of screen corners when lid is open
  lid.rotation.y = -0.12; // fully open angle
  gltf.scene.position.set(-0.347, -0.548, 0);
  gltf.scene.updateMatrixWorld(true);

  // Check screen quad placement
  const theta = Math.atan2(0.2832, 1);
  console.log('Theta:', (theta * 180 / Math.PI).toFixed(2), 'deg');
});
