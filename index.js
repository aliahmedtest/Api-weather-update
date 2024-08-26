let today = document.querySelector(".today");
let month = document.querySelector(".month");
let locationCity = document.querySelector(".locationCity");
let responseData;
let tembC = document.querySelector(".tembC");
let todayWeather = document.querySelector(".todayWeather");
let todayDesc = document.querySelector(".todayDesc");
let moisture = document.querySelector(".moisture");
let wind = document.querySelector(".wind");
let nextDay = document.querySelectorAll(".nextDay");
let nextTodayWeather=document.querySelectorAll(".nextTodayWeather");
let maxTemb=document.querySelectorAll(".maxTemb");
let minTemb=document.querySelectorAll(".minTemb");
let nexDayDesc=document.querySelectorAll(".nexDayDesc");
let inputSearch=document.querySelector(".inputSearch"); 



let monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function getWeather(mainCity){
    let apiResponse=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q==${mainCity}&days=3`);
    responseData=await apiResponse.json();
    console.log(responseData);
    displayWeather();
    displayWeatherNextDays();
}
getWeather("Alexandria");

function displayWeather(){
    let currenDate=new Date();
    today.innerHTML=days[currenDate.getDay()];
    month.innerHTML=`${currenDate.getDate()} ${monthName[currenDate.getMonth()]}`;
    locationCity.innerHTML=responseData.location.name;
    tembC.innerHTML=responseData.current.temp_c+" ℃";
    todayWeather.setAttribute("src",`https:${responseData.current.condition.icon}`);
    todayDesc.innerHTML=responseData.current.condition.text;
    moisture.innerHTML=responseData.current.humidity+"%";
    wind.innerHTML=responseData.current.wind_kph+" km/h";
    wind.nextElementSibling.innerHTML=" "+responseData.current.wind_dir;
}

function displayWeatherNextDays(){
    for (let i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML=days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
        nextTodayWeather[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxTemb[i].innerHTML=responseData.forecast.forecastday[i+1].day.maxtemp_c+" ℃";
        minTemb[i].innerHTML=responseData.forecast.forecastday[i+1].day.mintemp_c+" ℃";
        nexDayDesc[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text;

    }
   
}

inputSearch.addEventListener("keyup",function(){
    let currentCity=inputSearch.value;
    getWeather(currentCity)
})





