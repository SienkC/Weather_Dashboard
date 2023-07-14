
// save city lat and long in local storage and create button for it

var cityName = document.querySelector("#getCityName");
var submitCityEl = document.querySelector("#search");
var todayDetail = document.querySelector("#today");
var daysDetail = document.querySelector("#days");
var memory = document.querySelector("#memory");
var allCities = JSON.parse(localStorage.getItem("cities"));


// show any previous cities
if(allCities !== null){
    for(let i = 0; i < allCities.length; i++) {
        var city = document.createElement("button");
        city.textContent = allCities[i][0];
        city.setAttribute("class", "btn btn-primary");
        city.setAttribute("type", "button");

        city.addEventListener("click", function (event){
            todayDetail.children[0].textContent = allCities[i][0];
            getWeather(allCities[i][1], allCities[i][2]);
        })

        memory.appendChild(city);
    }
}

submitCityEl.addEventListener("click", function (event){
    if(cityName.value.trim()){
        // test city name
        console.log("test:" + cityName.value.trim());

        getLongLat(cityName.value.trim());
    }
});

function getLongLat(city){
    // // Test long and lat:
    // // Lat: 28.5421109
    // // Long: -81.3790304
    // getWeather(28.5421109,-81.3790304);

    todayDetail.children[0].textContent = city;
    // add api key to make working url
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=64c7e1cf4f2a2a2d1abd02e09dd89b2b";

    // get lat and long
    fetch(geoUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (cityDetails) {
                // save lat and long in localstorage with city name
                console.log(cityDetails);

                getWeather(cityDetails[0].lat, cityDetails[0].lon);
                saveLongLat(city, cityDetails[0].lat, cityDetails[0].lon);
            })
        }
        else {
            alert("Error: " + response.statusText);
        }
    })
}

function getWeather(lat, long){

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
        // add weather details to today section of page
        todayDetail.children[1].textContent = daysList[0].toDateString();
        // Find average of each weather topic and round to 2 decimals
        todayDetail.children[2].children[0].textContent = "Temperature: " + (Math.round((sums.today[0]/count.today)*100)/100) + "°F";
        todayDetail.children[2].children[1].textContent = "Wind Speed: " + (Math.round((sums.today[1]/count.today)*100)/100) + "mph";
        todayDetail.children[2].children[2].textContent = "Humidity: " + (Math.round((sums.today[2]/count.today)*100)/100) + "%";

        // loop through the next 5 days and display values similar to method above
        for(let i = 0; i < daysDetail.children.length; i++) {
            daysDetail.children[i].children[0].children[0].textContent = daysList[i+1].toDateString();
            daysDetail.children[i].children[0].children[1].children[0].textContent = "Temperature: " + (Math.round((sums["day" + (i+1)][0]/count["day" + (i+1)])*100)/100) + "°F";
            daysDetail.children[i].children[0].children[1].children[1].textContent = "Wind Speed: " + (Math.round((sums["day" + (i+1)][1]/count["day" + (i+1)])*100)/100) + "mph";
            daysDetail.children[i].children[0].children[1].children[2].textContent = "Humidity: " + (Math.round((sums["day" + (i+1)][2]/count["day" + (i+1)])*100)/100) + "%";
        }
    }
}

function saveLongLat(city, lat, long) {
    var cities = [];
    var saveCity = [city, lat, long];

    var pastCities = JSON.parse(localStorage.getItem("cities"));

    // save previous cities, so they don't get overridden
    if(JSON.parse(localStorage.getItem("cities")) !== null){
        cities = cities.concat(pastCities);
    }

    // add on new city info
    cities.push(saveCity);

    // add to local storage
    localStorage.setItem("cities", JSON.stringify(cities));
}