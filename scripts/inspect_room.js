const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');
const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '..', 'public', 'assets', 'models', 'pokemon_firered_-_players_room.glb');
const buffer = fs.readFileSync(glbPath);
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const meshes = [];
  function traverse(obj, depth) {
    const indent = '  '.repeat(depth);
    const type = obj.isMesh ? 'MESH' : obj.isGroup ? 'GROUP' : 'OBJ';
    let info = indent + '[' + type + '] ' + (obj.name || '(unnamed)');
    if (obj.isMesh) {
      const geom = obj.geometry;
      const mat = obj.material;
      const verts = geom.attributes.position ? geom.attributes.position.count : 0;
      const matName = Array.isArray(mat) ? mat.map(function(m){return m.name}).join(', ') : (mat ? mat.name : 'none');
      geom.computeBoundingBox();
      const bb = geom.boundingBox;
      info += ' | v:' + verts + ' | mat:' + matName;
      info += ' | bbox:[' + bb.min.x.toFixed(2) + ',' + bb.min.y.toFixed(2) + ',' + bb.min.z.toFixed(2) + ']->[' + bb.max.x.toFixed(2) + ',' + bb.max.y.toFixed(2) + ',' + bb.max.z.toFixed(2) + ']';
      const sz = bb.max.clone().sub(bb.min);
      info += ' | size:(' + sz.x.toFixed(2) + ',' + sz.y.toFixed(2) + ',' + sz.z.toFixed(2) + ')';
      meshes.push({name: obj.name, verts: verts, matName: matName, pos: obj.position, rot: obj.rotation, scale: obj.scale, bbox: bb, size: sz});
    }
    console.log(info);
    obj.children.forEach(function(c) { traverse(c, depth+1); });
  }
  traverse(gltf.scene, 0);
  console.log('\n=== ALL MESHES ===');
  meshes.forEach(function(m) {
    console.log(m.name + ' | ' + m.verts + 'v | mat:' + m.matName + ' | pos:(' + m.pos.x.toFixed(3) + ',' + m.pos.y.toFixed(3) + ',' + m.pos.z.toFixed(3) + ')');
  });
}, function(err) { console.error('Error:', err); });
