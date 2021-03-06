"use strict";

// let col9 = document.getElementsByClassName('col9')
// for(let col of col9){
//     col.style.display = 'none';
// }



tableInteraction(true);


// let tabela = document.getElementById('table');
// let rows = document.getElementsByClassName('records');
let panelContent = document.getElementsByClassName('panelContent')[0];

let paginatorDiv = document.getElementById("paginatorDiv");

let paginatorButtons = paginatorDiv.getElementsByTagName('button');

window.addEventListener('load',()=>{
    document.getElementsByClassName('loading')[0].remove();
    document.getElementsByClassName('tablecontent')[0].style.display = 'block';
    responsiveTable('database');
})

paginator({
    table: tabela,
    box: paginatorDiv,
    rows_per_page: 50,
    disable:false,
  });

let nextTr;

function createExpand(record, id_row){
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

    // editButton.style.textAlign = 'center';


    nextTr = document.createElement('tr');
    let nextTd = document.createElement('td');
    nextTd.colSpan = '100';
    nextTd.classList.add('tdEdit');
    // nextTd.style.padding = '2rem 4rem'
    if(expandContent.innerHTML !== ''){
        nextTd.appendChild(expandContent);
    }   

    let recordContainer = document.createElement('div');
    recordContainer.classList.add('recordEdit');
    recordContainer.innerHTML = `        <form action="/database_edit/${id_row}" method="post" id="form">
    
    <div class="flexRows flexEditDatabase">
        <div class="flexContainer">
            <label class="requiredField" for="imie">Imi??</label>
            <input class="inputText requiredInput" type="text" id="imie" name="imie" placeholder="Imi?? zmar??ego" value="">
            <div class="messageInput"><span>Imi?? mo??e zawiera?? tylko litery</span></div>
        </div>
        <div class="flexContainer">
            <label class="requiredField" for="nazwisko">Nazwisko</label>
            <input class="inputText requiredInput" type="text" id="nazwisko" name="nazwisko" placeholder="Nazwisko zmar??ego" value="">
            <div class="messageInput"><span>Nazwisko mo??e zawiera?? tylko litery</span></div>
        </div>
    </div>
    <div class="flexRows flexEditDatabase">
        <div class="flexContainer">
            <label for="data_urodzenia">Data urodzenia</label>
            <input class="inputText" type="date" id="data_urodzenia" name="data_urodzenia" value="">
            <div class="messageInput"><span>Data urodzenia musi by?? wi??ksza od 1800 i nie wi??ksza od roku obecnego</span></div>
        </div>
        <div class="flexContainer">
            <label for="data_zgonu">Data zgonu</label>
            <input class="inputText" type="date" id="data_zgonu" name="data_zgonu" value="">
            <div class="messageInput"><span>Data ??mierci musi by?? wi??ksza od 1800 i nie wi??ksza od roku obecnego</span></div>
        </div>
    </div>
    <div class="flexRows flexEditDatabase">
        <div class="flexContainer">
            <label for="przyczyna">Przyczyna zgonu</label>
            <input class="inputText" type="text" id="przyczyna" name="przyczyna" placeholder="Przyczyna ??mierci zmar??ego" value="">
            <div class="messageInput"><span>Tre???? przekracza limit 500 znak??w</span></div>
        </div>
    </div>

    <!-- <div class="group"> -->
        <div class="flexRows flexEditDatabase">
            <div class="flexContainer">
                <label class="requiredField" for="miejscowosc">Miejscowo????</label>
                <select class="inputText requiredInput" id="miejscowosc" name="miejscowosc">
                    <option class="optionDefault" value="" disabled selected>Wybierz miejscowo????</option>
                    <option value="Domostawa">Domostawa</option>
                    <option value="Katy">Katy</option>
                    <option value="Kuty??y">Kuty??y</option>
                    <option value="Madeje">Madeje</option>
                    <option value="Ruda">Ruda</option>
                    <option value="Szwedy">Szwedy</option>
                    <option value="Zdziary">Zdziary</option>
                    <option value="Inna">Inna</option>
                </select>
                <div class="messageInput"><span>B????dna miejscowo????</span></div>
            </div>

            <div class="flexContainer">
                <label for="nr_adresu">Numer domu</label>
                <input class="inputText" type="text" id="nr_adresu" placeholder="Numer domu/mieszkania zmar??ego" name="nr_adresu" value="">
                <div class="messageInput"><span>Tre???? przekracza limit 500 znak??w</span></div>
            </div>
            <div class="flexContainer">
                <label for="kwatera" class="requiredField">Kwatera</label>
                <input class="inputText requiredInput" type="text" id="kwatera" name="kwatera" placeholder="Oznaczenie kwatery, na kt??rej le??y zmar??y" value="">
                <div class="messageInput"><span>Tre???? przekracza limit 500 znak??w</span></div>
            </div>
        </div>
    <!-- </div> -->

    <div class="flexRows flexEditDatabase">
        <div class="flexContainer">
            <label for="info_dodat">Informacje dodatkowe</label>
            <input class="inputText" type="text" id="info_dodat" name="info_dodat" placeholder="Dane dodatkowe, kt??re wychodz?? poza tre???? formularza (np. o miejscowo??ci w przypadku wybrania pozycji 'inna')" value="">
            <div class="messageInput"><span>Tre???? przekracza limit 500 znak??w</span></div>
        </div>
    </div>

    <br></br>
    <button class="inputSubmit" disabled type="submit">Edytuj</button>

</form>`
    
    nextTd.appendChild(editButton);
    nextTr.appendChild(nextTd);
    record.parentNode.insertBefore(nextTr, record.nextSibling);
    editButton.style.textAlign = 'center';
    recordContainer.style.textAlign = 'left'
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



for(let button of paginatorButtons){
    button.addEventListener('click',()=>{
        panelContent.scrollTo(0,0);
    })
}

window.addEventListener('resize',()=>{
    responsiveTable('database');
});

// window.addEventListener('resize',()=>{
//     if(window.innerWidth < 1480){
//         let col7 = document.getElementsByClassName('col7')
//         for(let col of col7){
//             col.style.display = 'none';
//         }
//     }else{
//         let col7 = document.getElementsByClassName('col7')
//         for(let col of col7){
//             col.style.display = 'table-cell';
//         }
//     }
//     if(window.innerWidth < 1360){
//         let col9 = document.getElementsByClassName('col9')
//         for(let col of col9){
//             col.style.display = 'none';
//         }
//     }else{
//         let col9 = document.getElementsByClassName('col9')
//         for(let col of col9){
//             col.style.display = 'table-cell';
//         }
//     }
//     if(window.innerWidth < 1200){
//         // nextTr.remove();
//         let col6 = document.getElementsByClassName('col6')
//         for(let col of col6){
//             col.style.display = 'none';
//         }
//     }else{
//         // nextTr.remove();
//         let col6 = document.getElementsByClassName('col6')
//         for(let col of col6){
//             col.style.display = 'table-cell';
//         }
//     }
//     if(window.innerWidth < 1060){
//         // nextTr.remove();
//         let col4 = document.getElementsByClassName('col4')
//         for(let col of col4){
//             col.style.display = 'none';
//         }
//     }else{
//         // nextTr.remove();
//         let col4 = document.getElementsByClassName('col4')
//         for(let col of col4){
//             col.style.display = 'table-cell';
//         }
//     }
//     if(window.innerWidth < 935){
//         // nextTr.remove();
//         let col2 = document.getElementsByClassName('col2')
//         for(let col of col2){
//             col.style.display = 'none';
//         }
//     }else{
//         // nextTr.remove();
//         let col2 = document.getElementsByClassName('col2')
//         for(let col of col2){
//             col.style.display = 'table-cell';
//         }
//     }
//     if(window.innerWidth < 490){
//         // nextTr.remove();
//         let col3 = document.getElementsByClassName('col3')
//         for(let col of col3){
//             col.style.display = 'none';
//         }
//     }else{
//         // nextTr.remove();
//         let col3 = document.getElementsByClassName('col3')
//         for(let col of col3){
//             col.style.display = 'table-cell';
//         }
//     }
// });

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
            let deleteRow = requestPOST(`${window.location.origin}/database_delete/${rowID}`);
            deleteRow.addEventListener('load',()=>{
                console.log(deleteRow.status);
                if(deleteRow.status === 200){
                    window.location.reload(true);
                }else{
                    // window.location.reload(true);
                    alert('b????d');
                }
            })
        })

    })
}