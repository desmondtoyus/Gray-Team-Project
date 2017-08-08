 $(document).ready(function(){

 $("#source_div").hide();
 
  $("#destination_div").hide();
  $('#address').hide();
  $("#date_div").hide();
  $("#guest_div").hide();
 
 // Initialize Firebase
  var config = {
  apiKey: "AIzaSyAmF7AXOhWtI1_mVQOUxwLuaGFL5Mb4pRU",
    authDomain: "itravel-gray-project.firebaseapp.com",
    databaseURL: "https://itravel-gray-project.firebaseio.com",
    projectId: "itravel-gray-project",
    storageBucket: "itravel-gray-project.appspot.com",
    messagingSenderId: "446597865889"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
    
    var firstName ="";
     var lastName ="";
      var userName ="";
    var email ="";
    var password ="";
    var passwordConf ="";
    var userExists =false;
     var userName2='';


 
$("#sign_up").on("click",function (event) {
    event.preventDefault();
  // body...
 
  var fnameCheck = $("#user_first_name").val().trim();
  var userCheck = $("#user_name").val().trim();
    var lnameCheck = $("#user_last_name").val().trim();
    var emailCheck = $("#user_email").val().trim();
    var passwordCheck = $("#user_password").val().trim();
    var ComPassword = $("#user_password_conf").val().trim();

   

    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

   if (userCheck === "") 
  {
    $("#myform_user_name_errorloc").html("User name empty");
  }
else{
        for(i = 0; i < specialChars.length;i++)
        {
             if(userCheck.indexOf(specialChars[i]) > -1)
             {
                  $("#myform_user_name_errorloc").html("User name cannot contain special characters");
                  return false;
            }
         $("#myform_user_name_errorloc").empty();
        }
    }
     
    if (fnameCheck === "") {
        $("#myform_user_first_name_errorloc").html("Name must be filled out");
        return false;
    }
    else{
           $("#myform_user_first_name_errorloc").empty();
      }
    if (lnameCheck === "") {
        $("#myform_user_last_name_errorloc").html("Last Name must be filled out");
        return false;
    }
     else{
           $("#myform_user_last_name_errorloc").empty();
      }
    if (emailCheck === "") {


        $("#myform_user_email_errorloc").html("Enter a vallid email");
        return false;
    }
    else{
      //checking the emial pattern
      var checkAt = (emailCheck).indexOf('@');
       var checkDot = (emailCheck).indexOf('.');

       console.log(checkAt);
       console.log(checkDot);


          // email in this forma ###@###.###
        if(emailCheck[checkAt-1] && emailCheck[checkAt+1] && emailCheck[checkDot-1] && emailCheck[checkDot-1] && checkDot>checkAt)
        {

          $("#myform_user_email_errorloc").empty();
        }else
        {
          $("#myform_user_email_errorloc").html("Enter a vallid email2");
           return false;
        }
      }

    if (passwordCheck === "" || passwordCheck.length < 8) {
        
        $("#myform_user_password_errorloc").html("password atleast 8 characters");
        return false;

    }

    else{
          $("#myform_user_password_errorloc").empty();
      }

    if (ComPassword !== passwordCheck) {

        $("#myform_user_password_conf_errorloc").html("Doesnt Match the Password");
        return false;
    }
    else{
           $("#myform_user_password_conf_errorloc").empty();
      }

    userName = $("#user_name").val().trim();
   firstName = $("#user_first_name").val().trim();
   lastName =$("#user_last_name").val().trim();
   email =$("#user_email").val().trim();
   password =$("#user_password").val().trim();

   

   registerUser();

   
})

 // if( database.ref("/users/").child(userName).exists())
 // {



 // userExists= true;

 // }

function registerUser(){
     database.ref("/users/").once("value", function(snapshot){
       if(snapshot.child(userName).exists())
         {
         $("#status").html("This User Name already exists, Please Log In");

         }
         else
     {
      database.ref("/users/"+userName).set({
        userName: userName,
        firstName: firstName,
        lastName:lastName,
        email:email,
        password:password

      })
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);

      $("#user_name").empty();
      $("#user_first_name").empty();
      $("#user_last_name").empty();
      $("#user_email").empty();
        $("#user_password").empty();
      //proceed to use budget on success

     window.location.href = "user-input.html";

     }
     })
}
$("#budget_submit").on("click", function(){
var budget = $("#budget").val().trim();

var z1 = /^[0-9]*$/;
if (z1.test(budget) && budget!=="") {
   $("#wrong_budget").empty();
   $("#budget_div").hide();
   $("#source_div").show();
  sessionStorage.setItem("budget", budget);


}
else
{

  $("#wrong_budget").html("Invalid input");
 
}

})
 //the source button
$("#source_submit").on("click",function(){
var source= $("#autocomplete").val().trim();
console.log(source);
if( source=="")
{
$("#source_err_div").html("Invalid Source");
}
else
{
    sessionStorage.setItem('source', source);
  $("#source_div").empty();
  $("#destination_div").show();
}
     })

//the destination button
$("#destination_submit").on("click",function(){
var destination= $("#autocomplete2").val().trim();
console.log(destination);
if( destination=="")
{
$("#destination_err_div").html("Invalid Source");
}
else
{

    sessionStorage.setItem('destination', destination);

 
  $("#destination_div").hide();
   $("#date_div").show();
}
     })

$('.datepicker').datepicker({ dateFormat:'yy-mm-dd', minDate: 0 });

$("#date_submit").on("click",function(){

  var startDate= $('#start_date').val().trim();
  var endDate =  $('#end_date').val().trim();
  if (startDate==="" || endDate==="") {
    $("#date_err_div").html("Invalid Date");

  }
  else
  {
      sessionStorage.setItem('startDate', startDate);
      sessionStorage.setItem('endDate', endDate);

    $("#date_div").hide();
   $("#guest_div").show();
  }

   

})

$("#guest_submit").on("click",function(){

var guest=$("#guest").val().trim();

 if (guest==="") {
    $("#guest_err_div").html("Invalid Date");

  }
  else{
    sessionStorage.setItem('guest', guest);
   $("#guest_div").hide();
   // time for the api query
  
  window.location.href = "results2.html";

  }


})




$("#user_login").on("click", function(){
event.preventDefault();
var user =$("#user_name").val().trim();
var password =$("#user_password").val().trim();
if(user=="" || password==""){
 $("#user_name_err").html("Invalid Log-In Input");
return false;
}
else
{
    database.ref("/users/").on("value", function(snapshot){
        //password valid
     if (snapshot.child(user).exists())
        {
           var dbpassword=snapshot.child(user).val().password;
           if (dbpassword===password) {
              sessionStorage.setItem('firstName', snapshot.child(user).val().firstName);
              sessionStorage.setItem('lastName', snapshot.child(user).val().lastName);
               window.location.href = "user-input.html";

           }
           else
               {
                    //invalid password
                   $("#user_name_err").html("Invalid User name or Password");
               }
          // user Exists check password
        }
        else
        {
            //invalid user name
           $("#user_name_err").html("Invalid User name or Password");
        }


        })

  }

})

function eventAPI2()
{
   var myDestination = sessionStorage.getItem('destination');
   var mystartDate = sessionStorage.getItem('startDate');
   var myendDate = sessionStorage.getItem('endDate');
   var myBudget = sessionStorage.getItem('budget');
   var guestNo = sessionStorage.getItem('guest');

   myDestinationArr=myDestination.split(',');


  mystartDate =mystartDate+"T00%3A00%3A00Z";
   myendDate =myendDate+"T00%3A00%3A00Z";

   console.log("startDate "+mystartDate );
    console.log("endDate "+mystartDate);
     console.log("state " +myDestinationArr[1]);
     console.log("city " +myDestinationArr[0]);
  
    //var search = 'los+angeles';//$("#search").val().trim();
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&endDateTime="+myendDate +"&startDateTime="+mystartDate +"&state="+myDestinationArr[1]+"&classificationName=rock&prices=0,1500&city="+myDestinationArr[0];

    $.ajax({
      url:queryURL,
      method:"GET"
    }).done(function(response){
      console.log(response);
    var total= response._embedded.events;
    console.log(total.length);

    for (var i =0; i < total.length; i++) {
      if(i===0){
      var resultHolder1 =$("<div>");
      resultHolder1.addClass("col-md-8");
      resultHolder1.html('<article class="col-item results_item"><div class="photo results_photo"><a href='+total[i].url+'> <img src='+total[i].images[1].url+' class="img-responsive constraint" alt="Product Image"/> </a></div><div class="info"><div class="row"><div class="price-details col-md-6"><div id="divName"> '+total[i].name+'</div><div id="divDate"> '+total[i].dates.start.localDate+'</div><div id="divGenre"> '+total[i].dates.start.localTime+' </div><div id="venuename">'+total[i].dates.timezone+'</div><div id="divAddr">'+total[i].classifications[0].segment.name+'</div><div> '+total[i].classifications[0].genre.name+'</div><div> '+total[i]._embedded.venues[0].name+'</div><div>'+total[i]._embedded.venues[0].address.line1+'</div><div>'+total[i]._embedded.venues[0].city.name+' '+total[i]._embedded.venues[0].state.name+' '+total[i]._embedded.venues[0].postalCode+'</div><div>'+total[i]._embedded.venues[0].country.name+'</div></div></div></div></article>');
      $("#preffered_result").append(resultHolder1);

      }
      else
      {

      var resultHolder =$("<div>");
      resultHolder.addClass("col-md-4 const");
      resultHolder.html('<article class="col-item results_item"><div class="photo results_photo"><a href='+total[i].url+'> <img src='+total[i].images[1].url+' class="img-responsive constraint" alt="Product Image"/> </a></div><div class="info"><div class="row"><div class="price-details col-md-6"><div id="divName"> '+total[i].name+'</div><div id="divDate"> '+total[i].dates.start.localDate+'</div><div id="divGenre"> '+total[i].dates.start.localTime+' </div><div id="venuename">'+total[i].dates.timezone+'</div><div id="divAddr">'+total[i].classifications[0].segment.name+'</div><div> '+total[i].classifications[0].genre.name+'</div><div> '+total[i]._embedded.venues[0].name+'</div><div>'+total[i]._embedded.venues[0].address.line1+'</div><div>'+total[i]._embedded.venues[0].city.name+' '+total[i]._embedded.venues[0].state.name+' '+total[i]._embedded.venues[0].postalCode+'</div><div>'+total[i]._embedded.venues[0].country.name+'</div></div></div></div></article>');
      $("#result_content").append(resultHolder);
    }
  }

    })

}

});
//to split the date and city array. city is a variable name
 //Arr=city.split(',')
 //T00%3A00%3A00Z