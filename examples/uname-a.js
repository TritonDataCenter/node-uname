var mod_uname = require('../build/Release/binding.node');

var uts = mod_uname.uname();
var fields = [ 'sysname', 'nodename', 'release', 'version', 'machine' ];
var values = fields.map(function (fieldname) { return (uts[fieldname]); });

console.log(values.join(' '));
