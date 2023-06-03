//Variables
const price = 4500
const categories = {
    a:{percent: 20 ,value:'0'},
    b:{percent: 10 ,value:'1'},
    c:{percent: 5 ,value:'2'}
}

const totalText = 'Total a pagar: $'

let category = null
let cantidad = null
let total = null


//DOM
const form = document.forms.formulario
const inputs = form.getElementsByTagName('input')
const select = form.getElementsByTagName('select')[0]

const totalTag = document.getElementById('total')

const resetBtn = document.getElementById('reset')
const submitBtn = document.getElementById('submit')


const card1 = document.getElementById('cardone')
const card2 = document.getElementById('cardtwo')
const card3 = document.getElementById('cardthree')


// configuracion 

for (let tag of form){
tag.classList.add('my-1')

}
totalTag.innerText = totalText



//Utils

const totalPrice = () => {
    if(!cantidad || !category)  return;

    const totalValue = price*cantidad
    const discount = (totalValue / 100) * categories[category].percent
    total = totalValue - discount
    totalTag.innerText = totalText + total
}
totalPrice()

//events
const clickCard = (e) =>{
selected = e.currentTarget.dataset.index 
    if(selected==0) {
        form.category.value='a'
        category='a'
        document.getElementById("cardone").style.color = "white";
        document.getElementById("cardtwo").style.color = "black";
        document.getElementById("cardthree").style.color = "black";
    }
    if(selected==1) {
        form.category.value='b'
        category='b'
        document.getElementById("cardtwo").style.color = "white";
        document.getElementById("cardone").style.color = "black";
        document.getElementById("cardthree").style.color = "black";
    }
    if(selected==2) {
        form.category.value='c'
        category='c'
        document.getElementById("cardthree").style.color = "white";
        document.getElementById("cardtwo").style.color = "black";
        document.getElementById("cardone").style.color = "black";
    }
    totalPrice()
}



const resetColor = () => {
    document.getElementById("cardthree").style.color = "black";
    document.getElementById("cardtwo").style.color = "black";
    document.getElementById("cardone").style.color = "black";
}
const resetCategories = () => {
    total = null
    selected = null
    resetColor()
    totalPrice()
    totalTag.innerText = totalText
    

}

const reset = (e) =>{
    e.preventDefault()
    for(let input of inputs){
        input.value = ''
        select.value= 'none'
        cantidad=null
        category=null
        total=null
        totalTag.innerText = totalText
        resetColor()
    }
}

const submit = (e) => {
    e.preventDefault()
    const {firstname, lastname, email, cantidad, category} = form
    const verified = {
        firstname: firstname.value !== '', 
        lastname: lastname.value !== '', 
        email: email.value.includes('@'), 
        cantidad: cantidad.value > 0, 
        category: category.value !== 'none'
    }
    const values = Object.values(verified)
    // console.log(Object.values(verified)) 
    // console.log( Object.keys(verified) )
    // console.log( Object.entries(verified) )
    const submitAccepted = values.every(value=>value)
    
    // operador if ternario
    submitAccepted
    ?Swal.fire(
        'Enviado',
        '',
        'success'
      )
    :Swal.fire(
        'Faltan campos',
        '',
        'warning'
      )

}

const setCategory = (e) => {

    const option = e.target.value

        if(option === 'none'){
            resetCategories()
            return
        }
category = option
const index = parseInt( categories[category].value )
if(index===0) {
    document.getElementById("cardone").style.color = "white";
    document.getElementById("cardtwo").style.color = "black";
    document.getElementById("cardthree").style.color = "black";
}
if(index===1) {
    document.getElementById("cardtwo").style.color = "white";
    document.getElementById("cardone").style.color = "black";
    document.getElementById("cardthree").style.color = "black";
}
if(index===2) {
    document.getElementById("cardthree").style.color = "white";
    document.getElementById("cardtwo").style.color = "black";
    document.getElementById("cardone").style.color = "black";
}
totalPrice()
} 

const setCantidad = (e) => {
    const {value} = e.target
    if(value <0 || isNaN(value)) {
        e.target.value = 0
        total=null
        return
    }
    cantidad = value
    totalPrice()
}



form.category.addEventListener('change',setCategory)
form.cantidad.addEventListener('keyup',setCantidad)
resetBtn.addEventListener('click', reset)
form.addEventListener('submit', submit)

card1.addEventListener('click',clickCard)
card2.addEventListener('click',clickCard)
card3.addEventListener('click',clickCard)


