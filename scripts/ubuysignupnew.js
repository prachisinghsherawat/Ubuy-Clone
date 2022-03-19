document.querySelector("#signupbutton").addEventListener("click",signup);

var userdata=JSON.parse(localStorage.getItem("signupdata"))||[];
function signup(){

var name=document.querySelector("#username").value;
console.log(name)
var mobile=document.querySelector("#mobile").value;
var email=document.querySelector("#email").value;
var password=document.querySelector("#password").value;
var cfmpassword=document.querySelector("#cfmpassword").value;
var usercred={
name:name,
mobile:mobile,
email:email,
password:password,
cfmpassword:cfmpassword
}

if(name==""||email==""||password==""||cfmpassword==""){
alert("enter valid details"); 
}
else{
userdata.push(usercred);
}
localStorage.setItem("signupdata",JSON.stringify(userdata));

if(name!=""&&email!=""&&password!=""&&cfmpassword!=""){
window.location.href="ubuysigninnew.html"
} 

}