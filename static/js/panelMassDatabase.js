"use strict";

tableInteraction(true);

let deleteButtons = document.getElementsByClassName('delete');

for(let deleteButton of deleteButtons){
    deleteButton.addEventListener('click',(event)=>{
        console.log(deleteButton);
        event.stopPropagation();
        let imieNaz = document.getElementById('imieNaz');
        imieNaz.innerHTML = `z datą <b>${deleteButton.parentNode.parentElement.children[0].textContent}</b>`
        modal.style.display = "block";
        let rowID = deleteButton.parentNode.parentElement.id;
        acceptDelete.addEventListener('click',()=>{
            let deleteRow = requestPOST(`${window.location.origin}/add_mass/${rowID}`);
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