var arr = JSON.parse(localStorage.getItem("indexvalue")) || [];
  var k = arr.length - 1;
  var kon = [arr[k]];
  var cartitemobject = JSON.parse(localStorage.getItem('pro')) || [];
  valueofthe(kon);
  function valueofthe(kon) {
    kon.map(function (elem) {
      var image = document.createElement("img");
      image.setAttribute('class', 'imgfromdata')
      image.setAttribute("src", elem.image);
      document.querySelector(".boximg").append(image);
      var product = document.createElement('p');
      product.setAttribute('class','brandname-tag');
      product.textContent = elem.brandnamekk;
      var productname = document.createElement('p');
      productname.setAttribute('class','productname-tag');
      productname.textContent = elem.name;
      var item = document.createElement('p');
      item.setAttribute('class','itemname-tag');
      item.textContent = "Item #: 41738239";
      var starting = document.querySelector('.nameof-the-product');
      starting.textContent = elem.name;
      document.querySelector('.descrip').append(product,productname,item)
      var priceofproduct = document.createElement('span')
      priceofproduct.textContent = elem.price
      document.querySelector(".item").append(priceofproduct)
      document.querySelector("#buttonforcartitem").addEventListener('click',function (){
            var object = {
                image : elem.image,
                brand : elem.brandnamekk,
                name : elem.name,
                price : elem.price
            }     
            cartitemobject.push(object);
            localStorage.setItem('pro',JSON.stringify(cartitemobject));
      });
    });
  }
console.log(cartitemobject);