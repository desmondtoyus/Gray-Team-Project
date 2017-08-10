var checkIn = sessionStorage.getItem('startDate');
var checkOut = sessionStorage.getItem('endDate');
var days =sessionStorage.getItem('dayOfVisit')
var lat=0;
var log=0;

function destinationLat() {
var geocoder =  new google.maps.Geocoder();
 var state = sessionStorage.getItem('destination');
 var city = sessionStorage.getItem('city');
var locSearch= city+'+'+state+', us';
    geocoder.geocode( { 'address': locSearch}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
            lat = results[0].geometry.location.lat();
            log = results[0].geometry.location.lng();
            sessionStorage.setItem('lat',lat);
            sessionStorage.setItem('log', log);
            hotelAPI();
          } else {
          	//$("#").text("Location error");
            // alert("Something got wrong " + status);
             console.log("invalid");
          }
        });

}


function sourceLat() {
var geocoder =  new google.maps.Geocoder();
 var state = sessionStorage.getItem('stateSource');
 var city = sessionStorage.getItem('citySource');
var locSearch= city+'+'+state+', us';
    geocoder.geocode( { 'address': locSearch}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
            lat = results[0].geometry.location.lat();
            log = results[0].geometry.location.lng();
            sessionStorage.setItem('sourceLat',lat);
            sessionStorage.setItem('sourceLog', log);
            nearestDestinationAirport();
           nearestSourceAirport();
            
          } else {
            //$("#").text("Location error");
            // alert("Something got wrong " + status);
             console.log("invalid");
          }
        });

}



function hotelAPI(){
			console.log(lat);
            console.log(log);
             console.log(checkIn);
            console.log(checkOut);
	var hotelString = 'http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude='+lat+'&longitude='+log+'&radius=5&check_in='+checkIn+'&check_out='+checkOut+'&currency=USD&number_of_results=12&apikey=kGzyspbq8pbK3b4fmrAG9kA4ksR7VA3G';
  $.ajax({
  	url:hotelString,
  	mathod:'GET'
  }).done( function(response){
  	var total =response.results.length;
  	console.log(response);
  	for (i=0; i< total; i++){  
  		var hotelDiv = $("<div>");
  		hotelDiv.addClass("col-sm-4");
  		hotelDiv.html('<div class="card hovercard"><img src="http://placehold.it/300x200/000000/&text=Arts" alt=""/><div class="avatar"><img src="data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAG1BMVEUzMzOWlpZwcHBkZGSJiYl9fX1LS0s/Pz9YWFh71KIoAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAsElEQVRIie3RsQ6CMBCA4TuklLVIUkeaEF1lckWCsqIxcW3iC7Q+Aby5pYnryeZy/9DpS9q7AnAcx3F/yRxXwvO4nOh+uazQ6+DmulsH06oDfA9Ky7ojsbcG0Dybk+jqkYINzBaHcLV3UlPwDr7CaYET+USplGrDJOiSck/BvOx7HSG8bhUBRQtyG2EOGfVGDB94iRAtOcxsw297B+lBFOR6zIJnB4mWD3rhHMdx3LcPN+4ZoSoGtt8AAAAASUVORK5CYII=" alt="" /></div><div class="info"><div class="title">'+response.results[i].property_name+'</div><div class="desc-options"><div class="desc-hotel">'+response.results[i].address.line1+'</div><div class="desc-hotel">'+response.results[i].address.city+', '+response.results[i].address.region+''+response.results[i].address.postal_code+'</div><div class="desc-hotel">Total Price for '+ response.results[i].rooms[0].rates[0].start_date+' to '+ response.results[i].rooms[0].rates[0].start_date+': $'+response.results[i].rooms[0].rates[0].price+'</div><div class="desc-hotel">Minimum Daily Rate: $'+ response.results[i].min_daily_rate.amount+'</div></div> <a class="btn btn-primary center-block" id="flight" href="fights.html">Check Flight</a></div></div>');
  		$(".hotel-category").append(hotelDiv);

  	}
  })
}

function nearestSourceAirport(){
  var sourceLatitude =sessionStorage.getItem('sourceLat');
  var sourceLongitude= sessionStorage.getItem('sourceLog');
  $(".airports_from").append(sessionStorage.getItem('source'));
 var nearFlight ='http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?latitude='+sourceLatitude +'&longitude='+sourceLongitude+'&apikey=kGzyspbq8pbK3b4fmrAG9kA4ksR7VA3G';
  
  $.ajax({
    url:nearFlight,
    method:'GET'
  }).done(function(response){
    for (var i = 0; i < response.length; i++) {
       console.log("Source Airport code: "+response[i].airport);
      console.log("Source Airport Name: "+response[i].airport_name);
      console.log("Source City Name: "+response[i].city_name);
      var newSource= $("<div>");
      newSource.addClass("desc airports-from");
      newSource.attr('value', response[i].airport);
      newSource.html(response[i].airport+", " +response[i].airport_name +", "+response[i].city_name);
      
      $(".desc-airports-from").append(newSource);

    }


  })
}


function nearestDestinationAirport(){
   $(".airports_to").append(sessionStorage.getItem('destination'));
   var destinationLatitude =sessionStorage.getItem('lat');
  var destinationLongitude= sessionStorage.getItem('log');
  var nearFlight2 ='http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?latitude='+destinationLatitude +'&longitude='+destinationLongitude+'&apikey=kGzyspbq8pbK3b4fmrAG9kA4ksR7VA3G';
   

  $.ajax({
    url:nearFlight2,
    method:'GET'
  }).done(function(response){
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      console.log("Airport code: "+response[i].airport);
      console.log("Airport Name: "+response[i].airport_name);
      console.log("City Name: "+response[i].city_name);
       var newSource= $("<div>");
       newSource.attr('value', response[i].airport);
      newSource.addClass("desc airports-to");
      newSource.html(response[i].airport+", " +response[i].airport_name +", "+response[i].city_name);
      
      $(".desc-airports-to").append(newSource);
      
    }

  })
}
$(document).on("click",".airports-from", function(){
  var myVal = $(this).attr('value');
   $(".airports-from").css('background-color','white');
  sessionStorage.setItem('airportFrom',myVal);
  $(this).css('background-color','black');

  console.log(myVal);

})

$(document).on("click",".airports-to", function(){
  var myVal = $(this).attr('value');
  $(".airports-to").css('background-color','white');
  $(this).css('background-color','black');
  sessionStorage.setItem('airportTo',myVal);
  console.log(myVal);
})

$("#find-flights").on("click", function(){
  $(this).css('opacity','0.7');

 var airportFrom = sessionStorage.getItem('airportFrom');
 var airportTo = sessionStorage.getItem('airportTo');
 var startDate = sessionStorage.getItem('startDate');
  var dayOfVisit = sessionStorage.getItem('dayOfVisit');
var flightQuery='http://api.sandbox.amadeus.com/v1.2/flights/extensive-search?origin='+airportFrom+'&destination='+airportTo+'&departure_date='+startDate+'&duration='dayOfVisit'&apikey=kGzyspbq8pbK3b4fmrAG9kA4ksR7VA3G';
 $.ajax({
  url: flightQuery,
  method:'GET'
 }).done(function(response){
 console.log(response);
 var displayArline = $("<div>");
 displayArline.html('<div class="col-sm-4"><div class="card hovercard"><div class="info"><div class="title flight-title">'+response.results[0].airline+'</div><div class="desc-options" id="flight-result"><div class="flight-info"> Departure Date: '+response.results[0].departure_date+'</div><div class="flight-info">Destination: '+response.results[0].destination+'</div><div class="flight-info">Price: $'+response.results[0].price+'</div><div class="flight-info"> Return Date'+response.results[0].return_date+'</div><br><button class="btn btn-primary btn-block" id="flight_button" data-airline='+response.results[0].airline+' data-airline='+response.results[0].departure_date+'data-destination='+response.results[0].destination+' data-price='+response.results[0].price+' data-return'+response.results[0].return_date+'>Select Flight</button></div></div></div></div>');
$("#flights").append(displayArline);

 })


})
// function twoAirports()
// {
//   if(sessionStorage)
// }