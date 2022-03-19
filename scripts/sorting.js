var indexfors = [];
var database = [
  {
    brandname: "amazon",
    brand: "us store",
    price: 2656,
    cutprice: 4019,
    name: "Fire TV Stick with Alexa Voice Remote",
    image: "https://m.media-amazon.com/images/I/51KKR5uGn6L._AC_US218_.jpg",
  },
  {
    brandname: "amazon",
    brand: "us store",
    price: 2202,
    cutprice: 4019,
    name: "Echo Dot (3rd Gen, 2018 release) - Smart speaker",
    image: "https://m.media-amazon.com/images/I/6182S7MYC2L._AC_US218_.jpg",
  },
  {
    brandname: "amazon basics",
    brand: "us store",
    price: 1409,
    cutprice: 1599,
    name: "Amazon Basics 36 Pack AAA High-Performance",
    image: "https://m.media-amazon.com/images/I/71nDX36Y9UL._AC_US218_.jpg",
  },
  {
    brandname: "oculus",
    brand: "us store",
    price: 3565,
    cutprice: 5302,
    name: "Introducing Fire TV Stick 4K Max streaming",
    image: "https://m.media-amazon.com/images/I/41XTOfFgUqL._AC_US218_.jpg",
  },
  {
    brandname: "apple",
    brand: "us store",
    price: 2019,
    cutprice: 2112,
    name: "Apple 20W USB-C Power Adapter",
    image: "https://m.media-amazon.com/images/I/41iWogJnZQL._AC_US218_.jpg",
  },
  {
    brandname: "licb",
    brand: "us store",
    price: 8558,
    cutprice: 9467,
    name: "Turtle Beach Stealth 600 Gen 2 Wireless Gaming",
    image: "https://m.media-amazon.com/images/I/61iHiW114KL._AC_US218_.jpg",
  },
  {
    brandname: "amazon",
    brand: "us store",
    price: 9467,
    cutprice: 10466,
    name: "JBL FLIP 4 - Waterproof Portable Bluetooth",
    image: "https://m.media-amazon.com/images/I/61d5F64UDpL._AC_US218_.jpg",
  },
  {
    brandname: "enegizer",
    brand: "us store",
    price: 16739,
    cutprice: 13105,
    name: "Ring Video Doorbell 3–enhanced wifi,v",
    image: "https://m.media-amazon.com/images/I/71v6fiYWE5L._AC_US218_.jpg",
  },
  {
    brandname: "ailun",
    brand: "us store",
    price: 14740,
    cutprice: 16739,
    name: "Xbox Elite Series 2 Controller – Black",
    image: "https://m.media-amazon.com/images/I/71F6eID-ImL._AC_US218_.jpg",
  },
  {
    brandname: "enegizer",
    brand: "us store",
    price: 5525,
    cutprice: 6745,
    name: "Logitech C920S HD Pro Webcam, Full HD",
    image: "https://m.media-amazon.com/images/I/61-6uAf8soL._AC_US218_.jpg",
  },
  {
    brandname: "ailun",
    brand: "us store",
    price: 13696,
    cutprice: 16736,
    name: "Sceptre 27-Inch FHD LED Gaming Monitor",
    image: "https://m.media-amazon.com/images/I/61FYOyYCg1S._AC_US218_.jpg",
  },
  {
    brandname: "oculus",
    brand: "us store",
    price: 16649,
    cutprice: 23010,
    name: "New Apple AirPods Pro",
    image: "https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_US218_.jpg",
  },
  {
    brandname: "ailun",
    brand: "us store",
    price: 27553,
    cutprice: 30000,
    name: "Oculus Quest 2 — Advanced All-In-One",
    image: "https://m.media-amazon.com/images/I/615YaAiA-ML._AC_US218_.jpg",
  },
  {
    brandname: "oculus",
    brand: "us store",
    price: 18467,
    cutprice: 25735,
    name: "Bose QuietComfort Noise Cancelling",
    image: "https://m.media-amazon.com/images/I/61j9RdOsJwL._AC_US218_.jpg",
  },
  {
    brandname: "nintendo",
    brand: "us store",
    price: 14740,
    cutprice: 16739,
    name: "Xbox Elite Series 2 Controller – Black",
    image: "https://m.media-amazon.com/images/I/71F6eID-ImL._AC_US218_.jpg",
  },
  {
    brandname: "enegizer",
    brand: "us store",
    price: 39939,
    cutprice: 40000,
    name: "Oculus Quest 2 — Advanced All-In-One Virtual Reality Headset — 256 GB",
    image: "https://m.media-amazon.com/images/I/61kwRNPtMpL._AC_US218_.jpg",
  },
  {
    brandname: "amazon",
    brand: "us store",
    price: 54811,
    cutprice: 56000,
    name: "DJI Mini 2 Fly More Combo – Ultralight Foldable Drone, 3-Axis Gimbal with 4K ...",
    image: "https://m.media-amazon.com/images/I/71wfsfmD-UL._AC_US218_.jpg",
  },
  {
    brandname: "amazon basics",
    brand: "us store",
    price: 33094,
    cutprice: 45015,
    name: "TCL 50-inch Class 4-Series 4K UHD Smart Roku LED TV - 50S435, 2021 Model",
    image: "https://m.media-amazon.com/images/I/71wJCiFPrfL._AC_US218_.jpg",
  },
  {
    brandname: "apple",
    brand: "us store",
    price: 43907,
    cutprice: 50260,
    name: "Apple AirPods Max - Space Gray",
    image: "https://m.media-amazon.com/images/I/81jqUPkIVRL._AC_US218_.jpg",
  },
  {
    brandname: "amazon basics",
    brand: "us store",
    price: 45634,
    cutprice: 54901,
    name: "VIZIO 65-Inch V-Series 4K UHD LED HDR Smart TV with Apple AirPlay",
    image: "https://m.media-amazon.com/images/I/81ii3VScCbL._AC_US218_.jpg",
  },
  {
    brandname: "amazon",
    brand: "us store",
    price: 72619,
    cutprice: 76707,
    name: "Acer Nitro 5 AN515-55-53E5 Gaming Laptop | Intel Core i5-10300H | NVIDIA GeForce ...",
    image: "https://m.media-amazon.com/images/I/71m03KItMZL._AC_US218_.jpg",
  },
  {
    brandname: "ailun",
    brand: "us store",
    price: 92607,
    cutprice: 100000,
    name: "CYBERPOWERPC Gamer Xtreme VR Gaming PC, Intel Core i5-11400F 2.6GHz, 8GB DDR4",
    image: "https://m.media-amazon.com/images/I/81Wx7hw9vwL._AC_US218_.jpg",
  },
  {
    brandname: "amazon basics",
    brand: "us store",
    price: 61988,
    cutprice: 65000,
    name: "SAMSUNG 65-Inch Class Crystal UHD AU8000 Series - 4K UHD HDR Smart TV",
    image: "https://m.media-amazon.com/images/I/81Wx7hw9vwL._AC_US218_.jpg",
  },
  {
    brandname: "amazon",
    brand: "us store",
    price: 118821,
    cutprice: 127509,
    name: "SAMSUNG 49-inch Odyssey G9 Gaming Monitor | QHD, 240hz, 1000R Curved, QLED",
    image: "https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_US218_.jpg",
  },
  {
    brandname: "amazon basics",
    brand: "us store",
    price: 91155,
    cutprice: 94155,
    name: "Meeting Owl Pro - 360-Degree, 1080p HD Smart Video Conference Camera",
    image: "https://m.media-amazon.com/images/I/91-o+984YvL._AC_US218_.jpg",
  },
];
// value(indexfors);
displayTable(database);
function displayTable(database) {
  document.querySelector("#inputfromdata").textContent = "";
  database.map(function (elem, index) {
    var div1 = document.createElement("div");
    div1.setAttribute("class", "mainprojectdiv");
    var imgdiv2 = document.createElement("div");
    imgdiv2.setAttribute("class", "imagediv");
    var image = document.createElement("img");
    image.setAttribute("class", "forimageofpro");
    image.setAttribute("src", elem.image);
    imgdiv2.append(image);

    var belowimgdiv3 = document.createElement("div");
    belowimgdiv3.setAttribute("class", "belowimagetag");
    var brandnamehere = document.createElement("p");
    brandnamehere.setAttribute("class", "brandnametag");
    brandnamehere.textContent = elem.brand;
    var productname = document.createElement("p");
    productname.setAttribute("class", "productnametag");
    productname.textContent = elem.name;
    belowimgdiv3.append(brandnamehere, productname);

    var finaldiv4 = document.createElement("div");

    var pricewithlogo = document.createElement("div");
    pricewithlogo.setAttribute("class", "priceandlogo");

    var pricediv5 = document.createElement("div");
    pricediv5.setAttribute("class", "pricedivtag");

    var mainprice = document.createElement("p");
    mainprice.setAttribute("class", "discountprice");
    mainprice.textContent = elem.price;
    var cutprice = document.createElement("p");
    cutprice.setAttribute("class", "originalprice");
    cutprice.textContent = elem.cutprice;
    var logoofubuy = document.createElement("img");
    logoofubuy.setAttribute("class", "logoimageubuy");
    logoofubuy.setAttribute(
      "src",
      "https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/fulfilled.png"
    );
    var ubuylogo = document.createElement("div");
    ubuylogo.append(logoofubuy);
    pricediv5.append(mainprice, cutprice);
    pricewithlogo.append(pricediv5, ubuylogo);
    var containerdiv = document.createElement("div");
    containerdiv.setAttribute("class", "outterlayer");
    var atag = document.createElement("a");
    atag.style.textDecoration = "none";
    atag.addEventListener("click", function () {
      if (p.style.color == "red") {
        p.style.color = "gray";
      } else {
        p.style.color = "red";
      }
      console.log(index);
    });
    atag.setAttribute("href", "#");
    atag.setAttribute("class", "a-for-heart");
    var p = document.createElement("button");
    p.setAttribute("class", "buttonforheart");
    p.innerHTML = ' <i class="fas fa-heart"></i>';
    atag.append(p);
    var divforbutton = document.createElement("div");
    divforbutton.setAttribute("class", "divforbutton");
    divforbutton.append(atag);
    div1.append(imgdiv2, belowimgdiv3, pricewithlogo);
    containerdiv.append(divforbutton, div1);
    div1.addEventListener("click", function () {
      console.log(elem, index);
      var k = index;
      var valueforproduct = {
        brand: elem.brand,
        name: elem.name,
        price: elem.price,
        cutprice: elem.cutprice,
        image: elem.image,
      };
      indexfors.push(valueforproduct);
      localStorage.setItem("indexvalue", JSON.stringify(indexfors));
      window.location.href = "addtocart.html";
    });

    document.querySelector("#inputfromdata").append(containerdiv);
  });
}

function priceofp(event) {
  var kokain = document.querySelector("price-rangecat").value;
  console.log(kokain);
}

var k = document.querySelector("#price-rangecat").value;
console.log(k);

document.getElementById("price1").addEventListener("click", check1);
function check1() {
  var arr = database;
  var arr = arr.filter(function (elem) {
    return elem.price <= 7700;
  });
  displayTable(arr);
}
document.getElementById("price2").addEventListener("click", check2);
function check2() {
  var arr = database;
  var arr = arr.filter(function (elem) {
    return elem.price >= 19250 && elem.price < 38500;
  });
  displayTable(arr);
}
document.getElementById("price3").addEventListener("click", check3);
function check3() {
  var arr = database;
  var arr = arr.filter(function (elem) {
    return elem.price >= 38500 && elem.price < 77000;
  });
  displayTable(arr);
}
document.getElementById("price4").addEventListener("click", check4);
function check4() {
  var arr = database;
  var arr = arr.filter(function (elem) {
    return elem.price >= 77000;
  });
  displayTable(arr);
}

document.getElementById("brand10").addEventListener("click", apple);
function apple() {
  //  console.log(database.length);
  var arr = database;
  // console.log(arr);
  var arr = arr.filter(function (elem) {
    console.log(elem);
    var temp1 = elem.brandname;
    // console.log(item.brandname);
    var value = document.getElementById("brand10").value;

    for (var i = 0; i < arr.length; i++) {
      if (value == temp1) {
        return elem;
      }
    }
  });
  console.log(arr);
  displayTable(arr);
}
document.getElementById("brand20").addEventListener("click", amazon);
function amazon() {
  var arr = database;
  // console.log(arr);
  var arr = arr.filter(function (elem) {
    console.log(elem);
    var temp1 = elem.brandname;
    var value = document.getElementById("brand20").value;
    for (var i = 0; i < arr.length; i++) {
      if (value == temp1) {
        return elem;
      }
    }
  });
  console.log(arr);
  displayTable(arr);
}
document.getElementById("brand30").addEventListener("click", oculus);
function oculus() {
  var arr = database;
  // console.log(arr);
  var arr = arr.filter(function (elem) {
    console.log(elem);
    var temp1 = elem.brandname;
    var value = document.getElementById("brand30").value;
    for (var i = 0; i < arr.length; i++) {
      if (value == temp1) {
        return elem;
      }
    }
  });
  console.log(arr);
  displayTable(arr);
}
document.getElementById("brand40").addEventListener("click", amazonbasics);
function amazonbasics() {
  var arr = database;
  // console.log(arr);
  var arr = arr.filter(function (elem) {
    console.log(elem);
    var temp1 = elem.brandname;
    var value = document.getElementById("brand40").value;
    for (var i = 0; i < arr.length; i++) {
      if (value == temp1) {
        return elem;
      }
    }
  });
  console.log(arr);
  displayTable(arr);
}
document.getElementById("brand50").addEventListener("click", ailun);
function ailun() {
  var arr = database;
  // console.log(arr);
  var arr = arr.filter(function (elem) {
    console.log(elem);
    var temp1 = elem.brandname;
    var value = document.getElementById("brand50").value;
    for (var i = 0; i < arr.length; i++) {
      if (value == temp1) {
        return elem;
      }
    }
  });
  console.log(arr);
  displayTable(arr);
}
document.getElementById("brand60").addEventListener("click", licb);
function licb() {
  var arr = database;
  // console.log(arr);
  var arr = arr.filter(function (elem) {
    console.log(elem);
    var temp1 = elem.brandname;
    var value = document.getElementById("brand60").value;
    for (var i = 0; i < arr.length; i++) {
      if (value == temp1) {
        return elem;
      }
    }
  });
  console.log(arr);
  displayTable(arr);
}
document.getElementById("brand70").addEventListener("click", enegizer);
function enegizer() {
  var arr = database;
  // console.log(arr);
  var arr = arr.filter(function (elem) {
    console.log(elem);
    var temp1 = elem.brandname;
    var value = document.getElementById("brand70").value;
    for (var i = 0; i < arr.length; i++) {
      if (value == temp1) {
        return elem;
      }
    }
  });
  console.log(arr);
  displayTable(arr);
}
