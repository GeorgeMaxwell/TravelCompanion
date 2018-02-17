$( document ).ready(function() {
    var work = document.getElementById('pac-work');
    var workSearch = new google.maps.places.SearchBox(work);

    var home = document.getElementById('pac-home');
    var homeSearch = new google.maps.places.SearchBox(home);

        
    $("#updateBtn").click(function(){
        alert("Your details have been updated!");
        var geocoder = new google.maps.Geocoder();
        //var ans = geocodeAddress(geocoder,$('#pac-home').val());
        geocodeAddress(geocoder,$('#pac-home').val(), function(search_latlng) {
          console.log(search_latlng);

        });
       geocodeAddress(geocoder,$('#pac-work').val(), function(search_latlng) {
            console.log(search_latlng);

        });
        //console.log(ans);
        //console.log(homeSearch.getBounds());
    });

    function geocodeAddress(geocoder,address, callback) {

        var latlng = new Array(2);

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latlng[0] = results[0].geometry.location.lat();
                latlng[1] = results[0].geometry.location.lng();
                callback(latlng); // call the callback function here
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }

});