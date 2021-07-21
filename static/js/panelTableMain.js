"use strict"

let tabela = document.getElementById('table');
let rows = document.getElementsByClassName('records');

let rowExpanded = false;
let elemSelected;
let elemDOM;
for(let i=0; i< rows.length; i++){
    if(i !== -1){
        
        rows[i].addEventListener('click',()=>{
            if(elemSelected === rows[i].id){
                if(nextTr !== undefined){
                    nextTr.remove();
                }
                elemSelected = undefined;
            }else{
                createExpand(rows[i]);
                elemSelected = rows[i].id;
                elemDOM = rows[i];
            }
            
        })
        rows[i].addEventListener('mouseover', ()=>{
            rows[i].style.backgroundColor = '#f0f0f0';
            rows[i].lastElementChild.children[0].style.opacity = 'initial';
        });
        rows[i].addEventListener('mouseout', ()=>{
            rows[i].removeAttribute('style');
            rows[i].lastElementChild.children[0].removeAttribute('style');
        })
    }

}