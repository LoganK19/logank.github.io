/*
	Author: Logan Knipp
	JavaScript for filling the table on the Security page and for displaying the user location on a Google Map.
*/

// The JavaScript for getting the user information that is displayed in the table, which is put into variables for ease of use.
var browser = navigator.appName;
var version = navigator.appVersion;
var operatingSys = navigator.platform;
var height = screen.height;
var width = screen.width;
var pixelDepth = screen.pixelDepth;

// The code for inserting the user information into the table.
document.getElementById("browserName").innerHTML = browser;
document.getElementById("versionNum").innerHTML = version;
document.getElementById("operatingSystem").innerHTML = operatingSys;
document.getElementById("screenHeight").innerHTML = height;
document.getElementById("screenWidth").innerHTML = width;
document.getElementById("screenPixelDepth").innerHTML = pixelDepth;


// OPENWEATHER BEGINS HERE

var getWeather = function(northLat, eastLng, southLat, westLng) {
    gettingData = true;
    var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
                        + westLng + "," + northLat + "," //left top
                        + eastLng + "," + southLat + "," //right bottom
                        + map.getZoom()
                        + "&cluster=yes&format=json"
                        + "&APPID=" + "88fb1e4fad361f4699206f893cbf6ea3";
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
  };
  
  var proccessResults = function() {
    console.log(this);
    var results = JSON.parse(this.responseText);
    if (results.list.length > 0) {
        resetData();
        for (var i = 0; i < results.list.length; i++) {
          geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
        drawIcons(geoJSON);
    }
  };
  
  var jsonToGeoJson = function (weatherItem) {
    var feature = {
      type: "Feature",
      properties: {
        city: weatherItem.name,
        weather: weatherItem.weather[0].main,
        temperature: weatherItem.main.temp,
        min: weatherItem.main.temp_min,
        max: weatherItem.main.temp_max,
        humidity: weatherItem.main.humidity,
        pressure: weatherItem.main.pressure,
        windSpeed: weatherItem.wind.speed,
        windDegrees: weatherItem.wind.deg,
        windGust: weatherItem.wind.gust,
        icon: "http://openweathermap.org/img/w/"
              + weatherItem.weather[0].icon  + ".png",
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
      },
      geometry: {
        type: "Point",
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
      }
	}
};

// OPENWEATHER ENDS HERE

//Tests to see if Geolocation is allowed.
function geoTest()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(createMap, fail, {timeout: 10000});
	}
	else
	{
		fail();
	}
}

//Creates and displays the Google Map, as well as location information to be displayed in the table.
function createMap(position)
{
// Elevation Service for detecting Altitude was overly complicated, but it works. I used example code from Google to make it work.

	//Declares the ElevationSerivice object
	var elevator = new google.maps.ElevationService;
	
	//The current Latitude and Longitude
	var currPosLat = position.coords.latitude;
	var currPosLng = position.coords.longitude;
	
	//Takes the current LatLng for use with the map and also for attempting to utilize the ElevationSerivice
	var currPosition = new google.maps.LatLng(currPosLat, currPosLng);
	
	//Stores the map options
	var mapOptions = {
		center: currPosition,
		zoom: 12
	}
	
	//Declares the map objec and setting it to the map div.
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//Uses the map LatLng with the appropriate ElevationSerivice function to display the altitude.
	elevator.getElevationForLocations({'locations': [currPosition]}, function(results, status) {
          if (status === 'OK') {
            // Retrieve the first result
            if (results[0]) {
              // Displays the first result in the Altitude section of the table
                  document.getElementById("altitude").innerHTML = results[0].elevation;
            } else {
              document.getElementById("altitude").innerHTML = "No results found";
            }
          } else {
			  //Displays error if something goes wrong, which shouldn't happen.
            document.getElementById("altitude").innerHTML = "Elevation service failed due to: " + status;
          }
        });
		
	//Displays the Latitude and Longitude
	document.getElementById("latitude").innerHTML = currPosLat;
	document.getElementById("longitude").innerHTML = currPosLng;
	document.getElementById("temperature").innerHTML = jsonToGetJson.feature.temperature;
}

//Displays error message if Geolocation cannot be used.
function fail()
{
	document.getElementById("map").innerHTML = "Unable to access your location.";
}


	
	
