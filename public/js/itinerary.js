//var map_canvas_obj = document.getElementById('map-canvas');
var xButton = '<button class="btn btn-xs btn-danger remove btn-circle">x</button>';
var itineraryItemDiv = '<div class="itinerary-item"><span class="title">';

$(document).ready(function() {

    $('#hotelbtn').click(function(){
        var hotelName = $(this).siblings('select').val();
        var hotelDiv = itineraryItemDiv + hotelName + '</span>' + xButton + '</div>';
        $("#hotels").html(hotelDiv);
    
        //get hotel location from name
        var thisHotel = all_hotels.find(function(hotel){
            return hotel.name === hotelName;
        });
        var location = thisHotel.place[0].location;
        //draw it on the map
        
        //Remove the previous hotel marker:
        if (markers.length > 0) {
            //find hotel marker (as opposed to other types of markers)
            var oldHotelMarker = markers.find(function(marker){
                return marker.icon === '/images/lodging_0star.png';
            });
            //console.dir(oldHotelMarker);
            if (oldHotelMarker) {
                var index = markers.indexOf(oldHotelMarker);            
                markers[index].setMap(null);
                markers.splice(index,1); //remove marker from markers
            }
        }

        drawLocation(location, {
            icon: '/images/lodging_0star.png',
            title: hotelName
        })
    

    });

    $('#restaurantbtn').click(function(){
        var restaurantName = $(this).siblings('select').val();
        var restaurantDiv = itineraryItemDiv + restaurantName + '</span>' + xButton + '</div>';
        $("#restaurants").append(restaurantDiv);

        //get restaurant location from name
        var thisRestaurant = all_restaurants.find(function(restaurant){
            return restaurant.name === restaurantName;
        });

        //TODO: don't allow the same restaurant to be added more than once

        var location = thisRestaurant.place[0].location;
        //draw it on the map
        drawLocation(location, {
            icon: '/images/restaurant.png',
            title: restaurantName
        });
    
    });

    $('#activitybtn').click(function(){
        var activityName = $(this).siblings('select').val();
        var activityDiv = itineraryItemDiv + activityName + '</span>' + xButton + '</div>';
        $("#activities").append(activityDiv);

        //get activity location from name
        var thisActivity = all_activities.find(function(activity){
            return activity.name === activityName;
        });

        //TODO: don't allow the same activity to be added more than once

        var location = thisActivity.place[0].location;
        //draw it on the map
        drawLocation(location, {
            icon: '/images/star-3.png',
            title: activityName
        });
    
    });


    $('body').delegate('.remove', 'click', function(){
        //a .remove button's parent is an itinerary-item 
        $(this).parent().remove();

        //TODO: remove corresponding marker from map
        //maybe find a title that matches the span content
    });

});