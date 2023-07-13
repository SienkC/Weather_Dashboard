// Take input from text area
// When search button is pressed grab ^ value
// use API to get location details as lat and long
// use api to get 5-day weather info
// display todays weather in main box
// display 5 days in smaller boxes
// save city lat and long in local storage and create button for it

var cityName = document.querySelector("#getCityName");
var submitCityEl = document.querySelector("#search");

// testing out date functionality
var testDate = new Date(1689638400000);
    console.log(new Date(1689638400000).getMonth() + "/" + new Date(1689638400000).getDate() + "/" + new Date(1689638400000).getFullYear());

submitCityEl.addEventListener("click", function (event){
    if(cityName.value.trim()){
        // test city name
        console.log("test:" + cityName.value.trim());

        getLongLat(cityName.value.trim());
    }
});

function getLongLat(city){
    // use api call with city name
    // EX: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

    // get lat and long
}

function getWeather(lat, long){
    // use api call with lat and long
    // EX: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    // get weather data
    // take avg temp for each day
    // date is unix
    // new Date(unix * 1000) gets js date
    
    // save first date returned
    // var today = new Date(obj[0].unixDate * 1000);

    // loop through dates
    // within loop{
        // var tempDate = new Date(obj[i].unixDate * 1000);
        // if (tempDate.getDate() === today.getDate()){
            // countToday++ <-number of values for today
            // sumTempToday = sumTempToday + currentTemp <-running sum of all temps for today
            // ^similar sums for wind speed and humidity}
        // else if (tomorrow) <-do same as above
        // else if (tstomorrow) ... etc for 5 days
}

