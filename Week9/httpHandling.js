let express = require('express');
let request = require('request');

let app = express();
let handlebars = require('express-handlebars').create({defaultLayout:'main'});
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/', function(req,res,next){
	let context = {};
	request("http://web.engr.oasdfaregonstate.edu/~garayj/home.html", function(err,response,body){
		if(!err && response.statusCode < 400){
			context.data = body;
			res.render('http',context);
		}
		else{
			next(err);
		}
	});
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
