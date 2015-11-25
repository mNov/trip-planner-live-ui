
// var dailyItinerary = {
//     dayOne {
//         hotels [],
//         rest [],
//         activity []
//     },
//     dayTwo {

//     }
// };

function buildMap() {
    return {
        hotels : null,
        restaurants: new Set(),
        activity: new Set()
    }
}

function addItineraryItem(name, itinType) { //e.g. 'Hotel 91', 'hotels'
    var xButton = '<button class="btn btn-xs btn-danger remove btn-circle">x</button>';
    var itineraryItemDiv = '<div class="itinerary-item"><span class="title">';
    if(name) {
        var thisDiv = itineraryItemDiv + name + '</span>' + xButton + '</div>';
        
        //"relatedButton" is what we want to add the list item to
        var relatedButton = $('#' + itinType);
        if(itinType === 'hotels')
            relatedButton.html(thisDiv);
        else
            relatedButton.append(thisDiv);
    }

}

var dailyItinerary = {
    1: buildMap()
};
var dayNumber = Number($('.current-day').text());

$(document).ready(function() {

    $('#hotelbtn').click(function(){
       

        var hotelName = $(this).siblings('select').val();
        dailyItinerary[dayNumber].hotels = hotelName;


        var itinType = 'hotels';
        addItineraryItem(hotelName, itinType);
        

        // var hotelDiv = itineraryItemDiv + hotelName + '</span>' + xButton + '</div>';
        // $("#hotels").html(hotelDiv);
    
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

        console.log(dailyItinerary);
    

    });

    $('#restaurantbtn').click(function(){
        var restaurantName = $(this).siblings('select').val();
        dailyItinerary[dayNumber].restaurants.add(restaurantName);


        var itinType = 'restaurants';
        addItineraryItem(restaurantName, itinType);

        // var restaurantDiv = itineraryItemDiv + restaurantName + '</span>' + xButton + '</div>';
        // $("#restaurants").append(restaurantDiv);


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
        console.log(dailyItinerary);
    });

    $('#activitybtn').click(function(){
        var activityName = $(this).siblings('select').val();
        dailyItinerary[dayNumber].activity.add(activityName);


        var itinType = 'activities';
        addItineraryItem(activityName, itinType);


        // var activityDiv = itineraryItemDiv + activityName + '</span>' + xButton + '</div>';
        // $("#activities").append(activityDiv);


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
        console.log(dailyItinerary);
    
    });


    $('body').delegate('.remove', 'click', function(){
        //a .remove button's parent is an itinerary-item 
        var title = $(this).siblings('span').text();
        console.log(title);
        var oldMarker = markers.find(function(marker) {
            return title === marker.title;
        })
        if (oldMarker) {
                var index = markers.indexOf(oldMarker);            
                markers[index].setMap(null);
                markers.splice(index,1); //remove marker from markers
            }
        $(this).parent().remove();

    });

    // delegate -- add a day
    $('body').delegate('#plusBtn', 'click', function(){
        var dayButtons = $(this).parent();
        var dayButtonLength = dayButtons.children().length;
        console.log(dayButtons);
        dayButtons.append('<button class="btn btn-circle day-btn">' + dayButtonLength + '</button>');
        dailyItinerary[dayButtonLength] = buildMap();
    });

    // on click -- switch current day
    $('body').on('click','.day-btn', function(){
       $(this).siblings('.current-day').removeClass('current-day');
       $(this).addClass('current-day');
       $('#dayNumber').text($(this).text());
       dayNumber = Number($('.current-day').text());



        var thisDaysItinerary = dailyItinerary[dayNumber];
        var currentHotel = thisDaysItinerary.hotels;
        var currentRestaurants = thisDaysItinerary.restaurants;
        var currentActivities = thisDaysItinerary.activity;

        $('#hotels').empty();
        addItineraryItem(currentHotel, 'hotels');

       $('#restaurants').empty();
       //TODO: add all restaurants here
       
       $('#activities').empty();
       //TODO: add all activities here



    });

});