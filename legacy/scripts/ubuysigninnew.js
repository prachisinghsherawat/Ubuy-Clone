document.querySelector("#btn").addEventListener("click",signin);
var res=JSON.parse(localStorage.getItem("signupdata"));
function signin(){
    var email=document.querySelector("#ubuyemail").value;
    console.log(email)
var password=document.querySelector("#ubuypassword").value;
       var count=0;
  if(email=="admin"&&password=="admin"){
      window.location.href="form.html"
  } 
  else if(email==""&&password==""){
      alert("enter email and password");
  }
  else if(email==""){
      alert("enter your email")
  }
  else if(password==""){
      alert("enter your password")
  }
  else{    
    for(var i=0;i<res.length;i++){   
        
  if(res[i].email==email&&res[i].password==password){
            count++;
            window.location.href="landinghomepage.html";
        }   
    }
    if(count==0){
        alert("you entered wrong credentials");
    
}
  }
}