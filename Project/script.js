
//Let the user open the map in a printable view.
let downloadButton = document.getElementById("download");
// If there is an element on the page to download, open the Salvisor Map.
if(downloadButton){
  downloadButton.addEventListener("click", function(){
    window.open('img/Salvisor_Map.pdf');
  });
}


//Used W3 schools to help me create modals for the wares.
var modal = document.getElementById('Modal');
let imgs = document.querySelectorAll(".card img");
var modalImg = document.getElementById("content");
var captionText = document.getElementById("caption");

// For each element within all of the images, add an event listener that fills in the modal.
imgs.forEach( function(element) {
  element.addEventListener("click", function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  })
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

//If the span is there, add the event listener to have the modal go away.
if(span[0]){
  span = span[0];
// When the user clicks on <span> (x), close the modal
  span.addEventListener("click",  function() {
    modal.style.display = "none";
  });
}


//This was in the Bootstrap documentation, I did not write this.
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        alert("Thanks For Subscribing!");
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
