//Weather App Project

const weatherForm=document.querySelector(".cityInfoForm")
const cityName=document.querySelector("#cityName")
const apiKey="a46454d9760bbc397df82a3099f59e41"
const weatherCard=document.querySelector(".weather-card")

weatherForm.addEventListener("submit",async event=>{
    errorDisplay("")
    event.preventDefault()
    const city=cityName.value
    if(city){
        try{
            const weatherData=await getWeatherData(city)
            displayWeatherInfo(weatherData)
        }
        catch(error){
            console.error(error)
            errorDisplay(error)
        }
    }
    else{
        errorDisplay("Please enter a city")
    }
})
async function getWeatherData(city){
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    if(!response.ok){
        // errorDisplay("Please enter a valid city")
        throw new Error("Could not fetch the weather data.")
    }
    return await response.json()
}
function displayWeatherInfo(data){
    const {name:city, main:{temp,humidity},weather:[{description,id}]}=data

    // document.getElementById("cityDisplay").textContent=`City name                : ${city}`
    // document.getElementById("humidityDisplay").textContent=`Humidity          : ${humidity}%`
    // document.getElementById("tempDisplay").textContent=`Temperature            : ${(temp-273).toFixed(1)}°C`
    // document.getElementById("descDisplay").textContent=`Sky information        : ${description}`
    // document.getElementById("cityDisplay").textContent += `${city}`;
    // document.getElementById("humidityDisplay").textContent += `${humidity}%`;
    // document.getElementById("tempDisplay").textContent += `${(temp - 273).toFixed(1)}°C`;
    // document.getElementById("descDisplay").textContent += `${description}`;

    document.getElementById("cityDisplay").innerHTML = `<pre>City Name                 :<span class="inline-container-styling">${city}</span></pre>`;
    document.getElementById("humidityDisplay").innerHTML = `<pre id="humidityDisplay">Humidity                   :<span class="inline-container-styling">${humidity}%</span></pre>`;
    document.getElementById("tempDisplay").innerHTML = `<pre id="tempDisplay">Temperature            :<span class="inline-container-styling">${(temp - 273).toFixed(1)}°C</span></pre>`;
    document.getElementById("descDisplay").innerHTML = `<pre id="descDisplay">Sky informaton        :<span class="inline-container-styling">${description}</span></pre>`;

    document.getElementById("weatherEmoji").style.fontSize="2rem"
    document.getElementById("weatherEmoji").textContent=getWeatherEmoji(id)

}
function getWeatherEmoji(weatherId){
    if(weatherId>=200 && weatherId<300){
        return "⛈️"
    }
    else if(weatherId>=300 && weatherId<400){
        return "🌦️"
    }
    else if(weatherId>=500 && weatherId<600){
        return "🌧️"
    }
    else if(weatherId>=600 && weatherId<700){
        return "❄️"
    }
    else if(weatherId>=700 && weatherId<800){
        return "🌫️"
    }
    else if (weatherId===800){
        return "☀️"
    }
    else if(weatherId>800 && weatherId<810){
        return "☁️"
    }
    else{
        return "❓"
    }
}
function errorDisplay(message){
    const errorMsg=document.getElementById("errorMsg")
    errorMsg.textContent=message
    errorMsg.style.visibility="visible"
    if(message){
        errorMsg.style.color="#ff0f0f"
    }
    document.getElementById("cityDisplay").innerHTML = `<pre>City Name                : </pre>`;
    document.getElementById("humidityDisplay").innerHTML = `<pre id="humidityDisplay">Humidity                  : </pre>`;
    document.getElementById("tempDisplay").innerHTML = `<pre id="tempDisplay">Temperature            : </pre>`;

    document.getElementById("descDisplay").innerHTML = `<pre id="descDisplay">Sky informaton        :<span class="inline-container-styling"></span></pre>`;
    document.getElementById("weatherEmoji").innerHTML=`<pre id="weatherEmoji">Weather condition   : </pre>`
}

function timeBasedBackground(){
    let hrs=new Date().getHours()
    let body=document.body
    if (hrs>6 && hrs<=18){
        body.classList.remove("morning-background","night-background")
        body.classList.add("morning-background")
    }
    else{
        body.classList.remove("morning-background","night-background")
        body.classList.add("night-background")
    }
}

window.onload=timeBasedBackground()
setInterval(timeBasedBackground,60000)