"use strict";

let mobileMenuIcon = document.getElementsByClassName('mobileIcon')[0];
let sidepanel = document.getElementsByClassName('sidepanel')[0];


mobileMenuIcon.addEventListener('click', ()=>{
    if(sidepanel.style.maxHeight){
        // sidepanel.removeAttribute('style');
        sidepanel.style.maxHeight = null;
        sidepanel.style.padding = "0px 40px";
    }else{
        sidepanel.style.padding = "0px 40px";
        sidepanel.style.maxHeight = "80vh";
    }
})


window.addEventListener('resize',()=>{
    if(window.innerWidth > 830){
        sidepanel.removeAttribute('style');
        
    }
})