let express = require('express');
let session = require('express-session');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.use(session({secret:'SuperSecretPassword'}));

app.get('/count', function(req,res){
	let context = {};
	context.count = req.session.count || 0;
	req.session.count = context.count + 1;
	res.render('counter', context);
});

app.post('/count',function(req,res){
  var context = {};
  if(req.body.command === "resetCount"){
    req.session.count = 0;
  } else {
    context.err = true;
  }
	context.count = 0;
  req.session.count = context.count + 1;
  res.render('counter', context);
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
