let mysql = require('mysql');
let pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	user : 'root',
	password : '1qaz2wsxJG',
	database : 'exercise'
});

module.exports.pool = pool;
