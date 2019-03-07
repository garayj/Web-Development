let mysql = require('mysql');
let pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	user : 'camp',
	password : 'asdf',
	database : 'exercise'
});

module.exports.pool = pool;