//var map_canvas_obj = document.getElementById('map-canvas');
var xButton = '<button class="btn btn-xs btn-danger remove btn-circle">x</button>';
var itineraryItemDiv = '<div class="itinerary-item"><span class="title">';

$(document).ready(function() {

    $('#hotelbtn').click(function(){
        var hotelName = $(this).siblings('select').val();
        var hotelDiv = itineraryItemDiv + hotelName + '</span>' + xButton + '</div>';
        $("#hotels").html(hotelDiv);
    
        //get hotel location from name
        var thisHotel = all_hotels.filter(function(hotel){
            return hotel.name === hotelName;
        })[0];
        var location = thisHotel.place[0].location;
        //draw it on the map
        marker.setMap(null);
        drawLocation(location, {
            icon: '/images/lodging_0star.png'
        })
        //TODO: only allow one hotel to be added at a time
    
    });

    $('#restaurantbtn').click(function(){
        var restaurantName = $(this).siblings('select').val();
        var restaurantDiv = itineraryItemDiv + restaurantName + '</span>' + xButton + '</div>';
        $("#restaurants").append(restaurantDiv);

        //get hotel location from name
        var thisRestaurant = all_restaurants.filter(function(restaurant){
            return restaurant.name === restaurantName;
        })[0];
        var location = thisRestaurant.place[0].location;
        //draw it on the map
        drawLocation(location, {
            icon: '/images/restaurant.png'
        });
    
    });

    $('#activitybtn').click(function(){
        var activityName = $(this).siblings('select').val();
        var activityDiv = itineraryItemDiv + activityName + '</span>' + xButton + '</div>';
        $("#activities").append(activityDiv);

        //get hotel location from name
        var thisActivity = all_activities.filter(function(activity){
            return activity.name === activityName;
        })[0];
        var location = thisActivity.place[0].location;
        //draw it on the map
        drawLocation(location, {
            icon: '/images/star-3.png'
        });
    
    });

});