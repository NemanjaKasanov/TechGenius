window.onload = function(){
    $.ajax({
        url: "data/devices.json",
        success: function(data){
            let devices = JSON.stringify(data);
            localStorage.setItem("devices", devices);
            
            let originalArray = JSON.stringify(data);
            localStorage.setItem("originalArray", originalArray);

            var allProducts = JSON.parse(localStorage.getItem("devices"));
        },
        error: function(err){
            console.log(err);
        }
    });
    
    document.getElementById("onCartPopUpOkButton").addEventListener("click", function(){
        event.preventDefault();

        document.getElementById("onCartPopUpBg").style.visibility = "hidden";
    });

}

$(document).ready(function(){

    displayAllProducts();
    selectProducts();

    let ramLocation = $("#filterRamOptions");
    selectByCharacteristicPrint("RAM", ramLocation);
    let storageLocation = $("#filterStorageOptions");
    selectByCharacteristicPrint("Internal memory", storageLocation);
    let batteryLocation = $("#filterBatteryOptions");
    selectByCharacteristicPrint("Battery", batteryLocation);

    $("#selectSorting").change(sortProducts);
    $("#searchBar").keyup(searchFilter);
    
});


//FUNCTIONS

function selectByCharacteristicPrint(filterData, location){
    let ispis = "";

    $.ajax({
        url: "data/devices.json",
        success: function(data){
            let array = [];
            let current;

            data.forEach(function(el){
                el.char.forEach(function(ch){
                    if(ch.name == filterData){
                        current = ch.value;
                        if(!array.includes(current)){
                            array.push(current);
                        }
                    }
                });
            });

            array.sort();

            for(let i = 0; i < array.length; i++){
                ispis += `
                <div class="custom-control custom-radio">
                    <input type="radio" id="${array[i]}" name="checkFilter" class="custom-control-input ${array[i]}" data="${array[i]}"/>
                    <label class="custom-control-label filterProducts" for="${array[i]}"><strong>${array[i]}</strong></label>
                </div>`;
            }

            location.html(ispis);

            // FILTERING FUNCTIONS
            $("#2GB").click(filterProductsByChar);
            $("#4GB").click(filterProductsByChar);
            $("#6GB").click(filterProductsByChar);
            $("#8GB").click(filterProductsByChar);
            
            $("#16GB").click(filterProductsByChar);
            $("#64GB").click(filterProductsByChar);
            $("#128GB").click(filterProductsByChar);
            $("#256GB").click(filterProductsByChar);

            $("#3020mAh").click(filterProductsByChar);
            $("#3070mAh").click(filterProductsByChar);
            $("#3340mAh").click(filterProductsByChar);
            $("#3400mAh").click(filterProductsByChar);
            $("#3500mAh").click(filterProductsByChar);
            $("#3550mAh").click(filterProductsByChar);
            $("#4000mAh").click(filterProductsByChar);
            $("#4030mAh").click(filterProductsByChar);
            $("#4100mAh").click(filterProductsByChar);
            $("#4500mAh").click(filterProductsByChar);
            $("#5260mAh").click(filterProductsByChar);
        },
        error: function(err){
            console.error(err);
        }
    });

}

function filterProductsByChar(){
    let filterParameter = $(this).attr("data");
    let devices = JSON.parse(localStorage.getItem("originalArray"));

    devices.forEach(function(device){
        device.char.forEach(function(ch){
            if(ch.value == filterParameter){
                device.selectBy = true;
            }
        });
    });

    let filteredArray = devices.filter(function(device){
        if(device.selectBy == true){
            return device;
        }
    });

    productsDisplay(filteredArray);
    setLocalStorageArray(filteredArray);
}


function selectProducts(){
    let ispis = `
    <div class="custom-control custom-radio">
        <input type="radio" id="All" name="checkFilter" class="custom-control-input brandSelect" data="All" checked/>
        <label class="custom-control-label filterProducts" for="All"><strong>All</strong></label>
    </div>`;

    $.ajax({
        url: "data/devices.json",
        success: function(data){
            let array = [];
            let current;

            data.forEach(function(device){
                current = device.brandName;
                if(!array.includes(current)){
                    array.push(current);
                }
            });

            for(let i = 0; i < array.length; i++){
                ispis += `
                <div class="custom-control custom-radio">
                    <input type="radio" id="${array[i]}" name="checkFilter" class="custom-control-input brandSelect" data="${array[i]}"/>
                    <label class="custom-control-label filterProducts" for="${array[i]}"><strong>${array[i]}</strong></label>
                </div>`;
            }

            // ispis += `</ul>`;

            $("#selectProducts").html(ispis);

            $(".brandSelect").click(filterProducts);
        },
        error: function(err){
            console.error(err);
        }
    });
}

function filterProducts(){
    let filterName = $(this).attr("data");
    let devices = JSON.parse(localStorage.getItem("originalArray"));

    if(filterName == "All"){
        displayAllProducts();
        $.ajax({
            url: "data/devices.json",
            success: function(data){
                setLocalStorageArray(data);
            },
            error: function(err){
                console.error(err);
            }
        });
    }
    else{
        let filteredArray = devices.filter(d => d.brandName == filterName);
        productsDisplay(filteredArray);
        setLocalStorageArray(filteredArray);
    }

    document.getElementById("selectProducts").selectedIndex = "choose";
}

function searchFilter(){
    let userInput = this.value;

    $.ajax({
        url: "data/devices.json",
        success: function(data){
            let returnArray = data.filter(function(el){
                if(el.model.toLowerCase().indexOf(userInput.trim().toLowerCase()) != -1){
                    return el;
                }
                if(el.brandName.toLowerCase().indexOf(userInput.trim().toLowerCase()) != -1){
                    return el;
                }
            });

            productsDisplay(returnArray);
        },
        error: function(err){
            console.error(err);
        }
    })
}

function displayAllProducts(){
    $.ajax({
        url: "data/devices.json",
        success: function(data){
            productsDisplay(data);
        },
        error: function(err){
            console.error(err);
        }
    });
}

function productsDisplay(data){
    ispis = "";

    data.forEach(function(el){
        ispis += `
        <div class="product col-lg-4 col-md-6 col-sm-12 p-3 mt-3 mb-3">
        <div class="d-flex justify-content-center align-items-center" class="productImageDiv">
            <img src="img/devices/${el.image.url}" alt="${el.image.alt}" class="productImage img-fluid"/>
        </div>
        <div>
            <p class="h3 text-center mt-3 mb-3">${el.brandName}</br><strong>${el.model}</strong></p>
            <ul>`;
            
            el.char.forEach(function(ch){
                ispis += `<li>${ch.name}: <strong>${ch.value}</strong></li>`;
            });

            ispis += 
            `</ul>
            <p class="h1 mt-3">${el.price}$</p>
            <div class="col-12 mt-3 mb-2 text-center">
                <a href="#" class="genric-btn info radius addToCartButton" data-id=${el.id}>
                    Add to Cart <span class="h5"><i class="fa fa-cart-plus" aria-hidden="true"></i></span>
                </a>
            </div>
        </div>
    </div>`;
    });

    document.getElementById("productsDisplay").innerHTML = ispis;
    
    $(".addToCartButton").click(addDeviceToCart);
}

function addDeviceToCart(){
    event.preventDefault();
    document.getElementById("onCartPopUpBg").style.visibility = "visible";

    let deviceId = $(this).data("id");
    console.log(deviceId);

    let devicesInCart = JSON.parse(localStorage.getItem("cart"));

    if(devicesInCart){
        if(deviceAlreadyIn()){
            let devices = JSON.parse(localStorage.getItem("cart"));

            for(let device in devices){
                if(devices[device].id == deviceId){
                    devices[device].quantity++;
                }
            }

            localStorage.setItem("cart", JSON.stringify(devices));
        }
        else{
            let devices = JSON.parse(localStorage.getItem("cart"));

            devices.push({
                id: deviceId,
                quantity: 1
            });

            localStorage.setItem("cart", JSON.stringify(devices));
        }
    }
    else{
        let devices = [];

        devices[0] = {
            id: deviceId,
            quantity: 1
        };

        localStorage.setItem("cart", JSON.stringify(devices))
    }

    function deviceAlreadyIn(){
        return devicesInCart.filter(d => d.id == deviceId).length;
    }
}

function sortProducts(){
    let vrednost = this.value;
    let devices = JSON.parse(localStorage.getItem("devices"));

    if(vrednost == "choose"){
        productsDisplay(devices);
    }
    else if(vrednost == "newest"){
        devices.sort(function(a, b){
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            
            return Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate()) - Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
        });
    }
    else if(vrednost == "oldest"){
        devices.sort(function(a, b){
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            
            return Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate()) - Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
        });
    }
    else if(vrednost == "lowToHigh"){
        devices.sort(function(a, b){
            if(a.price < b.price){
                return -1;
            }
            else if(a.price > b.price){
                return 1;
            }
            else{
                return 0;
            }
        });
    }
    else if(vrednost == "highToLow"){
        devices.sort(function(a, b){
            if(a.price < b.price){
                return 1;
            }
            else if(a.price > b.price){
                return -1;
            }
            else{
                return 0;
            }
        });
    }

    setLocalStorageArray(devices);
    let array = getLocalStorageArray();
    productsDisplay(array);
}

function setLocalStorageArray(data){
    let toString = JSON.stringify(data);
    localStorage.setItem("devices", toString);
}
function getLocalStorageArray(){
    return JSON.parse(localStorage.getItem("devices"));
}