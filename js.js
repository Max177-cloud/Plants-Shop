const active_model=document.querySelector(`.model_registration`)
const header_btn_green=document.querySelector(`.header_btn_green`)
const close_model=document.querySelector(`.close_model`)
const login_btn=document.querySelector(`.login_btn`)
const registration_btn=document.querySelector(`.registration_btn`)
const form=document.querySelector(`.form1`)
const original_form=document.querySelector(`.form`)
const login_input=document.querySelector(`.login_input`)
const password_input=document.querySelector(`.password_input`)
const failed_login=document.querySelector(`.failed_login`)
let loginUser=`Max`
let passwordUser=`justatest`
function openModel(){
    active_model.classList.add(`active_model`)
}
header_btn_green.addEventListener(`click`,()=>openModel())
function closeModel(){
    active_model.classList.remove(`active_model`)
}
close_model.addEventListener(`click`,()=>closeModel())
function openForm(){
    if (form.classList.contains(`deactivated`)) {
        form.classList.remove(`deactivated`)
        original_form.classList.add(`deactivated`)
    }else{
        form.classList.add(`deactivated`)
        original_form.classList.remove(`deactivated`)
    }
}
login_btn.addEventListener(`click`,()=>openForm())
registration_btn.addEventListener(`click`,()=>openForm())
function openCabinet(event){
    event.preventDefault()
    const login_value=login_input.value
    const password_value=password_input.value
    if (login_value.toLowerCase()==loginUser.toLowerCase() && password_value==passwordUser) {
        window.location.href=`cabinet.html`
    }else{
        failed_login.textContent=`Неправильный логин или пароль`
        login_input.value=``
        password_input.value=``
    }
}
form.addEventListener(`submit`,()=>openCabinet(event))