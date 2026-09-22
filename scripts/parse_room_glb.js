const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '..', 'public', 'assets', 'models', 'pokemon_firered_-_players_room.glb');
const buf = fs.readFileSync(glbPath);

// GLB header: magic(4) + version(4) + length(4)
const magic = buf.readUInt32LE(0);
const version = buf.readUInt32LE(4);
const totalLen = buf.readUInt32LE(8);
console.log('Magic:', magic.toString(16), 'Version:', version, 'Total:', totalLen);

// Chunk 0: JSON
const c0Len = buf.readUInt32LE(12);
const c0Type = buf.readUInt32LE(16);
console.log('JSON chunk length:', c0Len);

const jsonStr = buf.toString('utf8', 20, 20 + c0Len);
const gltf = JSON.parse(jsonStr);

// Print nodes
console.log('\n=== NODES (' + gltf.nodes.length + ') ===');
gltf.nodes.forEach(function(n, i) {
  let info = i + ': ' + (n.name || '(unnamed)');
  if (n.mesh !== undefined) info += ' [MESH:' + n.mesh + ']';
  if (n.children) info += ' children:[' + n.children.join(',') + ']';
  if (n.translation) info += ' t:(' + n.translation.map(function(v){return v.toFixed(3)}).join(',') + ')';
  if (n.rotation) info += ' r:(' + n.rotation.map(function(v){return v.toFixed(3)}).join(',') + ')';
  if (n.scale) info += ' s:(' + n.scale.map(function(v){return v.toFixed(3)}).join(',') + ')';
  console.log(info);
});

// Print meshes
console.log('\n=== MESHES (' + gltf.meshes.length + ') ===');
gltf.meshes.forEach(function(m, i) {
  let prims = m.primitives.map(function(p) {
    return 'mat:' + p.material;
  }).join(', ');
  console.log(i + ': ' + (m.name || '(unnamed)') + ' | ' + prims);
});

// Print materials
if (gltf.materials) {
  console.log('\n=== MATERIALS (' + gltf.materials.length + ') ===');
  gltf.materials.forEach(function(m, i) {
    console.log(i + ': ' + (m.name || '(unnamed)'));
  });
}
