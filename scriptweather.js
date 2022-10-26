//const key = "50e72e52ec3c907f32fdf091ccb0ed10";
//const key = "7d0265ac9bfc1740a1879239981cec78";
const key = "b40375fbb2f5e343f56a0e8e313ad655";
const cnt = 9;


const select = document.querySelector(".form-select");



const city = document.querySelectorAll(".city");
const temp = document.querySelectorAll(".temp");
const icon = document.querySelectorAll(".icon");
const weatherType = document.querySelectorAll(".weather-type");
const date = document.querySelectorAll(".date");
const time = document.querySelectorAll(".time");
const wind = document.querySelectorAll(".wind");
const humidity = document.querySelectorAll(".humidity");
const atmp = document.querySelectorAll(".atmp");




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

const getWeather = (cityId = 683844) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&cnt=${cnt}&appid=${key}`, {
    method: 'GET',
        })
    .then((response) => response.json())
    .then((data) => {

        //city.innerText = data.city.name;
        for (let i = 0; i < city.length; i++) {
            city[i].innerText = data.city.name;
        }
        //temp.innerText = kelvinToCelsius(data.list[0].main.temp) + `\xB0C`;
        for (let i = 0; i < temp.length; i++) {
            temp[i].innerText = kelvinToCelsius(data.list[i].main.temp) + `\xB0C`;
        }
        //icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        for (let i = 0; i < icon.length; i++) {
            icon[i].src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
        }
        weatherType.innerText = firstToUppercase1 (data.list[0].weather[0].description);
        for (let i = 0; i < weatherType.length; i++) {
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

        //const date = new Date();

        for (let i = 0; i < date.length; i++) {
            //for(let j = 0; j < cnt; j++) {}
            date[i].innerText = `${data.list[i].dt_txt.slice(0, 10)}`;
        }
        //time.innerText = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
        for (let i = 0; i < time.length; i++) {
            //for(let j = 0; j < cnt; j++) {}
            time[i].innerText = `${data.list[i].dt_txt.slice(11)} - ${data.list[i+1].dt_txt.slice(11)}`;
        }
        //wind.innerText = `Wind: ${data[0].wind.speed} m/s`;
        for (let i = 0; i < wind.length; i++) {
            wind[i].innerText = `Wind: ${data.list[i].wind.speed} m/s`;
        }
        //humidity.innerText = `Humidity: ${data[0].main.humidity}%`;
        for (let i = 0; i < humidity.length; i++) {
            humidity[i].innerText = `Humidity: ${data.list[i].main.humidity}%`;
        }
        //atmp.innerText = `Pressure: ${data[0].main.pressure} hPa`;
        for (let i = 0; i < atmp.length; i++) {
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

select.addEventListener("change", function(e) {
    const cityId = e.target.value;
    console.log("cityId: ", cityId);
    getWeather(cityId);
});