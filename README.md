# Server-Side APIs: Weather Dashboard

The goal was to build a weather dashboard that runs in the browser and features dynamically updated HTML and CSS, using third-party APIs. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. This app uses the OpenWeather API to retrieve weather data for cities and uses localStorage to store any persistent data. 

This app is aimed towards travelers who want to see the weather outlook for multiple cities, so that they can plan a trip accordingly.

## Installation
```
i. Fork the Github repository.
ii. Clone the forked repo into your local machine using gitbash/terminal to pull the project and data.
iii. Access the index.html, style.css and script.js files and assets via Visual Studio or in your browser to view the code and website respectively.  
iv. Open and explore the app.
```

## Usage
Server-Side API Components Used:
```bash
JSON - AJAX - HTTP GET Requests
```

See screenshot below which demonstrates the application:
![Work Day Scheduler](/assets/Thirt-Party-APIs-homework.png)

## Key Checks Included ensuring the following:
Given a weather dashboard with form inputs:
1. When user searches for a city, then user is presented with current and future conditions for that city and that city is added to the search history
2. When user views current weather conditions for that city, then user is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
3. When user views the UV index, then user is presented with a color that indicates whether the conditions are favorable, moderate, or severe
4. When user views future weather conditions for that city, then user is presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
5. When user clicks on a city in the search history, then user is again presented with current and future conditions for that city
6. When user opens the weather dashboard, then user is presented with the last searched city forecast