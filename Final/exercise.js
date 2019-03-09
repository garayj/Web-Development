let express = require('express');
let mysql = require('./dbcon.js')

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      res.render('home',context);
    })
  });
});

app.get('/select', function(req, res) {
    let context = {};

    mysql.pool.query('SELECT id, name, reps, weight, DATE_FORMAT(date, "%m-%d-%Y") as date, lbs FROM workouts', function(err,rows,fields) {

        if (err) {
            next(err);
            return;
        }
        context.results = rows;
        res.send(context);
    });
});

app.get('/', function(req,res,next){
  res.render('home');
});

app.get('/edit', function(req,res,next){
  console.log("get edit");
  context = {};
  context.id = req.query.id;
  context.name = req.query.name;
  context.weight = req.query.weight;
  context.reps = req.query.reps;
  context.date = req.query.date;
  context.unit = req.query.unit;
  console.log(context);

  res.render('edit',context);
});


app.post('/',function(req,res){
  let context = {};
  console.log(req.body);
  //Remove action
  if(req.body.action == "Remove"){
    console.log("remove is running");
    mysql.pool.query('DELETE FROM workouts WHERE id=?',[req.body.id], function(err,rows,fields){
      if(err){
        next(err);
        return;
      }
      context =rows;
      res.send(context);
      return;
    });

  }
  if(req.body.action == "Edit"){
    console.log("edit is running");
    mysql.pool.query('SELECT id, name, reps, weight, DATE_FORMAT(date, "%m-%d-%Y") as date, lbs FROM workouts', function(err,rows,fields){
      if (err) {
          next(err);
          return;
      }
      let context = rows;
      return res.redirect('/edit');
    });
  }
  //Add Item action
  if(req.body['weight']){
    console.log('herehere');
    let whatever = [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit];
    mysql.pool.query('INSERT INTO workouts(name, reps, weight, date, lbs) VALUES (?,?,?,?,?);', whatever,function(err, rows) {
        if (err) {
            next(err);
            return;
        }
        mysql.pool.query('SELECT id, name, reps, weight, DATE_FORMAT(date, "%m-%d-%Y") as date, lbs FROM workouts', function(err,rows,fields){
          if (err) {
              next(err);
              return;
          }
          let context = rows;
          res.send(context);
        });
   });
  }



});
app.post('/edit', function(req,res){
  context = {};
  context.id = req.body.id;
  context.name = req.body.name;
  context.weight = req.body.weight;
  context.reps = req.body.reps;
  context.date = req.body.date;
  context.unit = req.body.unit;
  res.render('edit',context);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
