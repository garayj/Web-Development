var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


app.post('/', function(req,res){
//Make an array for the parameters that are sent along with GET request.
  var qParams = [];
//Push each parameter into the array as an object.
  for (let n in req.query){
  	qParams.push({'name':n, 'value':req.query[n]});
  }
//Push the values that were receieved by the request body of the POST.
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  };
//Make an object and has a key dataList and pair it with parameter array.
  var context = {};
  context.dataList = qParams;
  res.render('post', context);
});

app.get('/',function(req,res){
	let params = [];
	for(let n in req.query){
		params.push({'key':n, 'value':req.query[n]});
	}
	let context = {};
	context.dataList = params;

  res.render('get', context); //We can omit the .handlebars extension as we do below
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
