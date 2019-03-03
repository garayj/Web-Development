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

app.get('/', function(req,res,next){
  let context = {};
  if(!req.session.name){
    res.render('toDoList', context);
    return;
  }
  context.name = req.session.name;
  context.toDoCount = req.session.toDoCount || 0;
  context.toDo = req.session.toDo || [];

  res.render('addItem', context);
});

app.post('/',function(req,res){
  let context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }
  if(!req.session.name){
    res.render('toDoList', context);
    return;
  }
  if(req.body['Add Item']){
    req.session.toDo.push({"name":req.body.name,"id":req.session.curId});
    req.session.curId++;
  }
  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }

  context.name = req.session.name;
  context.toDo = req.session.toDo;
  context.toDoCount = req.session.toDo.length;
  res.render('addItem', context);
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
