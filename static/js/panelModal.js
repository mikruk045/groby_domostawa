"use strict";

function requestPOST(url){
    let test = new XMLHttpRequest();
    test.open('post', url);
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

let deleteButtons = document.getElementsByClassName('delete');

for(let deleteButton of deleteButtons){
    deleteButton.addEventListener('click',(event)=>{
        console.log(deleteButton);
        event.stopPropagation();
        let imieNaz = document.getElementById('imieNaz');
        imieNaz.innerHTML = `<b>${deleteButton.parentNode.parentElement.children[0].textContent} ${deleteButton.parentNode.parentElement.children[1].textContent}</b>`
        modal.style.display = "block";
        let rowID = deleteButton.parentNode.parentElement.id;
        acceptDelete.addEventListener('click',()=>{
            let deleteRow = requestPOST(`${window.location.origin}/database/${rowID}`);
            deleteRow.addEventListener('load',()=>{
                console.log(deleteRow.status);
                if(deleteRow.status === 200){
                    window.location.reload(true);
                }else{
                    // window.location.reload(true);
                    alert('błąd');
                }
            })
        })

    })
}


