window.onload = function(){
    $.ajax({
        url: "data/devices.json",
        success: function(data){
            var array = data.filter(function(device){
                if(device.rank == 1){
                    return true;
                }
            });
            
            let ispis = "";

            array.forEach(function(device){
                ispis += `
                    <div class="single_prising text-center wow fadeInUp col-lg-4 col-sm-12" data-wow-duration=".7s" data-wow-delay=".8s">
                        <div class="prising_header d-flex justify-content-around col-12">
                            <h3>Brand:</h3>
                            <span>${device.brandName}</span>
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="img/devices/${device.image.url}" alt="${device.brandName}" class="text-center img-fluid m-4 brandImage"/>
                        </div>
                        <div class="prising_bottom">
                            <a href="store.html" class="get_now prising_btn">Get Now</a>
                        </div>
                    </div>
                `;
            });

            document.getElementById("brandsDisplay").innerHTML = ispis;
        },
        error: function(err){
            console.error(err);
        }
    });
}