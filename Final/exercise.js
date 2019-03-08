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
    mysql.pool.query('SELECT * FROM workouts', function(err,rows,fields) {
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

app.post("/edit", function(req,res){
  let context = {}
  if(req.body['Remove']){
    mysql.pool.query('DELETE FROM workouts WHERE id=?',[req.body.id], function(err,rows,fields){
      if(err){
        next(err);
        return;
      }
      res.render('home');
    });
  }
  if(req.body['Edit']){
  }


});

app.post('/',function(req,res){
  console.log(req.body);
  if(req.body['weight']){
    let whatever = [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit];
    mysql.pool.query('INSERT INTO workouts(name, reps, weight, date, lbs) VALUES (?,?,?,?,?);', whatever,function(err, rows) {
        if (err) {
            next(err);
            return;
        }
        mysql.pool.query('SELECT * FROM workouts', function(err,rows,fields){
          if (error) {
              next(err);
              return;
          }
          let context = rows;
          res.send(context);
        });
   });
  }
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
