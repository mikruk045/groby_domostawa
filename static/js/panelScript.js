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


function messageOK(){
    let messageGreen = document.getElementById('messageGREEN');
    if(messageGreen !== null){
        let timer = document.getElementById('timer');
        let licznik_czas = 5;
        timer.innerHTML = `<i>(${licznik_czas})</i>`;
        setInterval(()=>{
            licznik_czas -= 1;
            timer.innerHTML = `<i>(${licznik_czas})</i>`;
        }, 1000)
        setTimeout(()=>{
            messageGreen.remove();
        }, 5000);
    }
}

messageOK();

