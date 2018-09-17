const _eval = require('eval');
const fs = require('fs');
const path = require('path');

let unidaysTrackingScript = fs.readFileSync(path.join(__dirname, '../src/unidays.js'), 'utf8');
unidaysTrackingScript += "module.exports.UnidaysTracking = module.exports = UnidaysTracking;";
global.unidaysTracking = _eval(unidaysTrackingScript);