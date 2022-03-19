var datastorage = JSON.parse(localStorage.getItem("pro")) || [];
displayTable(datastorage);
var addon = 0;
function displayTable(datastorage) {
  var array = [];
  document.querySelector("#inputdata").textContent = "";
  datastorage.map(function (elem, index) {
    
    var outter = document.createElement("div");
    outter.setAttribute("class", "dateandmonth");
    var date = document.createElement("strong");
    date.textContent = "Est. delivery:";
    var span = document.createElement("span");
    span.textContent = " Wednesday, December 22";
    outter.append(date, span);
    var main = document.createElement("div");
    main.setAttribute("id", "prolist");
    var div1 = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("class", "img");
    img.setAttribute("src", elem.image);
    div1.append(img);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "mainbody");
    var p1 = document.createElement("p");
    p1.textContent = elem.brand;
    var h3 = document.createElement("h3");
    h3.setAttribute("class", "detail");
    h3.textContent = elem.name;

    var atag = document.createElement("a");
    atag.style.textDecoration = "none";
    atag.addEventListener("click", function () {
      if (p.style.color == "red") {
        p.style.color = "gray";
      } else {
        p.style.backgroundcolor = "red";
        p.style.color = "red";
      }
      addToW(index);
    });
    atag.setAttribute("href", "#");
    var p = document.createElement("button");
    p.setAttribute("class", "buttonforheart");
    p.innerHTML = ' <i class="fas fa-heart"></i>';
    var lab = document.createElement("span");
    lab.setAttribute("class", "heart");
    lab.textContent = "Add to Wishlist";
    div2.append(p1, h3, atag);
    atag.append(p, lab);
    var div3 = document.createElement("div");
    div3.setAttribute("class", "div3ofproduct");
    var price = document.createElement("p");
    price.textContent = elem.price;
    array.push(Number(elem.price));
    price.setAttribute("class", "displayprice");
    var inputnum = document.createElement("input");

    
    inputnum.setAttribute("class", "countofproduct");
    inputnum.type = "number";
    var divfor = document.createElement("div");
    divfor.setAttribute('class','dustpin');
    var bust = document.createElement("img");
    bust.setAttribute("class", "dustbinimg");
    bust.setAttribute(
      "src",
      "https://www.ubuy.co.in/skin/frontend/default/ubuycom-v1/images/trash.png"
    );
    var button = document.createElement("button");
    button.setAttribute("class", "removebtn");
    button.textContent = "Remove";
    button.addEventListener("click", function () {
      deleteItem(index);
    });
    var divforItem = document.createElement("div");
    divforItem.setAttribute("class", "itemlistOndisplay");
    divforItem.append(div1, div2, div3);
    divfor.append(bust, button);
    div3.append(price, inputnum, divfor);
    main.append(outter, divforItem);
    document.querySelector("#inputdata").append(main);
  });

    var tot =array.reduce(function(ac,av){

        return ac+av
      });
      var data=document.querySelector(".totalprice-here");
      data.textContent=tot;
      var data2 =document.querySelector(".totalprice");
      data2.textContent= tot;
      var count = document.querySelector(".totalcount");
      document.querySelector(".totalcount").textContent = "";
      var count2 = array.length;
      count.textContent = count2;
      
      var totalpriceofitem = localStorage.setItem('totalprice', JSON.stringify(tot));
}
var k = JSON.parse(localStorage.getItem('totalprice'));
function addToW(index) {
  console.log(datastorage[index]);
}
function deleteItem(index) {
  datastorage.splice(index, 1);
  localStorage.setItem("pro", JSON.stringify(datastorage));
  displayTable(datastorage);
}

// here ankit
function proceedToCheckout() {
  window.location.href = "checkout.html";

}