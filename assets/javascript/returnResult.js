var checkIn = sessionStorage.getItem('startDate');
var checkOut = sessionStorage.getItem('endDate');
var days =sessionStorage.getItem('dayOfVisit')
var lat=0;
var log=0;
 var eventArr = [];
  var hotelArr = [];
 var number_of_events = 0;
 var flightArr=[];

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
  		hotelDiv.html('<div class="card hovercard"><div class="avatar"><i class="glyphicon glyphicon glyphicon-home" style="font-size:40px; color:#312c32; background-color: #daad86; padding: 30px; border-radius:50%; text-align: center; margin-top: 20px "></i></div><div class="info"><div class="title">'+response.results[i].property_name+' </div><div class="desc-options"><div class="desc-hotel">'+response.results[i].address.line1+'</div><div class="desc-hotel">'+response.results[i].address.city+', '+response.results[i].address.region+''+response.results[i].address.postal_code+'</div><div class="desc-hotel">Total Price for '+ response.results[i].rooms[0].rates[0].start_date+' to '+ response.results[i].rooms[0].rates[0].start_date+': $'+response.results[i].rooms[0].rates[0].price+'</div><div class="desc-hotel">Minimum Daily Rate: $'+ response.results[i].min_daily_rate.amount+'</div></div> <button class="btn btn-primary center-block select_hotel" id="choose_hotel" data-name='+response.results[i].property_name+' data-address='+response.results[i].address.line1+'  data-city='+response.results[i].address.city+' data-state='+response.results[i].address.region+' data-post_code='+response.results[i].address.postal_code+' data-totalPrice='+response.results[i].rooms[0].rates[0].price+' data-dailyPrice='+ response.results[i].min_daily_rate.amount+ ' data-index='+i+' >Select Hotel</button></div></div>');
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
var flightQuery='http://api.sandbox.amadeus.com/v1.2/flights/extensive-search?origin='+airportFrom+'&destination='+airportTo+'&departure_date='+startDate+'&duration='+dayOfVisit+'&apikey=kGzyspbq8pbK3b4fmrAG9kA4ksR7VA3G';
 $.ajax({
  url: flightQuery,
  method:'GET'
 }).done(function(response){
 console.log(response);
 var displayArline = $("<div>");
 displayArline.html('<div class="col-sm-4"><div class="card hovercard"><div class="info"><div class="title flight-title">'+response.results[0].airline+'</div><div class="desc-options" id="flight-result"><div class="flight-info"> Departure Date: '+response.results[0].departure_date+'</div><div class="flight-info">Destination: '+response.results[0].destination+'</div><div class="flight-info">Price: $'+response.results[0].price+'</div><div class="flight-info"> Return Date'+response.results[0].return_date+'</div><br><button class="btn btn-primary btn-block flight_button2" id="flight_button" data-startDate='+response.results[0].departure_date+' data-destination='+response.results[0].destination+' data-price='+response.results[0].price+' data-endDate='+response.results[0].return_date+' data-airline='+response.results[0].airline+'>Select Flight</button></div></div></div></div>');
$("#flights").append(displayArline);

 })


})

//save the event the user clicks
$(document).on('click', ".select_event", function(){

// var eventLink=$(this).attr('data-href');
// var eventSrc=$(this).attr('data-imgscr');
// var eventTitle=$(this).attr('data-title');
var index = $(this).attr('data-index');
// var obj = {eventLink: eventLink, eventsrc: eventSrc, eventTitle:eventTitle};
 console.log(index);
 eventArr.push(index);

sessionStorage.setItem('events', eventArr);
console.log(sessionStorage.getItem('events'));

number_of_events++;
$('#event_selected').text(number_of_events+" Events Selected");
$(this).attr('disabled',true);

})
$('#continue').on('click',function(){
  if (number_of_events>0)
  {
window.location.href='explore.html';
  }
  else
  {
    $('#event_selected').text('Select atleast one event');
  }



 })


$(document).on('click', ".select_hotel", function(){

// var address=$(this).attr('data-address');
// var totalPrice=$(this).attr('data-totalPrice');
// var dailyPrice=$(this).attr('data-dailyPrice');
// var hotelName=$(this).attr('data-name');
// var city=$(this).attr('data-city');
// var PostCode=$(this).attr('data-post_code');
// var state=$(this).attr('data-state');
// console.log(totalPrice);
var index=$(this).attr('data-index');

// var obj = {address: address, totalPrice: totalPrice, dailyPrice: dailyPrice, hotelName: hotelName};
 
sessionStorage.setItem('hotel', index);
console.log(sessionStorage.getItem('hotel'));
window.location.href='explore.html';
// number_of_events++;
// $('#event_selected').text(number_of_events+" Events Selected");
// $(this).attr('disabled',true);

})
// function twoAirports()
// {
//   if(sessionStorage)
// }
$(document).on('click', '.flight_button2', function(){
var startDate =$(this).attr('data-startDate');
var airline =$(this).attr('data-airline');
var destination =$(this).attr('data-destination');
var price =$(this).attr('data-price');
var returnDate=$(this).attr('data-endDate');
console.log(airline);

// var obj = {startDate: startDate, airline: airline, destination: destination, price:price, returnDate: returnDate};
// flightArr.push(obj);
// console.log(flightArr);
sessionStorage.setItem('flightName', airline);
sessionStorage.setItem('flightPrice', price);
sessionStorage.setItem('flightDestination', destination);
sessionStorage.setItem('flightStart', startDate);
sessionStorage.setItem('flightEnd', returnDate);
window.location.href='explore.html'


//var obj = {eventLink: eventLink, eventsrc: eventSrc, eventTitle:eventTitle};
 //eventArr.push(obj);
// data-price
// data-endDate
// data-startDate
//data-airline

// data-destination
})