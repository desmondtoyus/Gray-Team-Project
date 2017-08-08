$(document).ready(function(){
var search = 'los+angeles';//$("#search").val().trim();
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&endDateTime=2017-08-06T17%3A17%3A00Z&startDateTime=2017-08-02T17%3A18%3A00Z&country=usa&state=ca&classificationName=rock&prices=50,150&city="+search;

$.ajax({
	url:queryURL,
	method:"GET"
}).done(function(response){

var total= response._embedded.events;
console.log(total.length);
})

//https://app.ticketmaster.com/discovery/v2/events.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&endDateTime=2017-08-06T17%3A17%3A00Z&startDateTime=2017-08-02T17%3A18%3A00Z&country=usa&state=ca&classificationName=rap&prices=50,150&city=
});