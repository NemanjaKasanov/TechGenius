var cart = JSON.parse(localStorage.getItem("cart"));

window.onload = function(){
    document.getElementById("buyButton").addEventListener("click", function(){
        event.preventDefault();

        if(!cart || !cart.length){
            document.getElementById("cannotBuy").style.display = "block";
        }
        else{
            document.getElementById("cannotBuy").style.display = "none";

            localStorage.removeItem("cart");
            displayCartIsEmpty();

            window.open("buy.html");
        }
    });

    document.getElementById("clearCart").addEventListener("click", function(){
        event.preventDefault();

        localStorage.removeItem("cart");
        displayCartIsEmpty();
    });

    if(!cart || !cart.length){
        displayCartIsEmpty();
    }
    else{
        displayFullCart();
    }

}

function removeFromCart(id){
    let devices = cart;
    let returnArray = devices.filter(device => device.id != id);

    localStorage.setItem("cart", JSON.stringify(returnArray));

    if(cart == []){
        localStorage.removeItem("cart");
    }

    event.preventDefault();
    location.reload();
    displayFullCart();
}

function displayFullCart(){
    let devices = cart;
    let toShow = [];

    $.ajax({
        url: "data/devices.json",
        success: function(data){
            toShow = data.filter(device => {
                for(let deviceInCart of devices){
                    if(device.id == deviceInCart.id){
                        device.quantity = deviceInCart.quantity;
                        return true;
                    }
                }
                return false;
            });

            displayDevicesInCart(toShow);
        },
        error: function(err){
            console.error(err);
        }
    });
}

function displayCartIsEmpty(){
    let ispis = "";

    ispis += `
        <p class="text-center h2">Your cart is empty,</p>
        <p class="text-center h3">visit the <a href="store.html" alt="Store" class="underline">STORE</a> page to fill it up.</p>
    `;

    ispis += `
        <div class="col-12 mt-5">
            <div class="about_draw wow fadeInUp text-center" data-wow-duration=".7s" data-wow-delay=".5s">
                <img src="img/ilstrator_img/draw.png" alt="Cart" class="img-fluid">
            </div>
        </div>
    `;

    document.getElementById("cartProducts").innerHTML = ispis;
    document.getElementById("totalPrice").innerHTML = "0.00";
}

function displayDevicesInCart(devices){
    let display = "";
    let price = 0;

    devices.forEach(function(device){
        display += `
            <div class="cartProduct col-12 d-flex align-items-center justify-content-center flex-wrap pb-4 mt-2">
                <div class="cartProductImage text-center col-lg-4 col-md-4 col-sm-12 mb-2 mt-4 d-flex justify-content-center align-items-center">
                    <img src="img/devices/${device.image.url}" alt="${device.image.alt}" class="img-fluid cartProductsImg"/>
                </div>
                <div class="cartProductText col-lg-4 col-md-4 col-sm-12 mt-3">
                    <p class="h3">${device.brandName}</p>
                    <p class="h2"><strong>${device.model}</strong></p>
                    <ul class="h5">`;
                    
        device.char.forEach(function(ch){
            display += `<li>${ch.name}: <strong>${ch.value}</strong></li>`;
        });

        display += `</ul>
                    <p class="h4">In cart: <span class="numberInCart">${device.quantity}</span></p>
                    <p class="h3"><strong>$${device.price}</strong></p>
                    <a href="#" class="genric-btn primary-border small mt-1 removeItemFromCartBtn" onClick="removeFromCart(${device.id})">Remove from cart</a>
                </div>
            </div>
        `;

        timesInCart = device.quantity;

        price += device.price * timesInCart;
        document.getElementById("cartProducts").innerHTML = display;
    });

    localStorage.setItem("price", JSON.stringify(price));
    document.getElementById("totalPrice").innerHTML = price.toFixed(2);
}
