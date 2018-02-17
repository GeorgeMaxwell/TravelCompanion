$( document ).ready(function() {
    var work = document.getElementById('pac-work');
    var workSearch = new google.maps.places.SearchBox(work);

    var home = document.getElementById('pac-home');
    var homeSearch = new google.maps.places.SearchBox(home);

    $("#updateBtn").click(function(){
        alert("Your details have been updated!");
    });

});
