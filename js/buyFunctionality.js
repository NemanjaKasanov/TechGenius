window.onload = function(){
    
    //SHOW PRICE
    var price = JSON.parse(localStorage.getItem("price"));
    document.getElementById("price").innerHTML = price.toFixed(2);

    //HIDE
    document.getElementById("emailHelpRed").style.display = "none";
    document.getElementById("nameHelpRed").style.display = "none";
    document.getElementById("addressHelpRed").style.display = "none";
    document.getElementById("cityHelpRed").style.display = "none";
    document.getElementById("stateHelpRed").style.display = "none";
    document.getElementById("zipHelpRed").style.display = "none";
    document.getElementById("visaPaymentRed").style.display = "none";
    document.getElementById("paypalHelpRed").style.display = "none";
    document.getElementById("underButtonPopup").style.display = "none";

    //RADIO BUTTONS - PAYMENT METHOD SWITCH
    document.getElementById("visaPaymentWin").style.display = "none";
    document.getElementById("paypalPaymentWin").style.display = "none";
    
    document.addEventListener("click", paypal);
    document.addEventListener("click", visa);

    function paypal(){
        if(document.getElementById("radio1").checked == true){
            document.getElementById("paypalPaymentWin").style.display = "block";
            document.getElementById("visaPaymentWin").style.display = "none";
        }
    }
    function visa(){
        if(document.getElementById("radio2").checked == true){
            document.getElementById("visaPaymentWin").style.display = "block";
            document.getElementById("paypalPaymentWin").style.display = "none";
        }
    }

    //VALIDATIONS
    let switchName = 0;
    let switchEmail = 1;
    let switchAddress = 2;
    let switchCity = 3;
    let switchState = 4;
    let switchZip = 5;
    let switchPaypal = 6;
    let switchVisa = 7;

    var switchArray = [];

    let regexName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let elementAddressName = document.getElementById("nameLastname");
    let problemName = document.getElementById("nameHelpRed");
    document.getElementById("nameLastname").addEventListener("blur", function(){
        regexCheck(regexName, elementAddressName, problemName, switchName);
    });

    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let elementAddressEmail = document.getElementById("email");
    let problemEmail = document.getElementById("emailHelpRed");
    document.getElementById("email").addEventListener("blur", function(){
        regexCheck(regexEmail, elementAddressEmail, problemEmail, switchEmail);
    });
    
    let regexAddress = /^[A-Z][a-z]{1,50}\s([A-Z][a-z]{1,50}\s)*[0-9]{1,4}$/;
    let elementAddressAddress = document.getElementById("address");
    let problemAddress = document.getElementById("addressHelpRed");
    document.getElementById("address").addEventListener("blur", function(){
        regexCheck(regexAddress, elementAddressAddress, problemAddress, switchAddress);
    });

    let regexCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    let elementAddressCity = document.getElementById("city");
    let problemCity = document.getElementById("cityHelpRed");
    document.getElementById("city").addEventListener("blur", function(){
        regexCheck(regexCity, elementAddressCity, problemCity, switchCity);
    });

    let elementAddressState = document.getElementById("state");
    let problemState = document.getElementById("stateHelpRed");
    document.getElementById("state").addEventListener("blur", function(){
        regexCheck(regexCity, elementAddressState, problemState, switchState);
    });

    let regexZip = /^[0-9]{5}$/;
    let elementAddressZip = document.getElementById("zip");
    let problemZip = document.getElementById("zipHelpRed");
    document.getElementById("zip").addEventListener("blur", function(){
        regexCheck(regexZip, elementAddressZip, problemZip, switchZip);
    });
    
    let elementAddressPaypal = document.getElementById("paypalPayment");
    let problemPaypal = document.getElementById("paypalHelpRed");
    document.getElementById("paypalPayment").addEventListener("blur", function(){
        regexCheck(regexEmail, elementAddressPaypal, problemPaypal, switchPaypal);
    });

    let regexVisa = /^[0-9]{16}$/;
    let elementAddressVisa = document.getElementById("visaPayment");
    let problemVisa = document.getElementById("visaPaymentRed");
    document.getElementById("visaPayment").addEventListener("blur", function(){
        regexCheck(regexVisa, elementAddressVisa, problemVisa, switchVisa);
    });

    function regexCheck(regex, address, problem, switchNum){
        addressValue = address.value;
    
        if(regex.test(addressValue)){
            address.style.border = "1px solid blue";
            problem.style.display = "none";
            switchArray[switchNum] = true;
        }
        else{
            address.style.border = "1px solid red";
            problem.style.display = "block";
            switchArray[switchNum] = false;
        }
    }

    document.getElementById("btnSubmit").addEventListener("click", function(){
        event.preventDefault();

        if(switchArray[0] == true && switchArray[1] == true && switchArray[2] == true && switchArray[3] == true && switchArray[4] == true && switchArray[5] == true){
            if(switchArray[6] == true || switchArray[7] == true){
                let date = new Date();
                const addDays = 2;
                date.setDate(date.getDate() + addDays);
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                document.getElementById("formDisplay").innerHTML = `
                <div class="text-center m-5 pt-5 pb-5" id="purchaseFinished">
                    <p class="h2">
                        <i class="fa fa-check-circle-o h1 text-primary" aria-hidden="true"></i></br>
                        Thank you for your purchase!
                    </p>
                    <p class="h7">Billed: $${JSON.parse(localStorage.getItem("price")).toFixed(2)}</p>
                    <p class="h6">
                        You can expect the order at your address</br>
                        on ${day + ". " + month + ". " + year}.
                    </p>
                    <p class="h7">If any problems occur please contact our customer service.</p>
                </div>`;

                location.href = "#pageNameBig";
            }
            else{
                document.getElementById("underButtonPopup").style.display = "block";
            }
        }
        else{
            document.getElementById("underButtonPopup").style.display = "block";
        }
    });

}
