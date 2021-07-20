"use strict";

let buttonRegister = document.getElementsByClassName('inputSubmit')[0]

let regInputs = document.getElementsByClassName('requiredInput');
let registerStatus = true;
let registerStatusAll = [false, false, false, false];
function checkRegisterInputs(){
    for(let input of regInputs){
        input.addEventListener('input', ()=>{
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
        })
    }
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(re) && email.length < 150){
        return true;
    }else{
        return false;
    }
}

function validateTextfield(textfield) {
    // const re = /^[a-zA-Z0-9źŹżŻąĄęĘóÓłŁćĆśŚ_-/:"'()%^&*#@!?]+$/;
    if(textfield.length < 500){
        return true;
    }else{
        return false;
    }
}

function validateName(name) {
    const re = /^[a-zA-ZźŹżŻąĄęĘóÓłŁćĆśŚ-]+$/;
    if(name.match(re) && name.length < 150){
        return true;
    }else{
        return false;
    }
}

function validatePlace(place) {
    // const re = /^[a-zA-ZźŹżŻąĄęĘóÓłŁćĆśŚ-]+$/;
    if(place.value !== ''){
        return true;
    }else{
        return false;
    }
}

function validateDate(date) {
    let year = new Date().getFullYear();
    // (Number(date.split('-')[0]) < year - 100 || Number(date.split('-')[0]) >= year-10)
    if(Number(date.split('-')[0]) < 1801 || Number(date.split('-')[0]) > year){
        return false
    }else{
        return true;
    }
}

function validatePassword(password) {
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    if(password.match(lowerCaseLetters) && password.match(upperCaseLetters) && password.match(numbers) && password.length >=6 && password.length < 150){
        return true;
    }else{
        return false;
    }
}


function inputValidation(elem, fn){
    if(fn(elem.value)){
        if(elem.value === ''){
            if(elem.classList.contains('profileInputVALID')){
                elem.classList.remove('profileInputVALID');
            };
            if(elem.classList.contains('profileInputINVALID')){
                elem.classList.remove('profileInputINVALID');
            };
            elem.nextElementSibling.style.display = 'none';
            elem.removeAttribute('style');
        }else{
            if(elem.classList.contains('profileInputINVALID')){
                elem.classList.remove('profileInputINVALID');
            }
            elem.nextElementSibling.style.display = 'none';
            elem.classList.add('profileInputVALID');
            elem.style.borderColor = 'green';
            return true;
        }

    }else{
        if(elem.value === ''){
            if(elem.classList.contains('profileInputVALID')){
                elem.classList.remove('profileInputVALID');
            };
            if(elem.classList.contains('profileInputINVALID')){
                elem.classList.remove('profileInputINVALID');
            };
            elem.nextElementSibling.style.display = 'none';
            elem.removeAttribute('style');

            
        }else{
            if(elem.classList.contains('profileInputVALID')){
                elem.classList.remove('profileInputVALID');
            };
            elem.nextElementSibling.style.display = 'block';
            elem.style.borderColor = 'red';
            elem.classList.add('profileInputINVALID');
            return false;
        }

    }
}

let imie = document.getElementById('imie');
let nazwisko = document.getElementById('nazwisko');
let dataurodzenia = document.getElementById('data_urodzenia');
let datasmierci = document.getElementById('data_zgonu');
let przyczynazgonu = document.getElementById('przyczyna');
let infodod = document.getElementById('info_dodat');
let miejscowosc = document.getElementById('miejscowosc');
let kwatera = document.getElementById('kwatera');
let nrdomu = document.getElementById('nr_adresu');

imie.addEventListener('input', ()=>{
    inputValidation(imie, validateName); 
    checkRegisterInputs();
    if(inputValidation(imie, validateName)){
        document.getElementById('imieLI').classList.remove('INVALIDlist');
        document.getElementById('imieLI').classList.add('VALIDlist');
    }else{
        document.getElementById('imieLI').classList.add('INVALIDlist');
        document.getElementById('imieLI').classList.remove('VALIDlist');
    }
});

nazwisko.addEventListener('input', ()=>{
    inputValidation(nazwisko, validateName); 
    checkRegisterInputs();
    if(inputValidation(nazwisko, validateName)){
        document.getElementById('nazwiskoLI').classList.remove('INVALIDlist');
        document.getElementById('nazwiskoLI').classList.add('VALIDlist');
    }else{
        document.getElementById('nazwiskoLI').classList.add('INVALIDlist');
        document.getElementById('nazwiskoLI').classList.remove('VALIDlist');
    }
});

miejscowosc.addEventListener('change', ()=>{
    inputValidation(miejscowosc, validatePlace)
    if(inputValidation(miejscowosc, validatePlace)){
        document.getElementById('mscLI').classList.remove('INVALIDlist');
        document.getElementById('mscLI').classList.add('VALIDlist');
    }else{
        document.getElementById('mscLI').classList.add('INVALIDlist');
        document.getElementById('mscLI').classList.remove('VALIDlist');
    }
})
kwatera.addEventListener('input', ()=>{
    inputValidation(kwatera, validateTextfield)
    if(inputValidation(kwatera, validateTextfield)){
        document.getElementById('kwaLI').classList.remove('INVALIDlist');
        document.getElementById('kwaLI').classList.add('VALIDlist');
    }else{
        document.getElementById('kwaLI').classList.add('INVALIDlist');
        document.getElementById('kwaLI').classList.remove('VALIDlist');
    }
})
// nickForm.addEventListener('input', ()=>{inputValidation(nickForm, validateNickname), checkRegisterInputs()});
// nameForm.addEventListener('input', ()=>{inputValidation(nameForm, validateName), checkRegisterInputs()});
// surnameForm.addEventListener('input', ()=>{inputValidation(surnameForm, validateName), checkRegisterInputs()});
przyczynazgonu.addEventListener('input', ()=>{inputValidation(przyczynazgonu, validateTextfield)});
infodod.addEventListener('input', ()=>{inputValidation(infodod, validateTextfield)});
dataurodzenia.addEventListener('input', ()=>{inputValidation(dataurodzenia, validateDate)});
datasmierci.addEventListener('input', ()=>{inputValidation(datasmierci, validateDate)});
// passwordForm.addEventListener('input', ()=>{inputValidation(passwordForm, validatePassword), checkRegisterInputs()});


