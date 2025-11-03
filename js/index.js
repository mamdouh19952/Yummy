// start of nav animantion
     let closeTimer;

 closeNav()

$(".side-nav-menu").on("mouseleave",function (params) {
 closeTimer=  setTimeout(() => {
        closeNav()

  }, 2000);
 })
$(".side-nav-menu").on("mouseenter",function (params) {
  clearTimeout(closeTimer);
});
$(".open-close-icon").click(()=>{
console.log($(".side-nav-menu").css("left"))
    if($(".side-nav-menu").css("left")=="0px"){

    closeNav()


    }
    else{
  
openNav()

    }
})


function closeNav(){
   let navTabWidth=$(".nav-tab").outerWidth()
         $(".side-nav-menu").animate({left:-navTabWidth},500) 
          $(".open-close-icon").addClass("fa-align-justify");
     $(".open-close-icon").removeClass("fa-xmark");
        $(".links li").animate({top:300},500)
}

function openNav(){

    $(".side-nav-menu").animate({left:0},500) 
 $(".open-close-icon").removeClass("fa-align-justify");
     $(".open-close-icon").addClass("fa-xmark");
for (let i = 0; i < 5; i++) {
     $(".links li").eq(i).animate({top:0}
        ,
            (i+5)*100)
    
}
}

// end of nav animantion

// srart to get data and display it and search

let rowData=document.getElementById("rowData")
let searchContainer=document.getElementById("searchContainer")
let term =""
searchData(term)
 

function showSearch() {
        rowData.innerHTML = ""

    searchContainer.innerHTML=`    <div class="container w-75 d-flex align-items-center  justify-content-center gap-4 py-4">
    <input oninput="findName(this.value)"class="form-control " type="search" placeholder="search by name ...">
    <input oninput="searchByFLetter(this.value)"lengyh="1" class="form-control " type="search" placeholder="search by FirstLetter ...">
</div> 
`}

async function findName(searchName=""){
    rowData.innerHTML = ""

searchData(searchName)
}
 async function searchByFLetter(firstL="a") {
    if (!firstL) firstL = "a";
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstL}`)
    const data = await response.json()

    let filterData =data.meals 
    
    displayMeals(filterData)

}
function findFirstLetter(searchFirstLetter=""){
searchFirstLetter.length=1
searchData(searchFirstLetter)
}





async function searchData(term) {
$(".inner-loading-screen").fadeIn(300)
    const respone=await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    const data = await respone.json()
    // console.log (data)
    const meals=data.meals
    displayMeals(meals)
    $(".inner-loading-screen").fadeOut(300)

}





function displayMeals (meals){
let cartoona='';
for (const meal of meals) {
    cartoona+=`
     <div class="col-sm-6 col-md-4 col-lg-3  ">
        <div onclick="getMealDwscribtion('${meal.idMeal}')" class="meal position-relative overflow-hidden cursor-pointer   rounded-2">
            <img class="w-100  " src="${meal.strMealThumb}" alt="">
            <div class="layer-img d-flex align-items-center justify-content-center ">
<h2>${meal.strMeal}</h2>            </div>
        </div>
    </div>  
    `
    // console.log(meal)

    
}
rowData.innerHTML=cartoona
}

async   function getMealDwscribtion(mealID){
       const respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
const data= await respone.json();
const meals=data.meals
    console.log(data)
    displayMealsDeatils(meals)
}

function displayMealsDeatils(meals){
let ingredints=``
let meal =meals[0]
for (let i = 1; i <=20; i++) {
if (meal[`strIngredient${i}`]) {
  ingredints+=                 `  <li class="alert alert-info m-2 p-1"> ${meal[`strIngredient${i}`]}</li>`

    console.log(ingredints);
    
}    
}
 let tags = meal.strTags?.split(",")
     if (!tags) tags = []

     let tagsStr = ''
     for (let i = 0; i < tags.length; i++) {
         tagsStr += `
         <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
     }

rowData.innerHTML=`

<div class="describation container py-4 ps-4 ">
<div class="row">

    <div class="col-md-4">
        <img  class="w-100 rounded-2" src="${meals[0].strMealThumb}" alt="">
        <h3 class="pt-2">${meals[0].strMeal}   </h3>
    </div>
    <div class="col-md-8">
<h4>Instructions
</h4>
<p>${meals[0].strInstructions}</p>
<p class="fs-3      fw-bolder">area:${meals[0].strArea}    </p>
<p class="fs-3      fw-bolder">Category:${meals[0].strCategory}    </p>
<p class="fs-3      fw-bolder">Recipes:    </p>
<ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredints}
                </ul>

<p class="fs-3      fw-bolder"      >Tags: 
                 <ul class="list-unstyled d-flex g-3 flex-wrap">

${tagsStr}

                    </ul>
    
</p>
<ul class="list-unstyled d-flex g-3 gap-2 flex-wrap">
               <a target="_blank" href="${meals[0].strSource}" class="btn btn-success p-2">Source</a>
               <a target="_blank" href="${meals[0].strYoutube}" class="btn btn-danger p-2">Youtube</a>     
                </ul>   

   
</div>

</div>

</div>
`

}
// end of search term 


// start catagory 


async function getCatagory() {
    searchContainer.innerHTML=""
$(".inner-loading-screen").fadeIn(300)

    const respone=await fetch ("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await respone.json()
    // console.log (data)
    const categories=data.categories
    displayCategories(categories)
    $(".inner-loading-screen").fadeOut(300)

}





function displayCategories (categories){
    rowData.innerHTML=""

let cartoona='';
for (const item of categories) {
    cartoona+=`
     <div class="col-sm-6 col-md-4 col-lg-3  ">
        <div onclick=showCuurentCatagory("${item.strCategory}") class="meal position-relative overflow-hidden cursor-pointer   rounded-2">
            <img class="w-100  " src="${item.strCategoryThumb}" alt="">
            <div class="layer-img d-flex flex-column align-items-center justify-content-center text-center ">
<h2>${item.strCategory}</h2> 
<p class="px-2">${item.strCategoryDescription?.split(" ").slice(0,20).join(" ")}</p>

         </div>
        </div>
    </div>  
    `
    // console.log(item)

    
}
rowData.innerHTML=cartoona
}
async function showCuurentCatagory(category) {
        searchContainer.innerHTML=""

    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const data = await response.json()
    const meals=data.meals
    displayMeals (meals)
    $(".inner-loading-screen").fadeOut(300)

}
// end of catagory

// start areas 


async function getAreas() {
        searchContainer.innerHTML=""

$(".inner-loading-screen").fadeIn(300)

    const respone=await fetch ("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    const data = await respone.json()
    console.log (data)
    const Areas=data.meals
    displayAreas(Areas)
    $(".inner-loading-screen").fadeOut(300)

}





function displayAreas (Areas){
    rowData.innerHTML=""

let cartoona='';
for (const item of Areas        ) {
    cartoona+=`
     <div class="col-sm-6 col-md-4 col-lg-3  ">
        <div onclick=showCuurentArea("${item.strArea}") class="meal position-relative  cursor-pointer text-center   rounded-2">
        <span ><i class="fa-solid fa-location-dot fa-4x"></i></span >
         <h3 class="pt-2" >${item.strArea  }</h3>
        </div>
    </div>  
    `
    // console.log(item)

    
}
rowData.innerHTML=cartoona
}

async function showCuurentArea(area) {
        searchContainer.innerHTML=""

    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const data = await response.json()
    const meals=data.meals
    displayMeals (meals)
    $(".inner-loading-screen").fadeOut(300)

}
// end of areas

// start Ingredient


async function getIngredient() {
        searchContainer.innerHTML=""

$(".inner-loading-screen").fadeIn(300)

    const respone=await fetch ("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    const data = await respone.json()
    // console.log (data)
    const Ingredients=data.meals.slice(0,32)
    displayIngredient(Ingredients)
    $(".inner-loading-screen").fadeOut(300)

}





function displayIngredient (Ingredients){
    rowData.innerHTML=""

let cartoona='';
for (const item of Ingredients        ) {
    cartoona+=`
     <div class="col-sm-6 col-md-4 col-lg-3  ">
        <div onclick=showCuurentIngredient("${item.strIngredient}") class="meal position-relative  cursor-pointer text-center   rounded-2">
        <span ><i class="fa-solid fa-utensils fa-4x"></i></span >

         <h3 class="pt-2" >${item.strIngredient}</h3>
         <p>
         ${item.strDescription?.split(" ").slice(0,10).join(" ")}
         </p>
        </div>
    </div>  
    `
    // console.log(item)

    
}
rowData.innerHTML=cartoona
}

async function showCuurentIngredient(Ingredient) {
        searchContainer.innerHTML=""

    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
    const data = await response.json()
    const meals=data.meals
    displayMeals (meals)
    $(".inner-loading-screen").fadeOut(300)

}
// end Ingredient

// start contacts

function showContacts(){
        searchContainer.innerHTML=""

    console.log("hello")
    rowData.innerHTML=`<div id="contact" class="d-flex justify-content-center align-items-center   ">
    <div class="container w-75 ">
        <form action="" class="text-center">
 <div class="row g-4  ">

<div class="col-md-6 ">
    <input class="form-control" type="text" placeholder="enter your name">
    <p id="nameMsg" class="alert alert-danger d-none p-2 mt-2">your name must be charset only</p>

</div>
<div class="col-md-6 ">
    <input class="form-control" type="email" placeholder="enter your email">
        <p id="emailMsg" class="alert alert-danger d-none p-2 mt-2">your email must be vaild </p>

</div>
<div class="col-md-6 ">
    <input class="form-control" type="tel" placeholder="enter your phone">
        <p id="phoneMsg" class="alert alert-danger d-none p-2 mt-2">your phone must be 11 number</p>

</div>
<div class="col-md-6 ">
    <input class="form-control" type="number" placeholder="enter your age">
        <p id="ageMsg" class="alert alert-danger d-none p-2 mt-2">your name must real ...</p>

</div>
<div class="col-md-6 ">
    <input class="form-control" type="password" placeholder="enter your password">
        <p id="passMsg" class="alert alert-danger d-none p-2 mt-2">your passward must be charset and numbers</p>

</div>
<div class="col-md-6 ">
    <input class="form-control" type="password" placeholder="enter your repassward">
        <p id="repassMsg" class="alert alert-danger d-none p-2 mt-2">your repassward must be the same as  your passward</p>

</div>
  

    </div>
    <button disabled="" id = "submitBtn"class="btn btn-primary p-2 mt-3"> submit</button>
    </form>
</div>  
</div> `

validateFrom()
}
function validateFrom() {
  const form = document.querySelector("#contact form") || document.querySelector("form");
  const submitBtn = document.getElementById("submitBtn");

  const inputs = Array.from(form.querySelectorAll("input"));

  function nameValidation() {
    const val = inputs[0].value.trim();
    const ok = /^[a-zA-Z ]+$/.test(val);
    document.getElementById("nameMsg").classList.toggle("d-none", ok);
    return ok;
  }
  function emailValidation() {
    const val = inputs[1].value.trim();
    const ok = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    document.getElementById("emailMsg").classList.toggle("d-none", ok);
    return ok;
  }
  function phoneValidation() {
    const val = inputs[2].value.trim();
    const ok = /^01[0-9]{9}$/.test(val);
    document.getElementById("phoneMsg").classList.toggle("d-none", ok);
    return ok;
  }
  function ageValidation() {
    const val = inputs[3].value.trim();
    const num = Number(val);
    const ok = /^\d{1,3}$/.test(val) && num >= 1 && num <= 120;
    document.getElementById("ageMsg").classList.toggle("d-none", ok);
    return ok;
  }
  function passValidation() {
    const val = inputs[4].value;
    const ok = /^[A-Za-z0-9]{6,}$/.test(val);
    document.getElementById("passMsg").classList.toggle("d-none", ok);
    return ok;
  }
  function repassValidation() {
    const val = inputs[5].value;
    const ok = val === inputs[4].value && val !== "";
    document.getElementById("repassMsg").classList.toggle("d-none", ok);
    return ok;
  }

  

inputs.forEach((inp, idx) => {
    inp.addEventListener("keyup", function () {
      if (idx === 0) nameValidation();
      if (idx === 1) emailValidation();
      if (idx === 2) phoneValidation();
      if (idx === 3) ageValidation();
      if (idx === 4) passValidation();
      if (idx === 5) repassValidation();
      toggleSubmit();
    });

    
  
});
form.addEventListener("submit", function (e) {
    e.preventDefault();
    
  });
function toggleSubmit() {
    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passValidation() && repassValidation()) {
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.setAttribute("disabled", true);
    }
  }

}

// end of contacts







// let submitBtn;

// $(document).ready(() => {
//     searchByName("").then(() => {
//         // $(".loading-screen").fadeOut(500)
//         $("body").css("overflow", "visible")

//     })
// })












// function showContacts() {
//     rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
//     <div class="container w-75 text-center">
//         <div class="row g-4">
//             <div class="col-md-6">
//                 <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
//                 <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Special characters and numbers not allowed
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
//                 <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Email not valid *exemple@yyy.zzz
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
//                 <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid Phone Number
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
//                 <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid age
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
//                 <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid password *Minimum eight characters, at least one letter and one number:*
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
//                 <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid repassword 
//                 </div>
//             </div>
//         </div>
//         <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
//     </div>
// </div> `
//     submitBtn = document.getElementById("submitBtn")


//     document.getElementById("nameInput").addEventListener("focus", () => {
//         nameInputTouched = true
//     })

//     document.getElementById("emailInput").addEventListener("focus", () => {
//         emailInputTouched = true
//     })

//     document.getElementById("phoneInput").addEventListener("focus", () => {
//         phoneInputTouched = true
//     })

//     document.getElementById("ageInput").addEventListener("focus", () => {
//         ageInputTouched = true
//     })

//     document.getElementById("passwordInput").addEventListener("focus", () => {
//         passwordInputTouched = true
//     })

//     document.getElementById("repasswordInput").addEventListener("focus", () => {
//         repasswordInputTouched = true
//     })
// }

// let nameInputTouched = false;
// let emailInputTouched = false;
// let phoneInputTouched = false;
// let ageInputTouched = false;
// let passwordInputTouched = false;
// let repasswordInputTouched = false;




// function inputsValidation() {
//     if (nameInputTouched) {
//         if (nameValidation()) {
//             document.getElementById("nameAlert").classList.replace("d-block", "d-none")

//         } else {
//             document.getElementById("nameAlert").classList.replace("d-none", "d-block")

//         }
//     }
//     if (emailInputTouched) {

//         if (emailValidation()) {
//             document.getElementById("emailAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("emailAlert").classList.replace("d-none", "d-block")

//         }
//     }

//     if (phoneInputTouched) {
//         if (phoneValidation()) {
//             document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

//         }
//     }

//     if (ageInputTouched) {
//         if (ageValidation()) {
//             document.getElementById("ageAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("ageAlert").classList.replace("d-none", "d-block")

//         }
//     }

//     if (passwordInputTouched) {
//         if (passwordValidation()) {
//             document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

//         }
//     }
//     if (repasswordInputTouched) {
//         if (repasswordValidation()) {
//             document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

//         }
//     }


//     if (nameValidation() &&
//         emailValidation() &&
//         phoneValidation() &&
//         ageValidation() &&
//         passwordValidation() &&
//         repasswordValidation()) {
//         submitBtn.removeAttribute("disabled")
//     } else {
//         submitBtn.setAttribute("disabled", true)
//     }
// }

// function nameValidation() {
//     return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
// }

// function emailValidation() {
//     return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
// }

// function phoneValidation() {
//     return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
// }

// function ageValidation() {
//     return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
// }

// function passwordValidation() {
//     return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
// }

// function repasswordValidation() {
//     return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
// }