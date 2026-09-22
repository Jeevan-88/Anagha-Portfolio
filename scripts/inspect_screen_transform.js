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

  console.log('ScreenMesh local pos:', screenMesh.position);
  console.log('ScreenMesh local rot:', screenMesh.rotation);
  console.log('ScreenMesh local scale:', screenMesh.scale);
  console.log('Parent:', screenMesh.parent.name);
});
