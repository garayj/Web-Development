let mysql = require('mysql');
let pool = mysql.createPool({
	connectionLimit : 10,
	host : 'classmysql.engr.oregonstate.edu',
	user : 'cs290_garayj',
	password : '5913',
	database : 'cs290_garayj'
});

module.exports.pool = pool;
