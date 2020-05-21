// Page is ready to run after html is loaded
$(document).ready(function () {

// When page is loaded, display currentDate on the page. Call moment.js api to display current date in real-time and future dates for 5-day forecast
var currentDate = moment();
// $("#currentDate").text(moment().format('l'));
$("#0dayForecast").text(moment().add(1).format('l'));
$("#1dayForecast").text(moment().add(2).format('l'));
$("#2dayForecast").text(moment().add(3).format('l'));
$("#3dayForecast").text(moment().add(4).format('l'));
$("#4dayForecast").text(moment().add(5).format('l'));

// Display last search history using a for loop, if else statements and localStorage
var searchedCitiesArray = [];

// Listen to the search button click and create function to get user input/city
function getSearchInput(event) {
// $("#searchBtn").click(function (event) {
    event.preventDefault();
    // Declare variable for city input
    var city = $("#searchInput").val();
    // Create array of searched cities
    searchedCitiesArray.push(city);
    // Create string from searched cities in the searched cities array
    localStorage.setItem("searchedCities", JSON.stringify(searchedCitiesArray));
    // Display new searched cities
    var recentSearchHistory = $("<div>").text(city).addClass("Search");
    $("#cityHistory").append(recentSearchHistory);
    // Clear out search bar when user searches for city
    $("#searchInput").val("");
    // Event for ajax calls to to getWeather api function
    getWeather(city);
}

//Create function to display cities search History stored in localStorage
function searchHistory() {
    //Convert string into object using JSON.parse
    searchedCitiesArray = JSON.parse(localStorage.getItem("searchedCities"));
    // Use if else statements and for loop to initialise searchedCitiesArray based on search history
    if (searchedCitiesArray == null) {
    searchedCitiesArray = [];
    }
    console.log(searchedCitiesArray);
    //Loop through searched citiies array 
    for (var i = 0; i < searchedCitiesArray.length; i++) {
        var displaySearchedCities = searchedCitiesArray[i];
        // Dis[lay searched history and store in local storage
        var searchHistoryList = $("<div>").text(displaySearchedCities).addClass("Search"); 
        $("#cityHistory").append(searchHistoryList);
    }
}

// Created apiKey 
var APIKey = "1ff0f6823d723403dabe8415bdcb12e3";

    // Build the URL needed to query the database of the OpenWeatherMap API
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appID=" + apiKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
     "q=Los+Angeles&appid=" + APIKey;

    // Run AJAX GET call to request the OpenWeatherMap API
    $.ajax({
     url: queryURL,
     method: "GET"
   })

    // Store all of the retrieved data inside of a response object 
    .then(function(response) {

    // Log the queryURL
    console.log(queryURL);
    // Log the resulting object
    console.log(response);
       
    // Empties the divs to get rid of previous searches
        $("#searchInput").empty();

    // Display searched city name, temperature, humidity, wind speed, UV index (incl. weather icon) 
    // Transfer content to HTML
       $(".currentCity").html("<h1>" + response.name + "</h1>");
    //    $("#currentCity").text(response.name + " (" + response.list[0].dt_txt.substr(0, 10) + ")").append(iconCode);
       $(".windSpeed").text("Wind Speed: " + response.wind.speed);
    //    $("#windSpeed").text("Wind Speed: " + response.list[6].wind.speed + " mph");
       $(".humidity").text("Humidity: " + response.main.humidity);
    //    $("#humidity").text("Humidity: " + response.list[6].main.humidity + " %");
       
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    // add temp content to html
    $(".temperature").text("Temperature (K) " + response.main.temp);
    // $("#temperature").text("Temperature: " + ((response.list[6].main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F"); 
       $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

       $(".uvIndex").text("UV Index: " + response.main.uvi);
       var lat = response.city.coord.lat;
       var long = response.city.coord.lon;
       uvi(lat, long)  

       // Log the data in the console as well
       console.log("Current City: " + response.name);
       console.log("Wind Speed: " + response.wind.speed);
       console.log("Humidity: " + response.main.humidity);
       console.log("Temperature (F): " + tempF);
       console.log("UV Index: " + response.main.uvi);

    // Retrieve icons from weather API
    var iconCode = response.weather[0].icon;
    $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

    // Display weather icons
    var iconCode = response.daily[0].weather[0].icon;
    var iconCode = response.daily[1].weather[0].icon;
    var iconCode = response.daily[2].weather[0].icon;
    var iconCode = response.daily[3].weather[0].icon;

    $("#0dayIcon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
    $("#1dayIcon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
    $("#2dayIcon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
    $("#3dayIcon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

    });

        // Function to activate click search on recently searched cities stored in search history
        function storedCities() {
        // Store cities' name value in $(this)
        var city = $(this)[0].innerHTML;
        // When user clicks on stored cities in the search history, city name is transferred
        getWeather(city);
    }
     // On click function for stored cities
     $(".fas").on("click", getSearchInput);
     $(document).on("click", ".Search", storedCities);

    // Call searchHistory function when the dashboard page loads
    searchHistory();
    });

// Function getWeather for current weather and 5 day forecast
// function getWeather(city) {
//     console.log(city);

// Given a weather dashboard with form inputs,
// When user searches for a city, then user is presented with current and future conditions for that city and that city is added to the search history
// When user views current weather conditions for that city, then user is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// When user views the UV index, then user is presented with a color that indicates whether the conditions are favorable, moderate, or severe
// When user views future weather conditions for that city, then user is presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// When user clicks on a city in the search history, then user is again presented with current and future conditions for that city
// When user opens the weather dashboard, then user is presented with the last searched city forecast