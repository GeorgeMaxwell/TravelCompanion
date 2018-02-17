$( document ).ready(function() {
    var work = document.getElementById('pac-work');
    var workSearch = new google.maps.places.SearchBox(work);

    var home = document.getElementById('pac-home');
    var homeSearch = new google.maps.places.SearchBox(home);

    $("#updateBtn").click(function(){
        alert("Your details have been updated!");
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder);
        //console.log(homeSearch.getBounds());
    });

    function geocodeAddress(geocoder) {
        var address = $('#pac-home').val();
        alert(address)
        geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location.lat())
            console.log(results[0].geometry.location.lng())
            //var latitude = results[0].geometry.location.latitude;
            //var longitude = results[0].geometry.location.longitude;
            //alert(latitude);
            }

        else {
            alert("ERROR!")
        }
    });
    }

});
