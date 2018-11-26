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
var openWeatherMapKey = "88fb1e4fad361f4699206f893cbf6ea3";

// The code for inserting the user information into the table.
document.getElementById("browserName").innerHTML = browser;
document.getElementById("versionNum").innerHTML = version;
document.getElementById("operatingSystem").innerHTML = operatingSys;
document.getElementById("screenHeight").innerHTML = height;
document.getElementById("screenWidth").innerHTML = width;
document.getElementById("screenPixelDepth").innerHTML = pixelDepth;


// OPENWEATHER BEGINS HERE



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
		
	var weather = getWeather(currPosLat, currPosLng);
	console.log(weather);
	//Displays the Latitude and Longitude
	document.getElementById("latitude").innerHTML = currPosLat;
	document.getElementById("longitude").innerHTML = currPosLng;
	document.getElementById("temperature").innerHTML = temperature;
}

//Displays error message if Geolocation cannot be used.
function fail()
{
	document.getElementById("map").innerHTML = "Unable to access your location.";
}

function getWeather(latitude, longitude) {
    var requestString = "http://api.openweathermap.org/data/2.5/weather?"
                        + "lat=" + latitude + "&" + "lon=" + longitude + "&units=imperial"
                        + "&APPID=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.open("get", requestString, true);
    request.send();
	var weather = JSON.parse(request.responseText);
	return weather;
}

	
	
