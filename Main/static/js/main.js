$( document ).ready(function() {
    var work = document.getElementById('pac-work');
    var workSearch = new google.maps.places.SearchBox(work);

    var home = document.getElementById('pac-home');
    var homeSearch = new google.maps.places.SearchBox(home);

    var homeCoordsLat = "";
    var homeCoordsLng = "";
    var workCoordsLat = "";
    var workCoordsLng = "";
	
	var mot;
	var transportMethod  = $('#mot').val();

	var tubeLine
	var roadPath
	
	$("#mot").on('change', function(){
        transportMethod = $(this).val();
        console.log($(this).val())
    });


    $("#updateBtn").click(function(){
        alert("Your details have been updated!");
        var geocoder = new google.maps.Geocoder();
        //var ans = geocodeAddress(geocoder,$('#pac-home').val());
        geocodeAddress(geocoder,$('#pac-home').val(), function(search_latlng) {
            homeCoordsLat = search_latlng[0]
            homeCoordsLng = search_latlng[1]
        });

        geocodeAddress(geocoder,$('#pac-work').val(), function(search_latlng) {
            workCoordsLat = search_latlng[0]
            workCoordsLng = search_latlng[1]
        });
		
		if (transportMethod=="DRIVING") {
            traffic()
            console.log(roadPath)
        }
        else {
            delays()
        }

        journeyTime($('#pac-home').val(),$('#pac-work').val(), function(search_timetaken) {
            var phoneNumber = $("#pac-number").val()

            $('input[type=checkbox]:checked').each(function(index){
                console.log(phoneNumber)
                console.log($(this).val())
                console.log($(this).closest('td').next('td').find('input').val())
                console.log(homeCoordsLat)
                console.log(homeCoordsLng)
                console.log(workCoordsLat)
                console.log(workCoordsLng)
                console.log("________________")
                $.post("/addJourney", {
                    phone: phoneNumber,
                    journeyDay: $(this).val(),
                    journeyArriveTime: $(this).closest('td').next('td').find('input').val(),
                    homeLat: homeCoordsLat,
                    homeLng: homeCoordsLng,
                    workLat: workCoordsLat,
                    workLng: workCoordsLng

            	},
            	function(data) {
            	});
            });
            /*
            $.post("/sendText", {
                timeTaken: search_timetaken,
                phone: $("#pac-number").val()
        	},
        	function(data) {
        	    alert("Test")
        	});*/
        });

        /*var timeTaken = journeyTime($('#pac-home').val(),$('#pac-work').val())
        alert(timeTaken)
        $.post("/sendText", {
            time: timeTaken
    	},
    	function(data) {
    	    alert("Test")
    	});*/
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
    function journeyTime(origin,destination, callback){

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var request = {
        origin: origin,
        destination: destination,
        travelMode: transportMethod
      };
      directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(result);
			roadPath = result.routes["0"].summary;
            console.log(result)
            callback(result.routes["0"].legs["0"].duration.text)
            //return result.routes["0"].legs["0"].duration.text;
          }
        });
    }

	function traffic(){
        $.ajax({
            type: 'GET',
            url: 'https://api.tfl.gov.uk/Road/'+roadPath+'/Disruption?app_id=726a9716&app_key=443f7f792eb857c6b6c4593a36e38069',
            dataType: 'json',
            success: function(data){
                $.each(data, function(key, value){
                    var comments = value.comments;
                    console.log(comments)
                });
            }
        });
    }

    function delays(){
            $.ajax({
                type: 'GET',
                url: 'https://api.tfl.gov.uk/Line/Mode/tube/Disruption?app_id=726a9716&app_key=443f7f792eb857c6b6c4593a36e38069',
                dataType: 'json',
                success: function(data){
                    $.each(data, function(key, value){
                        var comments = value.description;
                        console.log(comments)
                    });
                }
            });
        }

});
