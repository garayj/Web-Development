
let apiKey = "12f7178b130f62f7a85f6946ff689192";

// document.addEventListener("DOMContentLoaded", search);

// function search(){
	document.getElementById("submit").addEventListener("click", function(){
		let city = document.getElementById("city").value;
		let country = document.getElementById("country").value;
		let zip = document.getElementById("zip").value;

		let req = new XMLHttpRequest();


		let searchString = "http://api.openweathermap.org/data/2.5/weather?";

		if (zip === "") {
			searchString = searchString + "q=" + city;
		}
		else {
			searchString = searchString + "zip=" + zip;
		}
		searchString = searchString + "," + country + "&units=metric&APPID=" + apiKey;

		req.open("GET", searchString, true);
		req.onreadystatechange= function(){
			if(req.status === 200){
				if(req.readyState === 4){
					let response  = JSON.parse(req.responseText);
					document.getElementById("weatherHead").textContent = "Weather For " + response.name + ":";
					document.getElementById("temp").textContent = response.main.temp + " C";
					document.getElementById("description").textContent = response.weather[0].description;
					document.getElementById("windSpeed").textContent = response.wind.speed + " meters/sec";
					document.getElementById("pressure").textContent = response.main.pressure + " hPa";
					console.log(response);
				}
			}
			else{
				document.getElementById("weatherHead").textContent = "Could not find that city. Please try again.";
			}
		};
		req.send(null);

	});

// }



