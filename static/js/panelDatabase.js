"use strict";


let tabelaTabulator = document.getElementById('tabelaTabulator');

let tabelaObiekt = new Tabulator('#tabelaTabulator', {
    data: d,
    layout:"fitColumns",
    responsiveLayout:"collapse",
    autoResize: true,
    pagination:"local",
    paginationSize:50,
    responsiveLayoutCollapseStartOpen:false,
    columns:[
        // {title:"ID", field: "id", width: 15, frozen:true},
        {formatter:"responsiveCollapse", width:30, minWidth:30, resizable:false, headerSort:false},
        {title:"Nazwisko", field: "nazwisko"},
        {title:"Imię", field: "imie", editor: 'input'},
        {title:"Data urodzenia", field: "data_urodzenia"},
        {title:"Data zgonu", field: "data_zgonu"},
        {title:"Adres", field:"nazwa"},
        {title:"Kwatera", field:"id_kwatera"},
        {title:"Przyczyna śmierci", field: "przyczyna", responsive: 3},
        {title:"Identyfikator administratora", field: "id_admin", responsive: 3},
    ],
});

// let tabela = document.getElementById('table');
// let rows = document.getElementsByTagName('tr');

// for(let row of rows){
//     row.addEventListener('mouseover', ()=>{
//         row.style.backgroundColor = '#f0f0f0';
//         row.lastElementChild.children[0].style.opacity = 'initial';
//     });
//     row.addEventListener('mouseout', ()=>{
//         row.style.backgroundColor = 'initial';
//         row.lastElementChild.children[0].style.opacity = '0';
//     })
// }
