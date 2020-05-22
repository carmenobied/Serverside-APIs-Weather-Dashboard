// Page is ready to run after html is loaded
$(document).ready(function(){

// ******************************************* City Input and Search History ******************************************* //              

// Display last search history using a for loop, if else statements and localStorage
var searchedCitiesArray = [];

// On click function for stored cities
$("#searchBtn").on("click", getSearchInput);
$(document).on("click", ".selected", storedCities);

// Call searchHistory function when the dashboard page loads
searchHistory();

// Display recently searched cities stored in search history
function storedCities() {
    // Store cities' name value
    var city = $(this)[0].innerHTML;
    // Transfer city name when user selects a stored city in the search history
    getWeather(city);
    }

// Listen to the search button click and create function to get user input/city
function getSearchInput(event) {
    event.preventDefault();
    $("#previousSearches").empty();
    // Declare variable for city input
    var city = $(".form-control").val(); 
    // Create array of searched cities
    searchedCitiesArray.push(city);
    // Create string from searched cities in the searched cities array
    localStorage.setItem("cities", JSON.stringify(searchedCitiesArray));
    // Display new searched cities
    var searchHistoryList = $("<div>").text(city).addClass("selected");
    $("#searchHistory").append(searchHistoryList);
    // Clear out search bar when user searches for city
    $("#searchInput").val("");
    // Event for ajax calls to to getWeather api function
    getWeather(city);
}

//Create function to display cities search History stored in localStorage
function searchHistory() {
    $("#previousSearches").empty();
    //Convert string into object using JSON.parse
    searchedCitiesArray = JSON.parse(localStorage.getItem("cities"));
    // Use if else statements and for loop to initialise searchedCitiesArray based on search history
    if (searchedCitiesArray == null) {
    searchedCitiesArray = [];
     }
    //Loop through searched citiies array 
    for (var i = 0; i < searchedCitiesArray.length; i++) {
        var displaySearchedCities = searchedCitiesArray[i];
        // Display searched history and store in local storage
        var searchHistoryList = $("<div>").text(displaySearchedCities).addClass("selected"); 
        $("#searchHistory").append(searchHistoryList);
    }
}

// ******************************************* GET WEATHER API CALL ******************************************* //              

// Created apiKey to call the OpenWeatherMap API
var apiKey = "1ff0f6823d723403dabe8415bdcb12e3";

// Current weather function
function getWeather (city) {
    console.log(city)
    // Call moment.js api to display date in real-time
    var currentDate = moment().format("MMMM Do YYYY, h:mm a"); 
    // Build the URL needed to query the database of the OpenWeatherMap API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Los+Angeles&appid=" + APIKey;

    // Run AJAX GET call to request the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp",
        success: function(response){
            // Store all of the retrieved data inside of a response object 
        // .then(function(response) {
            // Log the queryURL and resulting object
            console.log(queryURL);
            console.log(response);
        
           // Empties the divs to get rid of previous searches
           $("#previousSearches").empty();

           // ******************************************* CURRENT WEATHER ******************************************* //              

            // Transfer Current Weather content to HTML and retrieve and display icon from weather API
            $(".currentCity").html("<h3>" + response.city.name + " " + currentDate + "</h3>").append($('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png" +' "/>')); 
            $(".humidity").text("Humidity: " + response.list[6].main.humidity + " %");
            $(".windSpeed").text("Wind Speed: " + response.list[6].wind.speed + " mph");
            // Convert the temperature to fahrenheit
            $(".temperature").text("Temperature: " + ((response.list[6].main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F");
            // Create coordinate variables for UV Index to retrieve data from the UVindexAPI
            var lat = response.city.coord.lat;
            var long = response.city.coord.lon;
            getUVindex(lat, long)

// ******************************************* GET 5 DAY FORECAST ******************************************* //              

            // Current Weather Forecast, i.e. Day 1 Weather Forecast
            $("#1dayForecast").text(moment().add(1).format('l'));
            // Retrieve and display icons from weather API
            $("#1dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[6].weather[0].icon+".png" +' "/>'));
            $("#1dayHumidity").text("Humidity.: " + response.list[6].main.humidity + " %");
            $("#1dayTemperature").text("Temperature: " + ((response.list[6].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            // Day 2 Weather Forecast
            $("#2dayForecast").text(moment().add(2).format('l'));
            $("#2dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[14].weather[0].icon+".png" +' "/>'));
            $("#2dayHumidity").text("Humidity: " + response.list[14].main.humidity + " %");
            $("#2dayTemperature").text("Temperature: " + ((response.list[14].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            // Day 3 Weather Forecast
            $("#3dayForecast").text(moment().add(3).format('l'));
            $("#3dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[22].weather[0].icon+".png" +' "/>'));
            $("#3dayHumidity").text("Humidity: " + response.list[22].main.humidity + " %");
            $("#3dayTemperature").text("Temperature: " + ((response.list[22].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            // Day 4 Weather Forecast
            $("#4dayForecast").text(moment().add(4).format('l'));
            $("#4dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[30].weather[0].icon+".png" +' "/>'));
            $("#4dayHumidity").text("Humidity: " + response.list[30].main.humidity + " %");
            $("#4dayTemperature").text("Temperature: " + ((response.list[30].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
            // Day 5 Weather Forecast
            $("#5dayForecast").text(moment().add(5).format('l'));
            $("#5dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[38].weather[0].icon+".png" +' "/>'));
            $("#5dayHumidity").text("Humidity: " + response.list[38].main.humidity + " %");
            $("#5dayTemperature").text("Temperature: " + ((response.list[38].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
        }
        });
        
} 

// ******************************************* GET UVI INDEX API CALL ******************************************* //              

// Using lat and long with get uvIndex and display on Currentweather DOM
function getUVindex(lat,long) {  
             
    //Build the URL we need to get the UVI information
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(responseUVI) {
            console.log(responseUVI.current.uvi)
            var uviIndex = responseUVI.current.uvi;
            //Print UVIndex
            $("#uvIndex").text("UV Index: " + uviIndex);
            
            if (uviIndex <= 2.99) {                  
                uviIndex = $("#uvIndex").css({"background-color": "green", "display": "block", "border-radius": "8x", "padding": "1.5%"});
            } else if (uviIndex >= 3 & uviIndex <= 5.99) {
                uviIndex = $("#uvIndex").css({"background-color": "yellow", "display": "block", "border-radius": "8x", "padding": "1.5%"});
            } else if (uviIndex >= 6 & uviIndex <= 7.99) {
                uviIndex = $("#uvIndex").css({"background-color": "orange", "display": "block", "border-radius": "8x", "padding": "1.5%"});
            } else if (uviIndex >= 8) {
                uviIndex = $("#uvIndex").css({"background-color": "maroon", "display": "block", "border-radius": "8x", "padding": "1.5%"});
            };

        });
    } 

}); 