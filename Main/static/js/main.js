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

        var timeTaken = journeyTime($('#pac-home').val(),$('#pac-work').val())
        $.post("/getText",{
            timeTaken: text
        })
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
    function journeyTime(origin,destination){

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
      };
      directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(result);
            return result.routes["0"].legs["0"].duration.text;
          }
        });
    }


});