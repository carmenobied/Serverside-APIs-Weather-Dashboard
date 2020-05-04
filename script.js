// Page is ready to run after html is loaded
$(document).ready(function () {

// When page is loaded, last search history will load using localStorage.getItem() and a for loop and if else statements

// When page is loaded, display currentDate on the page. Call moment.js api to display current date in real-time and future dates for 5-day forecast
var currentDate = moment();
$("#currentDate").text(moment().format('l'));
$("#0dayDate").text(moment().add(1).format('l'));
$("#1dayDate").text(moment().add(2).format('l'));
$("#2dayDate").text(moment().add(3).format('l'));
$("#3dayDate").text(moment().add(4).format('l'));
$("#4dayDate").text(moment().add(5).format('l'));

// Declare variables for apiKey and queryURL
// API key - 
var apiKey = "166a433c57516f51dfab1f7edaed8413";

// Build the URL needed to query the database of the OpenWeatherMap API
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + city + "&appID=" + apiKey;

// Run AJAX GET call to request the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // Store all of the retrieved data inside of an object called "response"
    .then(function(response) {

    // Log queryURL
    console.log(queryURL);

    // Log resulting object
    console.log(response);

   // Display searched city name, temperature, humidity, wind speed, UV index (incl. weather icon)

      // Transfer content to HTML
      $("#city").text("<h2>" + response.name + "</h2>");
      $("#temperature").text("Temperature: " + response.main.temp);
      $("#humidity").text("Humidity: " + response.main.humidity);
      $("#windSpeed").text("Wind Speed: " + response.wind.speed);
      $("#uvIndex").text("UV Index: " + response.main.uvi);
      
       // Log the data in the console as well
       console.log("Wind Speed: " + response.wind.speed);
       console.log("Humidity: " + response.main.humidity);
       console.log("Temperature: " + response.main.temp);
       console.log("Temperature: " + response.main.uvi);
    });
    // Add event listener for Search Button
    $("#searchBtn").click(function () {
    });

    // Add event listener for Search History Button so when a city is clicked user is presented with that city's current and future conditions
    // $("#searchHistoryBtn").click(function () {
    // });
});

// Given a weather dashboard with form inputs,
// When user searches for a city, then user is presented with current and future conditions for that city and that city is added to the search history
// When user views current weather conditions for that city, then user is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// When user views the UV index, then user is presented with a color that indicates whether the conditions are favorable, moderate, or severe
// When user views future weather conditions for that city, then user is presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// When user clicks on a city in the search history, then user is again presented with current and future conditions for that city
// When user opens the weather dashboard, then user is presented with the last searched city forecast