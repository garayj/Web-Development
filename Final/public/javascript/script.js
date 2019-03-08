let add = document.getElementById("add");
let table = document.getElementById("table");
window.addEventListener('load', function(){
	if(table){
		let req = new XMLHttpRequest();
		req.open("GET","/select", true);
		req.onreadystatechange = function(){
			if(req.status === 200){
				if(req.readyState === 4){
					let response = JSON.parse(req.responseText);
					for(let n = 0; n < response['results'].length; n++){
						let thing = makeRow(response['results'][n]);
						document.getElementById("tableBody").appendChild(thing);
					}
				}
			}
		}
		req.send(null);
		}
	else{
		alert("hello");
	}
})


//Make the table the first time.

// add.addEventListener("click", function(event){
// 	req.open("POST", "/", true);
// 	req.setRequestHeader("Content-Type", "application/json");
//     req.addEventListener('load',function(){
//       alert('gogo');
//       if(req.status >= 200 && req.status < 400){
//         var response = JSON.parse(req.responseText);
//         console.log(response);
//       } else {
//         console.log("Error in network request: " + req.statusText);
//       }});
//     req.send(JSON.stringify(data));
//     event.preventDefault();
// });



function makeRow(element){
		let row = document.createElement("tr");

		let nameCell = document.createElement("td");
		let weightCell = document.createElement("td");
		let repCell = document.createElement("td");
		let dateCell = document.createElement("td");
		let unitCell = document.createElement("td");
		let buttons = document.createElement("td");
		let form = document.createElement("form");
		form.method = "post";
		form.action = "/";
		let id = document.createElement("input");
		id.type = "hidden";
		id.name = 'id';
		id.value = element.id;
		let edit = document.createElement("input");
		edit.type = "submit";
		edit.name = "Edit";
		edit.value = "Edit";
		let del = document.createElement("input");
		del.type = "submit";
		del.name = "Remove";
		del.value = "Remove";


		nameCell.textContent = element.name;
		weightCell.textContent = element.weight;
		repCell.textContent = element.reps;
		dateCell.textContent = element.date;
		unitCell.textContent = element.lbs;
		if(element.lbs){
	    	unitCell.textContent = "lbs";
		}
		else{
	    	unitCell.textContent = "kg";
		}

		row.appendChild(nameCell);
		row.appendChild(weightCell);
		row.appendChild(repCell);
		row.appendChild(dateCell);
		row.appendChild(unitCell);
		row.appendChild(buttons);
		buttons.appendChild(form);
		form.appendChild(id);
		form.appendChild(edit);
		form.appendChild(del);

		removeListener(edit);

		removeListener(del);
		return row;



}

function removeListener(removeButton){
	let context = {};
	context.id = removeButton.parentNode.children[0].value;
	context.action = removeButton.value;
	removeButton.addEventListener('click',function(event){
		let req = new XMLHttpRequest();
		req.open("POST", '/',true);
		req.setRequestHeader('Content-Type',  'application/json');
		req.addEventListener('load', function(){
	      if(req.status >= 200 && req.status < 400){
	      	console.log(context.action);
	      	if(context.action === "Remove"){
		      	removeButton.parentNode.parentNode.parentNode.remove();
	      	}
	      	if(context.action === "Edit"){
	      		console.log('hello');
	      	}
		   }
		});
		req.send(JSON.stringify(context));
	    event.preventDefault();
	    event.stopPropagation();

	});
}

add.addEventListener('click', function(event){
	let req = new XMLHttpRequest();
	let exName = document.getElementById("exerciseName").value;
	let exWeight = document.getElementById("exerciseWeight").value;
	let exReps = document.getElementById("exerciseReps").value;
	let exDate = document.getElementById("exerciseDate").value;
	let unit = document.getElementById("unit").value;



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
	document.getElementById('addItem').reset();

	if(context.name === "" || context.reps === "" || context.date === "" || context.weight === ""){
		alert("Enter a thing son");
		event.stopPropagation();
		event.preventDefault();
	}
	else{
		req.open("POST","/", true);
		req.setRequestHeader("Content-Type", "application/json");
	    req.addEventListener('load',function(){
	      if(req.status >= 200 && req.status < 400){
	        let response = JSON.parse(req.responseText);
	        let newRow = makeRow(response[response.length - 1]);
	        tableBody.appendChild(newRow);
	      } else {
	        console.log("Error in network request: " + req.statusText);
	      }});
	    req.send(JSON.stringify(context));
	    event.preventDefault();
	    event.stopPropagation();
	}
})
