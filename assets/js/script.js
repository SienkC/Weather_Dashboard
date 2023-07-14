// Take input from text area
// When search button is pressed grab ^ value
// use API to get location details as lat and long
// use api to get 5-day weather info
// display todays weather in main box
// display 5 days in smaller boxes
// save city lat and long in local storage and create button for it

var cityName = document.querySelector("#getCityName");
var submitCityEl = document.querySelector("#search");
var todayDetail = document.querySelector("#today");
var day1Detail = document.querySelector("#day1");
var day2Detail = document.querySelector("#day2");
var day3Detail = document.querySelector("#day3");
var day4Detail = document.querySelector("#day4");
var day5Detail = document.querySelector("#day5");
var daysDetail = document.querySelector("#days");


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

    // Test long and lat:
    // Lat: 28.5421109
    // Long: -81.3790304
    getWeather(28.5421109,-81.3790304);

    todayDetail.children[0].textContent = city;
    // add api key to make working url
    // var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=64c7e1cf4f2a2a2d1abd02e09dd89b2b";

    // // get lat and long
    // fetch(geoUrl).then(function (response) {
    //     if (response.ok) {
    //         response.json().then(function (cityDetails) {
    //             // save lat and long in localstorage with city name
    //             console.log(cityDetails);

                
    //             getWeather(cityDetails[0].lat, cityDetails[0].lon);
    //         })
    //     }
    //     else {
    //         alert("Error: " + response.statusText);
    //     }
    // })
}

function getWeather(lat, long){
    // use api call with lat and long
    // EX: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    console.log("Lat: " + lat + "\nLong: " + long);

    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=64c7e1cf4f2a2a2d1abd02e09dd89b2b&units=imperial"
    
    fetch(weatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (weather) {
                var sums = {
                    today: [0, 0, 0],
                    day1: [0, 0, 0],
                    day2: [0, 0, 0],
                    day3: [0, 0, 0],
                    day4: [0, 0, 0],
                    day5: [0, 0, 0]
                };

                var count = {
                    today: 1,
                    day1: 0,
                    day2: 0,
                    day3: 0,
                    day4: 0,
                    day5: 0
                }


                console.log(weather);
                console.log("Unix today: " + weather.list[0].dt);

                // grab today's date and set the next 5 days
                var today = new Date((weather.list[0].dt) * 1000);
                var day1 = new Date(today);
                day1.setDate(today.getDate() + 1);
                var day2 = new Date(today);
                day2.setDate(today.getDate() + 2);
                var day3 = new Date(today);
                day3.setDate(today.getDate() + 3);
                var day4 = new Date(today);
                day4.setDate(today.getDate() + 4);
                var day5 = new Date(today);
                day5.setDate(today.getDate() + 5);


                console.log("Today: " + today);

                sums.today[0] = weather.list[0].main.temp;
                sums.today[1] = weather.list[0].wind.speed;
                sums.today[2] = weather.list[0].main.humidity;

                console.log("Today temp: " + sums.today[0] + "\nToday wind: " + sums.today[1] + "\nToday humidity: " + sums.today[2]);

                for(let i = 1; i < weather.list.length; i++) {
                    var tempDate = new Date((weather.list[i].dt) * 1000);

                    // todays date
                    if (tempDate.getDate() === today.getDate()) {
                        sums.today[0] = sums.today[0] + weather.list[i].main.temp;
                        sums.today[1] = sums.today[1] + weather.list[i].wind.speed;
                        sums.today[2] = sums.today[2] + weather.list[i].main.humidity;

                        // counts how many values there are for today
                        count.today++;
                    }
                    else if (tempDate.getDate() === day1.getDate()) {
                        sums.day1[0] = sums.day1[0] + weather.list[i].main.temp;
                        sums.day1[1] = sums.day1[1] + weather.list[i].wind.speed;
                        sums.day1[2] = sums.day1[2] + weather.list[i].main.humidity;
                        count.day1++;
                    }
                    else if (tempDate.getDate() === day2.getDate()) {
                        sums.day2[0] = sums.day2[0] + weather.list[i].main.temp;
                        sums.day2[1] = sums.day2[1] + weather.list[i].wind.speed;
                        sums.day2[2] = sums.day2[2] + weather.list[i].main.humidity;
                        count.day2++;
                    }
                    else if (tempDate.getDate() === day3.getDate()) {
                        sums.day3[0] = sums.day3[0] + weather.list[i].main.temp;
                        sums.day3[1] = sums.day3[1] + weather.list[i].wind.speed;
                        sums.day3[2] = sums.day3[2] + weather.list[i].main.humidity;
                        count.day3++;
                    }
                    else if (tempDate.getDate() === day4.getDate()) {
                        sums.day4[0] = sums.day4[0] + weather.list[i].main.temp;
                        sums.day4[1] = sums.day4[1] + weather.list[i].wind.speed;
                        sums.day4[2] = sums.day4[2] + weather.list[i].main.humidity;
                        count.day4++;
                    }
                    else if (tempDate.getDate() === day5.getDate()) {
                        sums.day5[0] = sums.day5[0] + weather.list[i].main.temp;
                        sums.day5[1] = sums.day5[1] + weather.list[i].wind.speed;
                        sums.day5[2] = sums.day5[2] + weather.list[i].main.humidity;
                        count.day5++;
                    }
                    else{
                        console.log("Somethings wrong!!!");
                    }
                }

                console.log("Weather sums:\nTemp: " + sums.today[0] + sums.day1[0] + sums.day2[0] + sums.day3[0]+sums.day4[0]+sums.day5[0]
                + "\nWinds: " +sums.today[1]+sums.day1[1]+sums.day2[1]+sums.day3[1]+sums.day4[1]+sums.day5[1]
                + "\nHumidity: " +sums.today[2]+sums.day1[2]+sums.day2[2]+sums.day3[2]+sums.day4[2]+sums.day5[2]);

                console.log("Todays Avgs: " + (sums.today[0]/count.today) + (sums.today[1]/count.today) + (sums.today[2]/count.today));

                displayWeather(sums, count, [today,day1,day2,day3,day4,day5]);
            })
        }
    })
    
    function displayWeather(sums, count, daysList) {
        todayDetail.children[1].children[0].textContent = "Temperature: " + (sums.today[0]/count.today) + "°F";
        todayDetail.children[1].children[1].textContent = "Wind Speed: " + (sums.today[1]/count.today) + "mph";
        todayDetail.children[1].children[2].textContent = "Humidity: " + (sums.today[2]/count.today) + "%";

        for(let i = 0; i < daysDetail.children.length; i++) {
            daysDetail.children[i].children[0].children[0].textContent = daysList[i+1];
            daysDetail.children[i].children[0].children[1].children[0].textContent = "Temperature: " + (sums["day" + (i+1)][0]/count["day" + (i+1)]) + "°F";
            daysDetail.children[i].children[0].children[1].children[1].textContent = "Wind Speed: " + (sums["day" + (i+1)][1]/count["day" + (i+1)]) + "mph";
            daysDetail.children[i].children[0].children[1].children[2].textContent = "Humidity: " + (sums["day" + (i+1)][2]/count["day" + (i+1)]) + "%";
        }
    }
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
        // else if (tstomorrow) ... etc for 5 days}

    // calculate avg for all 6 days
}

