




function payNow(){
    console.log("tt");

    var cardNo=document.getElementById("cardnumber").value;
    var cardCvv=document.getElementById("cvv").value;
    var exDate=document.getElementById("month").value;
   
    console.log(cardCvv.length)
    
    if(cardNo.length == 16  && cardCvv.length == 3 ){
        window.location.href="paymentsuccesspage.html";
    }else{
        
        alert("Invalid Card");
    }
}

