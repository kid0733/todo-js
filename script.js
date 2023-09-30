//input field
const input= document.getElementById('input_box')
//addBtn
const addBtn=document.getElementById('btn')
//ul
const items=document.getElementById('items')
//cross
const cross=document.querySelectorAll('.cross')
//clear button
const clear=document.getElementById('clear_btn')
//edit button
const editBtn=document.getElementById('edit_btn')

//isEdit
let isEdit=false
//itemList
let itemList=[]


//add item
function createCard(item){
    //creating elements
    div=document.createElement('div')
    li=document.createElement('li')
    li.appendChild(document.createTextNode(item))
    deleteBtn=document.createElement('button')
    img=document.createElement('img')
    //adding classes
    div.className='list_box'
    li.className='list_item'
    deleteBtn.className='cross'
    img.className='cross'
    img.src='remove.png'
    //placing elements 
    div.appendChild(li)
    div.appendChild(deleteBtn)
    deleteBtn.appendChild(img)
    items.appendChild(div)
    img.addEventListener('click',removeItem)
}
function addItem(){
    if(input.value==''){
        alert('That is not a valid input please try again.')
    }else{
        const inputValue=input.value;
        itemList.push(input.value)
        createCard(inputValue)
        input.value=''
    }
    hide()
    console.log(itemList);
    save()
}
//removeItem
function removeItem(e){
    e.target.parentElement.parentElement.remove()
    const itemRemove=e.target.parentElement.parentElement.textContent
    if(itemList.length>0){
        removeLS(itemRemove)
        save()
    }else{
        localStorage.removeItem('items')
    }
    hide()
}
//remove from localstorage
function removeLS(x){
    const indexLS=itemList.indexOf(x);
    if(indexLS>-1){
        itemList.splice(indexLS,1)
    }
}

function hide(){
    if(items.childElementCount===0){
        clear.className='hide'
        editBtn.className='hide'
        
    }
    else{
        clear.className='clear_btn'
        editBtn.className='edit_btn'
        
    }
}
console.log(items.childElementCount);
//clearAll
function clearAll(){
    while(items.firstChild){
        items.firstChild.remove()
    }
    localStorage.removeItem('items')
    itemList.splice(0,itemList.length)
    console.log(itemList);
}
//save to localStorage
function save(){
    localStorage.setItem('items',JSON.stringify(itemList))
    
}
//load items from ls
function load(){
    const retrivedLocal=localStorage.getItem('items');
    if (retrivedLocal){
        itemList.push(...JSON.parse(retrivedLocal));
        itemList.forEach(createCard)
    }
    else{
        itemList=[]
    }
}
//Edit mode
function isEditMode(){
    isEdit=true;
    console.log('Edit mode ON');
}
function editState(){
    
}
//init
load()
hide()
//eventListener
clear.addEventListener('click',clearAll)
addBtn.addEventListener('click',addItem)
editBtn.addEventListener('click',isEditMode)
input.addEventListener('keydown',function(event){
    if(event.key==='Enter'){
        addItem()
    }
})
cross.forEach(function(cross){
    cross.addEventListener('click',removeItem)
})

