//var map_canvas_obj = document.getElementById('map-canvas');
var xButton = '<button class="btn btn-xs btn-danger remove btn-circle">x</button>';
var itineraryItemDiv = '<div class="itinerary-item"><span class="title">';

$(document).ready(function() {

    $('#hotelbtn').click(function(){
        var hotelName = $(this).siblings('select').val();
        var hotelDiv = itineraryItemDiv + hotelName + '</span>' + xButton + '</div>';
        $("#hotels").append(hotelDiv);
    
        //get hotel location from name
        var thisHotel = all_hotels.filter(function(hotel){
            return hotel.name === hotelName;
        })[0];
        var location = thisHotel.place[0].location;
        //draw it on the map
        drawLocation(location, {
            icon: '/images/lodging_0star.png',
        })
        //TODO: only allow one hotel to be added at a time
    
    });



});