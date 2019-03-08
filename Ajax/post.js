document.getElementById("submit").addEventListener("click", function(event){
	let data = {data: null};
	data.data = document.getElementById("data").value;
	let req = new XMLHttpRequest();
	req.open("POST", "http://httpbin.org/post", true);
	req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load',function(){
      alert('gogo');
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(data));
    event.preventDefault();

});
