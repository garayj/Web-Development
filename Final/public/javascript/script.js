let remove = document.getElementById("rmBtn");
let add = document.getElementById("add");
let edit = document.getElementById("editBtn");

add.addEventListener("click", function(){
	let exName = document.getElementById("exerciseName").value;
	let exWeight = document.getElementById("exerciseWeight").value;
	let exReps = document.getElementById("exerciseReps").value;
	let exDate = document.getElementById("exerciseDate").value;
	let unit = document.getElementById("unit").value;

	let req = new XMLHttpRequest();


	let context = {name:null,
					weight:null,
					reps:null,
					date:null,
					unit:null};

	context.name = exName;
	context.weight = exWeight;
	context.reps = exReps;
	context.date = exDate;
	context.unit = unit;


	req.open("POST","http://localhost:3306", true);
	req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(context));
    event.preventDefault();

});

