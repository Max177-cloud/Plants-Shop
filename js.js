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
// filter's product
const filter_btn=document.querySelector(`.filter_btn`)
const filter_max=document.querySelector(`.filter_max`)
const filter_min=document.querySelector(`.filter_min`)
const reset_btn=document.querySelector(`.reset_btn`)
const sort=document.querySelector(`.sort`)
const category_item=document.querySelectorAll(`.category_item`)
const products=Array.from(document.querySelectorAll(`.products_item`))
function filterProducts(){
    const min=+filter_min.value
    const max=+filter_max.value
    products.forEach(el=>{
        const priceText=el.querySelector(`.products_text`).textContent
        const price=parseFloat(priceText.replace("$", ""))
        if (price>=min && price<=max) {
            el.style.display=`block`
        }else{
            el.style.display=`none`
        }
    })
}
function resetFilters(){
    filter_min.value=``
    filter_max.value=``
    products.forEach(el=>{
        el.style.display=`block`
    })

}
function sortedProducts(){
    const sortType=sort.value
    const container=document.querySelector(`.products_writer`)
    const containerArray=Array.from(container.children)
    containerArray.sort((a,b)=>{
        const priceA = parseFloat(a.querySelector(".products_text").textContent.replace("$", ""));
      const priceB = parseFloat(b.querySelector(".products_text").textContent.replace("$", ""));
      const nameA = a.querySelector(".products_title").textContent.toLowerCase();
      const nameB = b.querySelector(".products_title").textContent.toLowerCase();
      switch(sortType) {
        case "Incr": return priceA - priceB;
        case "Descr": return priceB - priceA;
        case "Alp": return nameA.localeCompare(nameB);
        default: return 0;
      }
    });

    container.innerHTML = "";
    containerArray.forEach(item => container.appendChild(item));
    }
category_item.forEach(el=>{
    el.addEventListener(`click`,()=>{
        const category=el.textContent
        if (category==`All`) {
            products.forEach(item=>item.style.display=`block`)
        }else{
            products.forEach(p=>{
                if (p.dataset.category.toLowerCase()==category.toLowerCase()) {
                    p.style.display=`block`
                }else{
                    p.style.display=`none`
                }
            })
        }
        category_item.forEach(item=>item.classList.remove(`act_category`))
        el.classList.add(`act_category`)
    })
})
sort.addEventListener(`change`,()=>sortedProducts())
filter_btn.addEventListener(`click`,()=>filterProducts())
reset_btn.addEventListener(`click`,()=>resetFilters())
// validate form
const footer_input=document.querySelector(`.footer_input`)
const footer_btn=document.querySelector(`.footer_btn`)
const header_search=document.querySelector(`.header_search`)
const search_products=document.querySelector(`.search_products`)

const init=window.intlTelInput(footer_input,{initialCountry: "ua", // стартовая страна
  preferredCountries: ["ua", "pl", "de", "us", "gb"], // список популярных
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js"})
footer_btn.addEventListener(`click`,()=>{
    const number=init.getNumber()
    console.log(number)
})