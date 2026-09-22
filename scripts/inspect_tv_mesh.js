const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '..', 'public', 'assets', 'models', 'pokemon_firered_-_players_room.glb');
const buf = fs.readFileSync(glbPath);

const c0Len = buf.readUInt32LE(12);
const jsonStr = buf.toString('utf8', 20, 20 + c0Len);
const gltf = JSON.parse(jsonStr);

// Binary chunk offset
const binStart = 20 + c0Len + 8; // +8 for chunk header

// Get TV mesh (mesh index 6)
const tvMesh = gltf.meshes[6];
const prim = tvMesh.primitives[0];
console.log('TV mesh primitive attributes:', Object.keys(prim.attributes));
console.log('Indices accessor:', prim.indices);

// Helper to read accessor data
function readAccessor(accIdx) {
  const acc = gltf.accessors[accIdx];
  const bv = gltf.bufferViews[acc.bufferView];
  const offset = binStart + (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const compSize = {5120:1, 5121:1, 5122:2, 5123:2, 5125:4, 5126:4}[acc.componentType];
  const numComps = {SCALAR:1, VEC2:2, VEC3:3, VEC4:4}[acc.type];
  const count = acc.count;
  const values = [];
  
  for (let i = 0; i < count; i++) {
    const comps = [];
    for (let c = 0; c < numComps; c++) {
      const pos = offset + (i * numComps + c) * compSize;
      if (acc.componentType === 5126) comps.push(buf.readFloatLE(pos));
      else if (acc.componentType === 5123) comps.push(buf.readUInt16LE(pos));
      else if (acc.componentType === 5125) comps.push(buf.readUInt32LE(pos));
    }
    values.push(comps);
  }
  return { values, count, type: acc.type, min: acc.min, max: acc.max };
}

// Position data
const posData = readAccessor(prim.attributes.POSITION);
console.log('\nTV POSITION accessor:');
console.log('  count:', posData.count);
console.log('  min:', posData.min);
console.log('  max:', posData.max);

// Print all vertices
console.log('\n=== TV VERTICES ===');
posData.values.forEach(function(v, i) {
  console.log(i + ': (' + v[0].toFixed(4) + ', ' + v[1].toFixed(4) + ', ' + v[2].toFixed(4) + ')');
});

// Also check UV data if present
if (prim.attributes.TEXCOORD_0 !== undefined) {
  const uvData = readAccessor(prim.attributes.TEXCOORD_0);
  console.log('\n=== TV UVs ===');
  uvData.values.forEach(function(v, i) {
    console.log(i + ': (' + v[0].toFixed(4) + ', ' + v[1].toFixed(4) + ')');
  });
}

// Normals
if (prim.attributes.NORMAL !== undefined) {
  const normData = readAccessor(prim.attributes.NORMAL);
  console.log('\n=== TV NORMALS (first 10) ===');
  normData.values.slice(0, 10).forEach(function(v, i) {
    console.log(i + ': (' + v[0].toFixed(4) + ', ' + v[1].toFixed(4) + ', ' + v[2].toFixed(4) + ')');
  });
}

// Check TV node transform
const tvNode = gltf.nodes[19]; // TV group
const tvMeshNode = gltf.nodes[20]; // TV mesh
console.log('\n=== TV NODE TRANSFORM ===');
console.log('TV group (19):', JSON.stringify(tvNode));
console.log('TV mesh (20):', JSON.stringify(tvMeshNode));

// Also get parent TV_GRP transform
const tvGRP = gltf.nodes[16]; // TV_GRP
console.log('TV_GRP (16):', JSON.stringify(tvGRP));
