let add = document.getElementById("add");
if(add){
	addListener(add);
}

let table = document.getElementById("table");
let change = document.getElementById('changeMe');
if(change){
	changeListener(change);
}
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
})

function changeListener(btn){
	btn.addEventListener('click', function(event){
		console.log("change was pressed");
		let req = new XMLHttpRequest();
		let exName = document.getElementById("changeName").value;
		let exWeight = document.getElementById("changeWeight").value;
		let exReps = document.getElementById("changeReps").value;
		let exDate = document.getElementById("changeDate").value;
		let unit = document.getElementById("lbs").value;
		let id = document.getElementById("id").value;


		let context = {name:null,
						weight:null,
						reps:null,
						date:null,
						unit:null,
						id: null};

		context.name = exName;
		context.weight = exWeight;
		context.reps = exReps;
		context.date = exDate;
		context.unit = unit;
		context.id = id;
		context.update = "Update";


		if(context.name === "" || context.reps === "" || context.date === "" || context.weight === ""){
			alert("You made a mistake!");
			document.getElementById('changeItem').reset();
		}
		else{
			req.open("POST","/", true);
			req.setRequestHeader("Content-Type", "application/json");
		    req.addEventListener('load',function(){
		      if(req.status >= 200 && req.status < 400){
		      	console.log("hello!");
		        let response = JSON.parse(req.responseText);
		      } else {
		        console.log("Error in network request: " + req.statusText);
		      }});
		    req.send(JSON.stringify(context));
		    event.stopPropagation();
		}
	})
}



function makeRow(element){
		let row = document.createElement("tr");

		let nameCell = document.createElement("td");
		let weightCell = document.createElement("td");
		let repCell = document.createElement("td");
		let dateCell = document.createElement("td");
		let unitCell = document.createElement("td");
		let buttons = document.createElement("td");
		let form = document.createElement("form");
		let id = document.createElement("input");
		let anchor = document.createElement('a');
		anchor.setAttribute('href', 'edit?id=' + element.id +
									'&name=' + element.name + 
									'&weight=' + element.weight + 
									'&reps=' + element.reps + 
									'&date=' + element.date + 
									'&unit=' + element.lbs);
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
		anchor.appendChild(edit);
		buttons.appendChild(id);
		buttons.appendChild(anchor);
		buttons.appendChild(del);


		removeListener(del);
		return row;



}

function removeListener(removeButton){
	let context = {};
	context.id = removeButton.parentNode.children[0].value;
	context.action = removeButton.value;
	removeButton.addEventListener('click',function(event){
		let req = new XMLHttpRequest();
		if(context.action === "Remove"){
			req.open("POST", '/',true);
			req.setRequestHeader('Content-Type',  'application/json');
			req.addEventListener('load', function(){
		      if(req.status >= 200 && req.status < 400){
		        let response = JSON.parse(req.responseText);
		      	removeButton.parentNode.parentNode.remove();
			   }
			});
			req.send(JSON.stringify(context));
		    event.preventDefault();
		    event.stopPropagation();
		}
	});
}


function addListener(btn){
	btn.addEventListener('click', function(event){
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
}
