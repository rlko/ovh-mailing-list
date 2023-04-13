const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('ovh.yml', 'utf8'));

module.exports = config;