 function navbar (){

    return `
    <div class="navbar">
    <div class="leftdiv">
      <div class="ubuyimg">
        <a href="./index.html"
          ><img
            class="ubuyimg"
            src="https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/header/logo-ubuy.jpg"
            alt="ubuy"
        /></a>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Explore
          <i class="fas fa-angle-down"></i>
        </button>
        <div class="dropdown-content explore">
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-plug"></i> Electronics</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-tshirt"></i> Fashion & Jewellery</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-mobile-alt"></i> Cell Phones & Accessories</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-baby-carriage"></i> Baby & Toddler</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-chair"></i> Home Goods</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-pump-soap"></i> Perfumes & Fragrances</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-hammer"></i> Tools & Home Improvements</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-laptop-house"></i> Office Products</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-mortar-pestle"></i> Beauty & personal care</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-running"></i> Sports & Tools</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-luggage-cart"></i> Luggage and Travel Gear</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-book"></i> Books</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-car"></i> Automotive</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-guitar"></i> Musical Instruments</a
          >
          <a id="main" href="productmainpage.html"
            ><i class="fas fa-cat"></i> Pet Supplies</a
          >
        </div>
      </div>
    </div>
    <div class="mid">
      <div
        id="bold"
        style="color: #c6c8ca; border-right: 1px solid #c6c8ca"
      >
        All
        <i class="fas fa-angle-down"></i>
      </div>
      <span>
        <input
          style="
            width: 350px;
            height: 10px;
            background-color: transparent;
            border: none;
            outline: none;
          "
          type="text"
          placeholder="Search our global search engine for products, categories"
        />
      </span>

      <span class="bold">
        <img
          style="width: 30px"
          src="https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/countries-flag/new-us-icon.png.webp?v=1.0"
          alt="uslogo"
        />US<i class="fas fa-angle-down"></i>
      </span>
      <button
        style="
          background-color: #cccccc;
          border-radius: 50%;
          padding: 6px;
          border: none;
        "
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="rightdiv">
      <!-- <div id="mobileapp"><a href="https://world.ubuy.com/apps/"> <i style="color: #FFB100; margin-left: 15px;" class="fa fa-mobile-alt"></i>
        Get the App</a></div> -->
      <div id="country" class="fontpic">
        <img
          class="countryimg"
          src="https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/header/delivery.svg"
          alt="image"
        />
        <span>
          <select name="" id="nation">
            <option value="">India</option>
            <option value="">Hang Kong</option>
            <option value="">US</option>
            <option value="">UK</option>
          </select>
        </span>
      </div>
      <div id="language">
        <img
          src="https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/header/language.svg"
          alt="globe"
        />
        <span>English</span>
      </div>
      <div id="accountoptions">
        <!-- <img src="	https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/header/user.svg" alt="account"> <i class="fas fa-angle-down"></i>   -->
        <div class="dropdown">
          <button class="dropbtn">
            <img
              src="	https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/header/user.svg"
              alt="account"
            />
            <i class="fas fa-angle-down"></i>
          </button>
          <div class="dropdown-content">
            <h6>Welcome</h6>
            <a href="ubuysigninnew.html"
              ><img
                class="accountimg"
                src="	https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/sign-in.svg"
                alt="login"
              />
              Sign in
            </a>

            <a href="ubuysignupnew.html"
              ><img
                class="accountimg"
                src="	https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/create-account.svg"
                alt="account"
              />
              Create an Account</a
            >

            <a href="cartofitems.html"
              ><img
                class="accountimg"
                src="	https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/my-order.svg"
                alt="orders"
              />
              Your Orders</a
            >

            <a href="cartofitems.html">
              <img
                class="accountimg"
                src="	https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/wishlist.svg"
                alt="wishlist"
              />
              Your Wishlist</a
            >
          </div>
        </div>
      </div>
      <div id="cart">
        <a class="cart" href="cartofitems.html"
          ><img
            src="https://d3ulwu8fab47va.cloudfront.net/skin/frontend/default/ubuycom-v1/images/header/cart-img.svg"
            alt="cart"
        /></a>
      </div>
    </div>
  </div>
    `

}

export default navbar;