const birthday = document.getElementById("birthday")
const emailField= document.getElementById("email")
const textFields= document.querySelectorAll("[type='text']");
const nowTimestamp = Date.now();

window.onload = function () {

  console.log("DOM ready!");


  document.getElementsByTagName("form")[0].addEventListener("submit", (ev)=>{
    var formInvalid = null;
    let note=""
    
    if (!validateEmail(emailField.value)){
      note+="<div>Email Not Valid</div>"; 
      formInvalid= true
    }
    if(!compareDate(birthday.value, nowTimestamp)){
      note+="<div>Birthday Not Valid</div>";
      formInvalid = true 
    }
    textFields.forEach((e)=>{
      if(e.value.length<=5){
        note+="<div>Text Field Not Valid</div>";
        formInvalid = true
      }
    })
    ev.preventDefault();
    if(formInvalid && note!=""){
      document.querySelector("#myModal h5").innerHTML="Form Wrongly Submitted"
      document.querySelector(".modal-body").innerHTML= note
    }else{
      document.querySelector("#myModal h5").innerHTML= `Bienvenue ${textFields[1].value}`
      const addr= textFields[2].value.split(",").at(-1).trim();
      document.querySelector(".modal-body").innerHTML= `<p>Vous etes né le ${birthday.value} et vous habitez <a  href="http://maps.google.com/maps?q=${addr}" target="_blank">${textFields[2].value}</a></p>`     
    }
    var myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show(); 
  })
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


birthday.onchange= verifydate
emailField.onchange= emailFieldcheck


function emailFieldcheck(e){
  if(validateEmail(e.target.value)){
    document.querySelector("#email + span").style.display="inline-block"
  }
  else preventDefaulting(e)
}

textFields.forEach((textField, i)=>{
  textField.addEventListener("input", textFieldCheck)
})



function textFieldCheck(e){
  if(e.target.value.length>=5){
    e.target.nextElementSibling.style.display="inline-block";
  }
  else preventDefaulting(e)
}


function verifydate(e) {
  if(compareDate(e.target.value, nowTimestamp))
    e.target.nextElementSibling.style.display="inline-block"
  else preventDefaulting(e)
}

function compareDate(date1, date2){
  return new Date(date1).getTime() < date2
}


function preventDefaulting(event) {
  event.target.nextElementSibling.style.display="none"
}

