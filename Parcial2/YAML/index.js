const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const archivo = fs.readFileSync(path.join(__dirname,"/objeto.yml"), 'utf8');
const estYml = YAML.parse(archivo);

console.log(typeof estYml)
console.table(estYml);