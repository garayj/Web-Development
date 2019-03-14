let express = require('express');
let app = express();
let mysql = require('./dbcon.js')

let handlebars = require('express-handlebars').create({defaultLayout:'main'});
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);
app.use(express.static('public'));

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date VARCHAR(255) NOT NULL,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      res.render('home',context);
    })
  });
});

app.get('/select', function(req, res) {
    let context = {};
    mysql.pool.query('SELECT id, name, reps, weight, date, lbs FROM workouts', function(err,rows,fields) {
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
  context = {};
  mysql.pool.query('SELECT id, name, reps, weight, date, lbs FROM workouts WHERE id=?' , [req.query.id],function(err,rows,fields){
    if(err){
      next(err);
      return;
    }
    let container = rows[0];

    context.name = container.name;
    context.weight = container.weight;
    context.reps = container.reps;
    context.date = container.date;
    context.lbs = container.lbs;
    context.id = container.id;

    res.render('edit',context);
  });
});


app.post('/',function(req,res){
  let context = {};
  //Remove action
  if(req.body.action == "Remove"){
    console.log("Remove is running");
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
  else if(req.body.update){
    console.log("Update is running");
    let newDate = req.body.date.split("-");
    newDate = newDate[1] + "-" + newDate[2] + "-" + newDate[0];

    let whatever = [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit, req.body.id];
    mysql.pool.query('UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?', whatever,function(err,rows,fields){
      if (err) {
          next(err);
          return;
      }
      return;
    });
  }
  //Add Item action
  else if(req.body['weight']){
    console.log('Adding Item');
    console.log(req.body);
    let date = req.body.date.split("-");
    date = date[1] + "-" + date[2] + "-" + date[0];

    let whatever = [req.body.name, req.body.reps, req.body.weight, date, req.body.unit];
    mysql.pool.query('INSERT INTO workouts(name, reps, weight, date, lbs) VALUES (?,?,?,?,?);', whatever,function(err, rows) {
        if (err) {
            next(err);
            return;
        }
        mysql.pool.query('SELECT id, name, reps, weight, date, lbs FROM workouts', function(err,rows,fields){
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
  console.log(context);
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
