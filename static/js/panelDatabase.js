"use strict";


// let tabelaTabulator = document.getElementById('tabelaTabulator');

// let tabelaObiekt = new Tabulator('#tabelaTabulator', {
//     data: d,
//     layout:"fitColumns",
//     responsiveLayout:"collapse",
//     autoResize: true,
//     pagination:"local",
//     paginationSize:50,
//     columnMinWidth:100,
//     responsiveLayoutCollapseStartOpen:false,
//     columns:[
//         // {title:"ID", field: "id", width: 15, frozen:true},
//         {title:"Nazwisko", field: "nazwisko", frozen: 'true'},
//         {title:"Imię", field: "imie", editor: 'input'},
//         {title:"Data urodzenia", field: "data_urodzenia"},
//         {title:"Data zgonu", field: "data_zgonu"},
//         {title:"Adres", field:"nazwa"},
//         {title:"Kwatera", field:"id_kwatera"},
//         {title:"Przyczyna śmierci", field: "przyczyna"},
//         {title:"Identyfikator administratora", field: "id_admin"},
//         {formatter:printIcon, width:40, hozAlign:"center", cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().name)}},
//     ],
// });
// var printIcon = function(cell, formatterParams, onRendered){ //plain text value
//     return "<button>ASDA</button>";
// };

//column definition in the columns array



let tabela = document.getElementById('table');
let rows = document.getElementsByTagName('tr');
let panelContent = document.getElementsByClassName('panelContent')[0];

let paginatorDiv = document.getElementById("paginatorDiv");

let paginatorButtons = paginatorDiv.getElementsByTagName('button');

// window.addEventListener('load',()=>{
//     alert('juz');
// })

paginator({
    table: tabela,
    box: paginatorDiv,
    rows_per_page: 50,
  });

for(let i=0; i< rows.length; i++){
    if(i !== 0){
        rows[i].addEventListener('mouseover', ()=>{
            rows[i].style.backgroundColor = '#f0f0f0';
            rows[i].lastElementChild.children[0].style.opacity = 'initial';
        });
        rows[i].addEventListener('mouseout', ()=>{
            rows[i].style.backgroundColor = 'initial';
            rows[i].lastElementChild.children[0].style.opacity = '0';
        })
    }

}


for(let button of paginatorButtons){
    button.addEventListener('click',()=>{
        panelContent.scrollTo(0,0);
    })
}