"use strict";

// let col9 = document.getElementsByClassName('col9')
// for(let col of col9){
//     col.style.display = 'none';
// }

if(window.innerWidth < 1480){
    let col7 = document.getElementsByClassName('col7')
    for(let col of col7){
        col.style.display = 'none';
    }
}else{
    let col7 = document.getElementsByClassName('col7')
    for(let col of col7){
        col.style.display = 'table-cell';
    }
}
if(window.innerWidth < 1360){
    let col9 = document.getElementsByClassName('col9')
    for(let col of col9){
        col.style.display = 'none';
    }
}else{
    let col9 = document.getElementsByClassName('col9')
    for(let col of col9){
        col.style.display = 'table-cell';
    }
}
if(window.innerWidth < 1200){
    let col6 = document.getElementsByClassName('col6')
    for(let col of col6){
        col.style.display = 'none';
    }
}else{
    let col6 = document.getElementsByClassName('col6')
    for(let col of col6){
        col.style.display = 'table-cell';
    }
}
if(window.innerWidth < 1060){
    let col4 = document.getElementsByClassName('col4')
    for(let col of col4){
        col.style.display = 'none';
    }
}else{
    let col4 = document.getElementsByClassName('col4')
    for(let col of col4){
        col.style.display = 'table-cell';
    }
}
if(window.innerWidth < 935){
    let col2 = document.getElementsByClassName('col2')
    for(let col of col2){
        col.style.display = 'none';
    }
}else{
    let col2 = document.getElementsByClassName('col2')
    for(let col of col2){
        col.style.display = 'table-cell';
    }
}
if(window.innerWidth < 490){
    let col3 = document.getElementsByClassName('col3')
    for(let col of col3){
        col.style.display = 'none';
    }
}else{
    let col3 = document.getElementsByClassName('col3')
    for(let col of col3){
        col.style.display = 'table-cell';
    }
}


let tabela = document.getElementById('table');
let rows = document.getElementsByClassName('records');
let panelContent = document.getElementsByClassName('panelContent')[0];

let paginatorDiv = document.getElementById("paginatorDiv");

let paginatorButtons = paginatorDiv.getElementsByTagName('button');

window.addEventListener('load',()=>{
    document.getElementsByClassName('loading')[0].remove();
    // document.getElementsByClassName('loading')[0].style.display = 'none';
    document.getElementsByClassName('tablecontent')[0].style.display = 'block';
})

paginator({
    table: tabela,
    box: paginatorDiv,
    rows_per_page: 50,
  });

let nextTr;

function createExpand(record){
    if(nextTr !== undefined){
        nextTr.remove();
    }
    
    let expandContent = document.createElement('ul');
    for(let child of record.children){
        if(child.classList[1] !== 'buttonTd'){
            if(child.style.display === 'none'){
                let elem = document.createElement('li');
                
                if(child.innerHTML === 'None' || child.innerHTML === ''){
                    elem.innerHTML = `<b>${document.getElementsByClassName('columns')[0].getElementsByClassName(`${child.classList[0]}`)[0].textContent}</b>: <i>Brak</i>`;
                }else{
                    elem.innerHTML = `<b>${document.getElementsByClassName('columns')[0].getElementsByClassName(`${child.classList[0]}`)[0].textContent}</b>: ${child.innerHTML}`;
                }
                
                elem.style.textAlign = 'left';
                expandContent.appendChild(elem);
            }
        }

    }

    let editButton = document.createElement('button');
    editButton.textContent = 'Edytuj rekord';
    editButton.classList.add('inputSubmit');
    editButton.classList.add('editRecord');


    nextTr = document.createElement('tr');
    let nextTd = document.createElement('td');
    nextTd.colSpan = '100';
    if(expandContent.innerHTML !== ''){
        nextTd.appendChild(expandContent);
    }   

    let recordContainer = document.createElement('div');
    recordContainer.classList.add('recordContainer');
    recordContainer.innerHTML = `        <form action="" method="post" id="form">
    
    <div class="flexRows">
        <div class="flexContainer">
            <label class="requiredField" for="imie">Imię</label>
            <input class="inputText requiredInput" type="text" id="imie" name="imie" placeholder="Imię zmarłego" value="">
            <div class="messageInput"><span>Imię może zawierać tylko litery</span></div>
        </div>
        <div class="flexContainer">
            <label class="requiredField" for="nazwisko">Nazwisko</label>
            <input class="inputText requiredInput" type="text" id="nazwisko" name="nazwisko" placeholder="Nazwisko zmarłego" value="">
            <div class="messageInput"><span>Nazwisko może zawierać tylko litery</span></div>
        </div>
    </div>
    <div class="flexRows">
        <div class="flexContainer">
            <label for="data_urodzenia">Data urodzenia</label>
            <input class="inputText" type="date" id="data_urodzenia" name="data_urodzenia" value="">
            <div class="messageInput"><span>Data urodzenia musi być większa od 1800 i nie większa od roku obecnego</span></div>
        </div>
        <div class="flexContainer">
            <label for="data_zgonu">Data zgonu</label>
            <input class="inputText" type="date" id="data_zgonu" name="data_zgonu" value="">
            <div class="messageInput"><span>Data śmierci musi być większa od 1800 i nie większa od roku obecnego</span></div>
        </div>
    </div>
    <div class="flexRows">
        <div class="flexContainer">
            <label for="przyczyna">Przyczyna zgonu</label>
            <input class="inputText" type="text" id="przyczyna" name="przyczyna" placeholder="Przyczyna śmierci zmarłego" value="">
            <div class="messageInput"><span>Treść przekracza limit 500 znaków</span></div>
        </div>
    </div>

    <!-- <div class="group"> -->
        <div class="flexRows">
            <div class="flexContainer">
                <label class="requiredField" for="miejscowosc">Miejscowość</label>
                <select class="inputText requiredInput" id="miejscowosc" name="miejscowosc">
                    <option class="optionDefault" value="" disabled selected>Wybierz miejscowość</option>
                    <option value="Domostawa">Domostawa</option>
                    <option value="Katy">Katy</option>
                    <option value="Kutyły">Kutyły</option>
                    <option value="Madeje">Madeje</option>
                    <option value="Ruda">Ruda</option>
                    <option value="Szwedy">Szwedy</option>
                    <option value="Zdziary">Zdziary</option>
                    <option value="Inna">Inna</option>
                </select>
                <div class="messageInput"><span>Błędna miejscowość</span></div>
            </div>

            <div class="flexContainer">
                <label for="nr_adresu">Numer domu</label>
                <input class="inputText" type="text" id="nr_adresu" placeholder="Numer domu/mieszkania zmarłego" name="nr_adresu" value="">
                <div class="messageInput"><span>Treść przekracza limit 500 znaków</span></div>
            </div>
            <div class="flexContainer">
                <label for="kwatera" class="requiredField">Kwatera</label>
                <input class="inputText requiredInput" type="text" id="kwatera" name="kwatera" placeholder="Oznaczenie kwatery, na której leży zmarły" value="">
                <div class="messageInput"><span>Treść przekracza limit 500 znaków</span></div>
            </div>
        </div>
    <!-- </div> -->

    <div class="flexRows">
        <div class="flexContainer">
            <label for="info_dodat">Informacje dodatkowe</label>
            <input class="inputText" type="text" id="info_dodat" name="info_dodat" placeholder="Dane dodatkowe, które wychodzą poza treść formularza (np. o miejscowości w przypadku wybrania pozycji 'inna')" value="">
            <div class="messageInput"><span>Treść przekracza limit 500 znaków</span></div>
        </div>
    </div>

    <br></br>
    <button class="inputSubmit" disabled type="submit">Dodaj</button>

</form>`
    
    nextTd.appendChild(editButton);
    // nextTd.appendChild(recordContainer)
    nextTr.appendChild(nextTd);
    record.parentNode.insertBefore(nextTr, record.nextSibling);
    editButton.style.textAlign = 'left';
    editButton.addEventListener('click',()=>{
        function triggerSelect(elem) {
            var event = new Event('change', {
                'bubbles': true,
                'cancelable': true
            });
        
            elem.dispatchEvent(event);
        }
        function triggerInput(elem) {
            var event = new Event('input', {
                'bubbles': true,
                'cancelable': true
            });
        
            elem.dispatchEvent(event);
        }
        editButton.remove();
        nextTd.appendChild(recordContainer);
        addRecordValidate('database');
        // let inputsy = document.getElementsByTagName('input');
        let inputsy = document.querySelectorAll('input,select')
        console.log(inputsy);
        for(let inputs of inputsy){
            let tdsy = elemDOM.getElementsByTagName('td');
            for(let td of tdsy){
                console.log(td);
                if(td.classList.contains(inputs.id)){
                    if(inputs.id === 'nr_adresu'){
                        let tdlist = td.textContent.split(' ');
                        if(tdlist.length > 1){
                            inputs.value = tdlist[1];
                            triggerInput(inputs);
                        }

                    }else if(inputs.id === 'miejscowosc'){
                        let tdlist = td.textContent.split(' ');
                        inputs.value = tdlist[0];
                        triggerSelect(inputs);
                    }else if(inputs.id === 'data_urodzenia' || inputs.id === 'data_zgonu'){
                        let tdlist = td.textContent.split('.');
                        inputs.value = `${tdlist[2]}-${tdlist[1]}-${tdlist[0]}`;
                        triggerInput(inputs);
                    }else{
                        inputs.value = td.textContent;
                        triggerInput(inputs);
                    }

                }
            }
        }
        
        
    })
}
let rowExpanded = false;
let elemSelected;
let elemDOM;
for(let i=0; i< rows.length; i++){
    if(i !== -1){
        
        rows[i].addEventListener('click',()=>{
            // alert('tak')
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


            // if(rowExpanded){
            //     if(nextTr !== undefined){
            //         nextTr.remove();
            //     };
            // }else{
            //     createExpand(rows[i]);
            // }
            
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


for(let button of paginatorButtons){
    button.addEventListener('click',()=>{
        panelContent.scrollTo(0,0);
    })
}

window.addEventListener('resize',()=>{
    if(window.innerWidth < 1480){
        let col7 = document.getElementsByClassName('col7')
        for(let col of col7){
            col.style.display = 'none';
        }
    }else{
        let col7 = document.getElementsByClassName('col7')
        for(let col of col7){
            col.style.display = 'table-cell';
        }
    }
    if(window.innerWidth < 1360){
        let col9 = document.getElementsByClassName('col9')
        for(let col of col9){
            col.style.display = 'none';
        }
    }else{
        let col9 = document.getElementsByClassName('col9')
        for(let col of col9){
            col.style.display = 'table-cell';
        }
    }
    if(window.innerWidth < 1200){
        // nextTr.remove();
        let col6 = document.getElementsByClassName('col6')
        for(let col of col6){
            col.style.display = 'none';
        }
    }else{
        // nextTr.remove();
        let col6 = document.getElementsByClassName('col6')
        for(let col of col6){
            col.style.display = 'table-cell';
        }
    }
    if(window.innerWidth < 1060){
        // nextTr.remove();
        let col4 = document.getElementsByClassName('col4')
        for(let col of col4){
            col.style.display = 'none';
        }
    }else{
        // nextTr.remove();
        let col4 = document.getElementsByClassName('col4')
        for(let col of col4){
            col.style.display = 'table-cell';
        }
    }
    if(window.innerWidth < 935){
        // nextTr.remove();
        let col2 = document.getElementsByClassName('col2')
        for(let col of col2){
            col.style.display = 'none';
        }
    }else{
        // nextTr.remove();
        let col2 = document.getElementsByClassName('col2')
        for(let col of col2){
            col.style.display = 'table-cell';
        }
    }
    if(window.innerWidth < 490){
        // nextTr.remove();
        let col3 = document.getElementsByClassName('col3')
        for(let col of col3){
            col.style.display = 'none';
        }
    }else{
        // nextTr.remove();
        let col3 = document.getElementsByClassName('col3')
        for(let col of col3){
            col.style.display = 'table-cell';
        }
    }
})