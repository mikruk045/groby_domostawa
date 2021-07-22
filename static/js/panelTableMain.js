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
                rows[i].blur();
                if(nextTr !== undefined){
                    nextTr.remove();
                }
                elemSelected = undefined;
            }else{
                rows[i].focus();
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

// const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

// const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
//     v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
//     )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));


// document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
//     paginator({
//         table: tabela,
//         box: paginatorDiv,
//         rows_per_page: 50,
//         disable:true,
//     });
//     const table = th.closest('table');
//     Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
//         .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
//         .forEach(tr => table.appendChild(tr) );
//     paginator({
//         table: tabela,
//         box: paginatorDiv,
//         rows_per_page: 50,
//         disable:false,
//     });
// })));