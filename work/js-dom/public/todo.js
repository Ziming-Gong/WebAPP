"use strict";


(function iife() {

const todos = [
    {
        text: 'apple',
        quantity: 2,
        done: true,
        disabled: '',
    },
    {
        text: 'orange',
        quantity: 2,
        done: false,
        disabled: '',
    }
];

const listEl = document.querySelector('#todo-app .todos');
const inputEl = document.querySelector('#todo-app input');
const buttonEl = document.querySelector('#todo-app button');

disableButtonIfNoInput();
addAbilityToAddQuantity();
addAbilityToCompleteItems();
addAbilityToAddItems();
addAbilityToDeleteItems();
addAbilityToMinusQuantity();
disableButtonIfquantityEqualToZero();

render(todos);



function render (todos){
    const html = todos.map ((todo,index) =>{
        return `
            <li>
                <span class = "todo ${todo.done ? "complete" :""}" data-index = "${index}">${todo.text}</span>
                <button id = "btnminus" class = "minus" data-index = "${index}" ${todo.disabled}>-</button>
                <span class = "quantity">${todo.quantity}</span>
                <button class = "add" data-index = "${index}">+</button>

                <span class = "delete" data-index=${index}>X</span>
            </li>
        `;
    }).join('');
    listEl.innerHTML = html;
    buttonEl.disabled= !inputEl.value;
    
};



function disableButtonIfquantityEqualToZero(){
    // 
    listEl.addEventListener('click', (e)=>{
        if(e.target.classList.contains('minus') ||e.target.classList.contains('add')){

            // const btnminus = document.querySelector('')


            const index = e.target.dataset.index;
            let count = todos[index].quantity;
            if( count === 0){
                todos[index].disabled = 'disabled'
            }else{
                todos[index].disabled = ''
            }
            render(todos)
        }

        
    })
}

function addAbilityToAddQuantity(){
    listEl.addEventListener('click', (e)=>{
        if(!e.target.classList.contains('add')){
            return;
        }
        const index = e.target.dataset.index;
        todos[index].quantity++;
        
        render(todos);

    })
    

}

function addAbilityToMinusQuantity(){
    listEl.addEventListener('click', (e)=>{
        if(!e.target.classList.contains('minus')){
            return;
        }
        const index = e.target.dataset.index;
        todos[index].quantity--;

        
        

        render(todos);
    })

}

function disableButtonIfNoInput(){
    inputEl.addEventListener('input',() =>{
        buttonEl.disabled = ! inputEl.value;
    });
}
function addAbilityToCompleteItems(){
    listEl.addEventListener('click', (e) =>{
        if(!e.target.classList.contains('todo')){
            return;
        }
        const index = e.target.dataset.index;
        todos[index].done = !todos[index].done;
        render(todos);
    });
}

function addAbilityToAddItems(){
    buttonEl.addEventListener('click',(e) =>{
        const newTodo = {
            text: inputEl.value,
            quantity: 0,
            done: false,
            disabled: 'disabled'
        };
        todos.push(newTodo);
        inputEl.value = '';
        render(todos);
    });
}

function addAbilityToDeleteItems(){
    listEl.addEventListener('click', (e)=>{
        if(!e.target.classList.contains('delete')){
            return;
        }
        const index = e.target.dataset.index;
        todos.splice(index,1);
        render(todos);
    });
}

})();



