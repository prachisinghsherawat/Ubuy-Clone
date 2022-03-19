var datastorage = JSON.parse(localStorage.getItem("pro")) || [];
displayTable(datastorage);
function displayTable(datastorage) {
//   document.querySelector(".order").textContent = "";
  datastorage.map(function (elem, index) {
    
    
    
    // image product div
    var main = document.createElement("div");
    main.setAttribute("id", "prolist");

    var div1 = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("class", "img");
    img.setAttribute("src", elem.image);
    div1.append(img);

    //lenovo lenovo chromebook name
    var div2 = document.createElement("div");
    div2.setAttribute("class", "mainbody");
    var p1 = document.createElement("div");
    p1.setAttribute("class", "p1");
    p1.textContent = elem.brand;
    var h3 = document.createElement("div");
    h3.setAttribute("class", "detail");
    h3.textContent = elem.name; 
    
    var capacity= document.createElement("div");
    capacity.setAttribute("class", "capacity");
    var capacitydiv= document.createElement("div");
    capacitydiv.setAttribute("class", "capacitydiv");
    capacitydiv.textContent = "Capacity:";
    var sizediv= document.createElement("div");
    sizediv.setAttribute("class", "sizediv");
    sizediv.textContent = "11.6";
    capacity.append(capacitydiv,sizediv);
    
    var brand1= document.createElement("div");
    brand1.setAttribute("class", "brand1");
    var  branddiv1= document.createElement("div");
    branddiv1.setAttribute("class", "branddiv1");
    branddiv1.textContent = "Brand Name:";
    var branddiv2= document.createElement("div");
    branddiv2.setAttribute("class", "branddiv2");
    branddiv2.textContent = elem.brand;
    brand1.append(branddiv1,branddiv2);
    
   

    
    var price= document.createElement("div");
    price.setAttribute("class", "price");
    var  price1= document.createElement("div");
    price1.setAttribute("class", "price1");
    price1.textContent = "Product Price";
    var price2= document.createElement("div");
    price2.setAttribute("class", " price2");
    price2.textContent = "INR"+" "+elem.price; ;
    price.append( price1, price2);


    
    var weight= document.createElement("div");
    weight.setAttribute("class", "weight");
    var  weight1= document.createElement("div");
    weight1.setAttribute("class", "weight1");
    weight1.textContent = "Weight:";
    var weight2= document.createElement("div");
    weight2.setAttribute("class", "weight2");
    weight2.textContent = "2.19Kg/Qty";
    weight.append(weight1,weight2);

   
    //append lenovo chromebook
    
    div2.append(p1, h3,capacity,brand1, weight,price);
   

    
    
   
   
    main.append(div1,div2);
    document.querySelector(".order").append(main);
  });
}
// here ankit
function proceedToCheckout() {
  window.location.href = "checkout.html";
}
var k = JSON.parse(localStorage.getItem('totalprice'));
document.querySelector('.paybox7').textContent = k;
var grand = k+777;
var doo = document.querySelector('.paybox10');
doo.textContent = grand; 