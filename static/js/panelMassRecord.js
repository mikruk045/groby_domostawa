"use strict";
function addMassValidate(state){
    function inputChanges(){
        for(let i=0; i<regInputs.length; i++){
            if(regInputs[i].classList.contains('profileInputVALID') === false){
                registerStatusAll[i] = false;
            }else{
                registerStatusAll[i] = true;
            }
        };
        let ev = registerStatusAll.every((item)=>{
            return item === true
        });
        if(ev){
            buttonRegister.disabled = false;
        }else{
            buttonRegister.disabled = true;
        }
    }
    let buttonRegister = document.getElementsByClassName('inputSubmit')[0]

    let regInputs = document.getElementsByClassName('requiredInput');
    let registerStatus = true;
    let registerStatusAll = [false, false, false, false];
    function checkRegisterInputs(){
        for(let input of regInputs){
            // console.log(input);
            if(input.tagName === 'INPUT'){
                input.addEventListener('input', ()=>{
                    inputChanges();
                });
            }else{
                input.addEventListener('change', ()=>{
                    inputChanges();
                });
            }
        }
    }


    let data = document.getElementById('data');
    let czas = document.getElementById('czas');
    let zamawiajacy = document.getElementById('zamawiajacy');
    let odprawia = document.getElementById('odprawia');
    // let ofiara = document.getElementById('ofiara');


    data.addEventListener('input', ()=>{
        inputValidation(data, validatePlace); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(data, validatePlace)){
                document.getElementById('dataLI').classList.remove('INVALIDlist');
                document.getElementById('dataLI').classList.add('VALIDlist');
            }else{
                document.getElementById('dataLI').classList.add('INVALIDlist');
                document.getElementById('dataLI').classList.remove('VALIDlist');
            }
        }
    });

    czas.addEventListener('input', ()=>{
        inputValidation(czas, validatePlace); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(czas, validatePlace)){
                document.getElementById('czasLI').classList.remove('INVALIDlist');
                document.getElementById('czasLI').classList.add('VALIDlist');
            }else{
                document.getElementById('czasLI').classList.add('INVALIDlist');
                document.getElementById('czasLI').classList.remove('VALIDlist');
            }
        }
    });

    zamawiajacy.addEventListener('input', ()=>{
        inputValidation(zamawiajacy, validateTextfield); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(zamawiajacy, validateTextfield)){
                document.getElementById('zamawiajacyLI').classList.remove('INVALIDlist');
                document.getElementById('zamawiajacyLI').classList.add('VALIDlist');
            }else{
                document.getElementById('zamawiajacyLI').classList.add('INVALIDlist');
                document.getElementById('zamawiajacyLI').classList.remove('VALIDlist');
            }
        }
    });

    odprawia.addEventListener('input', ()=>{
        inputValidation(odprawia, validateTextfield); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(odprawia, validateTextfield)){
                document.getElementById('odprawiaLI').classList.remove('INVALIDlist');
                document.getElementById('odprawiaLI').classList.add('VALIDlist');
            }else{
                document.getElementById('odprawiaLI').classList.add('INVALIDlist');
                document.getElementById('odprawiaLI').classList.remove('VALIDlist');
            }
        }
    });




}

addMassValidate('other');