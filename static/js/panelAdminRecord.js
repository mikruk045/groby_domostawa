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
    let registerStatusAll = [false, false, false, false, false];
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


    let imie = document.getElementById('imie');
    let nazwisko = document.getElementById('nazwisko');
    let id_admina = document.getElementById('id_admina');
    let status = document.getElementById('status');
    let password = document.getElementById('password');


    imie.addEventListener('input', ()=>{
        inputValidation(imie, validateName); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(imie, validateName)){
                document.getElementById('imieLI').classList.remove('INVALIDlist');
                document.getElementById('imieLI').classList.add('VALIDlist');
            }else{
                document.getElementById('imieLI').classList.add('INVALIDlist');
                document.getElementById('imieLI').classList.remove('VALIDlist');
            }
        }
    });

    nazwisko.addEventListener('input', ()=>{
        inputValidation(nazwisko, validateName); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(nazwisko, validateName)){
                document.getElementById('nazwiskoLI').classList.remove('INVALIDlist');
                document.getElementById('nazwiskoLI').classList.add('VALIDlist');
            }else{
                document.getElementById('nazwiskoLI').classList.add('INVALIDlist');
                document.getElementById('nazwiskoLI').classList.remove('VALIDlist');
            }
        }
    });

    id_admina.addEventListener('input', ()=>{
        inputValidation(id_admina, validateNickname); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(id_admina, validateNickname)){
                document.getElementById('id_adminaLI').classList.remove('INVALIDlist');
                document.getElementById('id_adminaLI').classList.add('VALIDlist');
            }else{
                document.getElementById('id_adminaLI').classList.add('INVALIDlist');
                document.getElementById('id_adminaLI').classList.remove('VALIDlist');
            }
        }
    });

    status.addEventListener('input', ()=>{
        inputValidation(status, validateTextfield); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(status, validateTextfield)){
                document.getElementById('statusLI').classList.remove('INVALIDlist');
                document.getElementById('statusLI').classList.add('VALIDlist');
            }else{
                document.getElementById('statusLI').classList.add('INVALIDlist');
                document.getElementById('statusLI').classList.remove('VALIDlist');
            }
        }
    });

    password.addEventListener('input', ()=>{
        inputValidation(password, validatePassword); 
        checkRegisterInputs();
        if(state === 'record'){
            if(inputValidation(password, validatePassword)){
                document.getElementById('passwordLI').classList.remove('INVALIDlist');
                document.getElementById('passwordLI').classList.add('VALIDlist');
            }else{
                document.getElementById('passwordLI').classList.add('INVALIDlist');
                document.getElementById('passwordLI').classList.remove('VALIDlist');
            }
        }
    });




}

addMassValidate('other');