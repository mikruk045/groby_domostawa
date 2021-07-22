"use strict";

function requestPOST(url){
    let test = new XMLHttpRequest();
    test.open('get', url);
    test.send();
    return test;
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var acceptDelete = document.getElementById("deleteButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("noDeleteButton")[0];

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




