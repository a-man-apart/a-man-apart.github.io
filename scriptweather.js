//const key = "50e72e52ec3c907f32fdf091ccb0ed10";
//const key = "7d0265ac9bfc1740a1879239981cec78";
const key = "b40375fbb2f5e343f56a0e8e313ad655";
let cnt;
let period = document.querySelector(".selected-period");
console.log("Perioada: ", period.value);

 if (period.value == "12h") {
    cnt = 4;
 } else if (period.value == "24h") {
    cnt = 8;
    document.getElementById("container-1").style.display = "flex";
    document.getElementById("container-2").style.display = "flex";
    document.getElementById("container-3").style.display = "none";
    document.getElementById("container-4").style.display = "none";
 } else if (period.value == "36h") {
    cnt = 12;
 } else {
    cnt = 16;
 };
 console.log("CNT: ", cnt);

const select = document.querySelector(".form-select");



const city = document.querySelectorAll(".city");
const temp = document.querySelectorAll(".temp");
const icon = document.querySelectorAll(".icon");
const weatherType = document.querySelectorAll(".weather-type");
const date = document.querySelectorAll(".date");
const time = document.querySelector(".time-zone-value");
const interval = document.querySelectorAll(".interval");
const wind = document.querySelectorAll(".wind");
const humidity = document.querySelectorAll(".humidity");
const atmp = document.querySelectorAll(".atmp");

let longitude;
let latitude;



const kelvinToCelsius = (degrees) => {
    const celsius = degrees - 273.15;
    return celsius.toFixed(1);
};

const getCities = () => {
    fetch(`citiesweather.json`, {
    method: 'GET',
        })
    .then((response) => response.json())
    .then((data) => {
//console.log("Data: ",data);
        data.forEach(city => {
            const option = document.createElement("option");
            option.value = city.id;
            option.text = city.name;

                if(city.id == 683844) {
                    //option.selected = true;
                    option.setAttribute("selected", true);
                };

            select.appendChild(option);    
        });

        
       
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const getCoordinates = (cityName = "Brasov") => {
    fetch(`citiesweather.json`, {
        method: 'GET',
            })
        .then((response) => response.json())
        .then((data) => {

            let cityLat = data.filter(l => {
                return (l.name == cityName);
            });
            
            latitude = cityLat[0].coord.lat.toFixed(3);

            cityLon = data.filter(l => {
                return (l.name == cityName);  
            });

            longitude = cityLon[0].coord.lon.toFixed(3);

            console.log("Latitudine: ", latitude);
            console.log("Longitudine: ", longitude);
            
            const getHour = () => {
                fetch(`https://api.ipgeolocation.io/timezone?apiKey=e332ea37782c48b6969738785363d886&lat=${latitude}&long=${longitude}`
                    //`https://timeapi.io/api/Time/current/coordinate?latitude=40.4&longitude=-3.7`
                    , {
                    method: 'GET',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',
                       // 'Access-Control-Allow-Origin': '*'},
                        },
                    //mode: 'no-cors'
                        })
    
                    .then((response) => response.json())
                    .then((data) => {

            console.log("DataHour: ", data);
            
                    let hour = data.date_time.slice(11, 20);
                    console.log("Hour: ", hour);
                    time.innerText = hour;
                       
                    let array = ["00:00:00", "03:00:00", "06:00:00", "09:00:00", "12:00:00", "15:00:00", "18:00:00", "21:00:00", "00:00:00", "03:00:00", "06:00:00", "09:00:00", "12:00:00", "15:00:00", "18:00:00", "21:00:00", "00:00:00", "03:00:00", "06:00:00", "09:00:00", "12:00:00", "15:00:00", "18:00:00", "21:00:00"];
                        
                    let ora = hour.slice(0, 2);
                    console.log("Ora: ", ora);

                        if (ora >= 00 && ora <= 02) {
                            for (let i = 0; i < cnt; i++) {
                                interval[i].innerText = `${array[i]} - ${array[i+1]}`;
                            };
                        } else if (ora >= 03 && ora <= 05) {
                            for (let i = 1; i < (cnt+1); i++) {
                                interval[i-1].innerText = `${array[i]} - ${array[i+1]}`;
                            };
                        } else if (ora <= 06 && ora <= 08) {
                            for (let i = 2; i < (cnt+2); i++) {
                                interval[i-2].innerText = `${array[i]} - ${array[i+1]}`;
                            }; 
                        } else if (ora >= 09 && ora <= 11) {
                            for (let i = 3; i < (cnt+3); i++) {
                                interval[i-3].innerText = `${array[i]} - ${array[i+1]}`;
                            }; 
                        } else if (ora >= 12 && ora <= 14) {
                            for (let i = 4; i < (cnt+4); i++) {
                                interval[i-4].innerText = `${array[i]} - ${array[i+1]}`;
                            };
                        } else if (ora >= 15 && ora <= 17) {
                            for (let i = 5; i < (cnt+5); i++) {
                                interval[i-5].innerText = `${array[i]} - ${array[i+1]}`;
                            }; 
                        } else if (ora >= 18 && ora <= 20) {
                            for (let i = 6; i < (cnt+6); i++) {
                                interval[i-6].innerText = `${array[i]} - ${array[i+1]}`;
                            };
                        } else if (ora >= 21 && ora <= 23) {
                            for (let i = 7; i < (cnt+7); i++) {
                                interval[i-7].innerText = `${array[i]} - ${array[i+1]}`;
                            };
                        };
                    //interval[i].innerText = `${data.list[i].dt_txt.slice(11)} - ${data.list[i+1].dt_txt.slice(11)}`;
                    //time.innerText = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
                    // for (let i = 0; i < interval.length; i++) {
                    //     // interval[i].innerText = "12:00:00 - 15:00:00";
                    // };
                      
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                    
            };
            
            console.log('Success:', data);

            return getHour();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


const getWeather = (cityId = 683844) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&cnt=${cnt}&appid=${key}`, {
    method: 'GET',
        })
    .then((response) => response.json())
    .then((data) => {

        // const oras = data.filter (c => {
        //    return (c.id == cityId);
        // }).name;
        // console.log("Oras: ", oras);

        //city.innerText = data.city.name;
        for (let i = 0; i < city.length; i++) {
            city[i].innerText = data.city.name;
        }
        //temp.innerText = kelvinToCelsius(data.list[0].main.temp) + `\xB0C`;
        for (let i = 0; i < cnt; i++) {
            temp[i].innerText = kelvinToCelsius(data.list[i].main.temp) + `\xB0C`;
        }
        //icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        for (let i = 0; i < cnt; i++) {
            icon[i].src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
        }
        weatherType.innerText = firstToUppercase1 (data.list[0].weather[0].description);
        for (let i = 0; i < cnt; i++) {
            weatherType[i].innerText = firstToUppercase1 (data.list[i].weather[0].description);
        }

        // Pune prima litera mare doar la primul cuvant
        function firstToUppercase1 (names) {

            return names[0].toUpperCase() + names.slice(1);

        }

        //Daca vrem informatiile doar pentru un anumit intervat alral 
        //filtram informatiile la nivel de Array (list)
        // data = data.list.filter(r => {
        
        //     return (r.dt_txt == "2022-10-26 12:00:00" || r.dt_txt == "2022-10-26 15:00:00");
            
        // });
        console.log("Data: ", data);


        //wind.innerText = `Wind: ${data[0].wind.speed} m/s`;
        for (let i = 0; i < cnt; i++) {
            wind[i].innerText = `Wind: ${data.list[i].wind.speed} m/s`;
        }
        //humidity.innerText = `Humidity: ${data[0].main.humidity}%`;
        for (let i = 0; i < cnt; i++) {
            humidity[i].innerText = `Humidity: ${data.list[i].main.humidity}%`;
        }
        //atmp.innerText = `Pressure: ${data[0].main.pressure} hPa`;
        for (let i = 0; i < cnt; i++) {
            atmp[i].innerText = `Pressure: ${data.list[i].main.pressure} hPa`;
        }

        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

getCities();
getWeather();
getCoordinates();
setInterval (() => {
    getCoordinates();
}, 30000);

let cityId;
let cityName;

select.addEventListener("change", function(e) {
    cityId = e.target.value;
    cityName = e.target[e.target.selectedIndex].text;
    console.log("cityId: ", cityId);
    console.log("cityName: ", cityName);
    getWeather(cityId);
    getCoordinates(cityName);
});



period.addEventListener("change", function(e) {
    if (period.value == "12h") {
        cnt = 4;
        document.getElementById("container-1").style.display = "flex";
        document.getElementById("container-2").style.display = "none";
        document.getElementById("container-3").style.display = "none";
        document.getElementById("container-4").style.display = "none";
     } else if (period.value == "24h") {
        cnt = 8;
        document.getElementById("container-1").style.display = "flex";
        document.getElementById("container-2").style.display = "flex";
        document.getElementById("container-3").style.display = "none";
        document.getElementById("container-4").style.display = "none";
     } else if (period.value == "36h") {
        cnt = 12;
        document.getElementById("container-1").style.display = "flex";
        document.getElementById("container-2").style.display = "flex";
        document.getElementById("container-3").style.display = "flex";
        document.getElementById("container-4").style.display = "none";
     } else if (period.value == "48h") {
        cnt = 16;
        document.getElementById("container-1").style.display = "flex";
        document.getElementById("container-2").style.display = "flex";
        document.getElementById("container-3").style.display = "flex";
        document.getElementById("container-4").style.display = "flex";
     };
     console.log("CNT: ", cnt);
    getWeather(cityId);
    getCoordinates(cityName);
});
