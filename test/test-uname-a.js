var mod_uname = require('../build/Release/binding.node');
var mod_cp = require('child_process');
var ASSERT = require('assert');

var uts = mod_uname.uname();
var fields = {
	sysname: '-s',
	nodename: '-n',
	release: '-r',
	version: '-v',
	machine: '-m'
};

var field, nfields;

for (field in uts)
	ASSERT.ok(field in fields);

nfields = 0;
for (field in fields) {
	nfields++;
	check(field);
}

function check(checkfield)
{
	var exec = 'uname ' + fields[checkfield];

	mod_cp.exec(exec, function (err, stdout, stderr) {
		var value;

		console.log('checking field "%s" with %s', checkfield, exec);
		ASSERT.ok(err === null, 'invocation failed');

		/* Chop trailing newline. */
		value = stdout.substring(0, stdout.length - 1);
		console.log('expected output: "%s"', value);
		console.log('actual output: "%s"', uts[checkfield]);
		ASSERT.ok(value === uts[checkfield], 'value mismatch');
	});
}
