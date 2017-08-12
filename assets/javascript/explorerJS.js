
var totalPrice=0;

function mytotalPrice(){

 // if (!sessionStorage.getItem('hotel').length > 0)
 var chk =sessionStorage.getItem('hotel');



if (typeof chk !== 'undefined') {
    // the variable is defined

  var hotelPrice=  parseInt(sessionStorage.getItem('hotelprice'));
  var flightPrice= parseInt(sessionStorage.getItem('flightPrice'));
  var eventPrice=  parseInt(sessionStorage.getItem('eventPrice'));
  console.log(hotelPrice);

  totalPrice = hotelPrice+flightPrice+eventPrice;
  var budget = sessionStorage.getItem('budget');
  if(totalPrice>budget){
    $("#total-budget").text("Your total price of $"+totalPrice+" is greater that your budget at $"+budget);
    $("#total-budget").css("color", "red");
   
  } 
  else
  {
    $("#total-budget").text("Your total price of $"+totalPrice+" is still within your budget at $"+budget);
    $("#total-budget").css("color", "green");

  } 



}
}

function showEvent(){
  if(sessionStorage.getItem('events')){




var mysource = sessionStorage.getItem('source');
   var myDestination = sessionStorage.getItem('destination');
   var mystartDate = sessionStorage.getItem('startDate');
   var myendDate = sessionStorage.getItem('endDate');
   var myBudget = sessionStorage.getItem('budget');
   var guestNo = sessionStorage.getItem('guest');
  var category = sessionStorage.getItem('category');
  var i = parseInt(sessionStorage.getItem('events'));

   myDestinationArr=myDestination.split(',');
   mySourceArr=mysource.split(',');

  mystartDate =mystartDate+"T00%3A00%3A00Z";
   myendDate =myendDate+"T23%3A59%3A59Z";

  //  sessionStorage.setItem("state", myDestinationArr[1]);
  // sessionStorage.setItem("city", myDestinationArr[0]);
  // sessionStorage.setItem("stateSource", mySourceArr[1]);
  // sessionStorage.setItem("citySource", mySourceArr[0]);
 

   console.log("startDate "+mystartDate );
    console.log("endDate "+myendDate);
     console.log("state " +myDestinationArr[1]);
     console.log("city " +myDestinationArr[0]);
  
    //var search = 'los+angeles';//$("#search").val().trim();
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&endDateTime="+myendDate +"&startDateTime="+mystartDate +"&state="+myDestinationArr[1]+"&classificationName="+category+"&prices=0,1500&city="+myDestinationArr[0];

    $.ajax({
      url:queryURL,
      method:"GET"
    }).done(function(response){
      console.log(response);
   var total= response._embedded.events;
     
      var resultHolder1 =$("<div>");
      resultHolder1.addClass("thumbnail");
      //sresultHolder1.html('<article class="col-item results_item"><div class="photo results_photo"><a href='+total[i].url+'> <img src='+total[i].images[3].url+' class="img-responsive constraint" alt="Product Image"/> </a></div><div class="info"><div class="row"><div class="price-details col-md-6"><div id="divName" class="results-title">'+total[i].name+'</div><div id="divDate" class="results-info"> '+total[i].dates.start.localDate+'</div><div id="divGenre" class="results-info"> '+total[i].dates.start.localTime+' </div><div id="divAddr" class="results-info">'+total[i].classifications[0].segment.name+'</div><div class="results-info">'+total[i].classifications[0].genre.name+'</div><div class="results-info"> '+total[i]._embedded.venues[0].name+'</div><div class="results-info">'+total[i]._embedded.venues[0].address.line1+'</div><div class="results-info">'+total[i]._embedded.venues[0].city.name+' '+total[i]._embedded.venues[0].state.name+' '+total[i]._embedded.venues[0].postalCode+'</div><div class="results-info">'+total[i]._embedded.venues[0].country.name+'</div></div></div></div> <button class="btn btn-primary center-block select_event" id="hotel" data-href='+total[i].url+' data-imgscr='+total[i].images[3].url+' data-title='+total[i].name+' data-index='+i+'>Change Event</button></article>');
      



sessionStorage.setItem('eventPrice', total[i].priceRanges[0].min);
$('#event-name').append(total[i].name);
$('#event-date-time').append(total[i].dates.start.localDate);
$('#event-category').append(total[i].classifications[0].genre.name);
$('#event-place').append(total[i]._embedded.venues[0].name+' '+total[i]._embedded.venues[0].address.line1+' '+total[i]._embedded.venues[0].city.name+' '+total[i]._embedded.venues[0].state.name+' '+total[i]._embedded.venues[0].postalCode);
$('#event-price').append(total[i].priceRanges[0].min);
$("#chosen_event").append(resultHolder1);


})



}
}

function showHotel(){
  if(sessionStorage.getItem('hotel'))
  {
    
            var lat = sessionStorage.getItem('lat');

            var log = sessionStorage.getItem('log');
            var checkIn= sessionStorage.getItem('startDate');
            var checkOut=sessionStorage.getItem('endDate');
              console.log(lat);
            console.log(log);
             console.log(checkIn);
            console.log(checkOut);
  
  var hotelString = 'http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude='+lat+'&longitude='+log+'&radius=5&check_in='+checkIn+'&check_out='+checkOut+'&currency=USD&number_of_results=12&apikey=kGzyspbq8pbK3b4fmrAG9kA4ksR7VA3G';
 

 
  $.ajax({
    url:hotelString,
    mathod:'GET'
  }).done( function(response){
    //var total =response.results.length;
    console.log(response);
    var i =sessionStorage.getItem('hotel');
    var hotelPrice=parseInt(response.results[i].min_daily_rate.amount);
 var days = parseInt(sessionStorage.getItem('dayOfVisit'));
 sessionStorage.setItem('hotelprice', hotelPrice*days);

 
      // var hotelDiv = $("<div>");
      // hotelDiv.addClass("kkk");
      // hotelDiv.html('<div class="card hovercard"><img src="http://placehold.it/300x200/000000/&text=Arts" alt=""/><div class="avatar"><img src="data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAG1BMVEUzMzOWlpZwcHBkZGSJiYl9fX1LS0s/Pz9YWFh71KIoAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAsElEQVRIie3RsQ6CMBCA4TuklLVIUkeaEF1lckWCsqIxcW3iC7Q+Aby5pYnryeZy/9DpS9q7AnAcx3F/yRxXwvO4nOh+uazQ6+DmulsH06oDfA9Ky7ojsbcG0Dybk+jqkYINzBaHcLV3UlPwDr7CaYET+USplGrDJOiSck/BvOx7HSG8bhUBRQtyG2EOGfVGDB94iRAtOcxsw297B+lBFOR6zIJnB4mWD3rhHMdx3LcPN+4ZoSoGtt8AAAAASUVORK5CYII=" alt="" /></div><div class="info"><div class="title">'+response.results[i].property_name+'</div><div class="desc-options"><div class="desc-hotel">'+response.results[i].address.line1+'</div><div class="desc-hotel">'+response.results[i].address.city+', '+response.results[i].address.region+''+response.results[i].address.postal_code+'</div><div class="desc-hotel">Total Price for '+ response.results[i].rooms[0].rates[0].start_date+' to '+ response.results[i].rooms[0].rates[0].start_date+': $'+response.results[i].rooms[0].rates[0].price+'</div><div class="desc-hotel">Minimum Daily Rate: $'+ response.results[i].min_daily_rate.amount+'</div></div> <button class="btn btn-primary center-block select_hotel" id="flight" data-name='+response.results[i].property_name+' data-address='+response.results[i].address.line1+'  data-city='+response.results[i].address.city+' data-state='+response.results[i].address.region+' data-post_code='+response.results[i].address.postal_code+' data-totalPrice='+response.results[i].rooms[0].rates[0].price+' data-dailyPrice='+ response.results[i].min_daily_rate.amount+ ' data-index='+i+' >Change Hotel</button></div></div>');
      // $("#chosen_hotel").append(hotelDiv);

      $('#hotel-name').append(response.results[i].property_name);
$('#hotel-location').append(response.results[i].address.line1+' '+response.results[i].address.city+', '+response.results[i].address.region+''+response.results[i].address.postal_code);
$('#hotel-price').append(response.results[i].rooms[0].rates[0].price);
$('#hotel-rate').append(sessionStorage.getItem('hotelprice'));

  })
}
}
function backTrack(){
 if(!sessionStorage.getItem('firstName'))
 {
   window.location.href='index.html';

 }
}

function showFlight(){
  if(sessionStorage.getItem('flightName'))
  {
   
 sessionStorage.setItem('flightPrice', sessionStorage.getItem('flightPrice'));
$('#flight-name').text(sessionStorage.getItem('flightName'));
$('#departure-date').append(sessionStorage.getItem('flightStart'));
$('#return-date').append(sessionStorage.getItem('flightEnd'));
$('#flight-price').append(sessionStorage.getItem('flightPrice'));
$('#depart-from').append(sessionStorage.getItem('airportFrom'));
$('#arrive-at').append(sessionStorage.getItem('airportTo'));

        }
      }
$("#goto").text('Go to '+sessionStorage.getItem('destination'));
$("#stayin").text('Stay in '+sessionStorage.getItem('destination'));
$("#enjoy").text('Enjoy '+sessionStorage.getItem('destination'));



