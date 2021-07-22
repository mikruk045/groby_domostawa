"use strict"

let tabela = document.getElementById('table');
let rows = document.getElementsByClassName('records');

let rowExpanded = false;
let elemSelected;
let elemDOM;

function tableInteraction(deleteState){
    for(let i=0; i< rows.length; i++){
        if(i !== -1){
            
            rows[i].addEventListener('click',()=>{
                if(elemSelected === rows[i].id){
                    rows[i].blur();
                    if(typeof nextTr !== undefined){
                        nextTr.remove();
                    }
                    elemSelected = undefined;
                }else{
                    rows[i].focus();
                    if(typeof createExpand === 'function'){
                        createExpand(rows[i]);
                    }   
                    
                    elemSelected = rows[i].id;
                    elemDOM = rows[i];
                }
                
            })
            rows[i].addEventListener('mouseover', ()=>{
                rows[i].style.backgroundColor = '#f0f0f0';
                if(deleteState === true){
                    rows[i].lastElementChild.children[0].style.opacity = 'initial';
                }
            });
            rows[i].addEventListener('mouseout', ()=>{
                rows[i].removeAttribute('style');
                if(deleteState === true){
                    rows[i].lastElementChild.children[0].removeAttribute('style');
                }
                
            })
        }
    }
}



function responsiveTable(site){
    if(site === 'database'){
        if(tabela.clientWidth < 1008){
            let col7 = document.getElementsByClassName('col7');
            if(col7.length > 0){
                for(let col of col7){
                    col.style.display = 'none';
                }
            }

        }else{
            let col7 = document.getElementsByClassName('col7');
            if(col7.length > 0){
                for(let col of col7){
                    col.style.display = 'table-cell';
                }
            }

        }
        if(tabela.clientWidth < 907){
            let col9 = document.getElementsByClassName('col9')
            if(col9.length > 0){
                for(let col of col9){
                    col.style.display = 'none';
                }
            }
        }else{
            let col9 = document.getElementsByClassName('col9');
            if(col9.length > 0){
                for(let col of col9){
                    col.style.display = 'table-cell';
                }
            }

        }
        if(tabela.clientWidth < 772){
            // nextTr.remove();
            let col6 = document.getElementsByClassName('col6')
            if(col6.length > 0){
                for(let col of col6){
                    col.style.display = 'none';
                }
            }
        }else{
            // nextTr.remove();
            let col6 = document.getElementsByClassName('col6')
            if(col6.length > 0){
                for(let col of col6){
                    col.style.display = 'table-cell';
                }
            }

        }
        if(tabela.clientWidth < 655){
            // nextTr.remove();
            let col4 = document.getElementsByClassName('col4');
            if(col4.length > 0){
                for(let col of col4){
                    col.style.display = 'none';
                }
            }

        }else{
            // nextTr.remove();
            let col4 = document.getElementsByClassName('col4');
            if(col4.length > 0){
                for(let col of col4){
                    col.style.display = 'table-cell';
                }
            }

        }
        if(tabela.clientWidth < 550){
            // nextTr.remove();
            let col2 = document.getElementsByClassName('col2');
            if(col2.length > 0){
                for(let col of col2){
                    col.style.display = 'none';
                }
            }

        }else{
            // nextTr.remove();
            let col2 = document.getElementsByClassName('col2');
            if(col2.length > 0){
                for(let col of col2){
                    col.style.display = 'table-cell';
                }
            }

        }
        if(tabela.clientWidth < 441){
            // nextTr.remove();
            let col3 = document.getElementsByClassName('col3');
            if(col3.length > 0){
                for(let col of col3){
                    col.style.display = 'none';
                }
            }

        }else{
            // nextTr.remove();
            let col3 = document.getElementsByClassName('col3')
            if(col3.length > 0){
                for(let col of col3){
                    col.style.display = 'table-cell';
                }
            }

        }
        if(tabela.clientWidth < 261){
            // nextTr.remove();
            let col5 = document.getElementsByClassName('col5');
            if(col5.length > 0){
                for(let col of col5){
                    col.style.display = 'none';
                }
            }

        }else{
            // nextTr.remove();
            let col5 = document.getElementsByClassName('col5')
            if(col5.length > 0){
                for(let col of col5){
                    col.style.display = 'table-cell';
                }
            }

        }
    }
    if(site === 'admin'){

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