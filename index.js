const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
const userWeather = document.querySelector("#user-weather");
// console.log(userWeather);
const searchWeather = document.querySelector('#search-weather');
const searchBar = document.querySelector('.searchBar');
const grantAcess = document.querySelector('#grant-acess');
const accessBtn = document.querySelector('#btn');
const searchForm = document.querySelector('#searchForm');
const loading = document.querySelector('.loading');
const weatherInfo = document.querySelector('.weatherInfo');
// const formBtn = docunment.querySelector('#formBtn');
// const inputName = docunment.querySelector('#inputName');


let currentTab = userWeather;
searchBar.classList.add('deactive');
getSessionData();
userWeather.addEventListener('click',()=>{
    switching(userWeather);
});

searchWeather.addEventListener('click',()=>{
    switching(searchWeather);
})

function switching(newtab){
    if(currentTab != newtab){
        currentTab.classList.remove('currentTab');
        currentTab = newtab;
        currentTab.classList.add('currentTab');

        if(!searchBar.classList.contains('active')){
            grantAcess.classList.remove('active');
            weatherInfo.classList.remove('active');
            weatherInfo.classList.add('deactive')
            searchBar.classList.add('active');
            searchBar.classList.remove('deactive');
        }
        else {
            
            searchBar.classList.remove('active');
            searchBar.classList.add('deactive');
            weatherInfo.classList.add('active');
            getSessionData();
        }
    }
}
function getSessionData(){
    const localData = sessionStorage.getItem("user-coordinates");
    // console.log("HIII");
    if(!localData){
        // console.log("HIII");
        grantAcess.classList.add('active');
        loading.classList.remove('active');
        weatherInfo.classList.remove('active');
        loading.classList.add('deactive');
        weatherInfo.classList.add('deactive');
    }
    else {
        // loading.classList.add('active');
        grantAcess.classList.add('deactive');
        // loading.classList.remove('deactive');
        weatherInfo.classList.remove('deactive');
        // loading.classList.add('active');
        weatherInfo.classList.add('active');
        const coordinates = JSON.parse(localData);
        console.log(coordinates);
        fetchApiUserData(coordinates);
    }
}
async function fetchApiUserData(coordinates){
    const {lat,lon} = coordinates;
    console.log("HJIII");
    loading.classList.add('active');
    loading.classList.remove('deactive');

    try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        let newData = await data.json();
        console.log(newData);
        loading.classList.add('deactive');
        weatherInfo.classList.add('active');
        renderData(newData);
    }catch(e){
        // 
        console.log('HII EE');
        loading.classList.remove('active');
    }
}

function renderData(newData){
    loading.classList.add('deactive');
    weatherInfo.classList.remove('deactive');
    weatherInfo.classList.add('active');
    console.log('HII');
    const cityName = document.querySelector('.cityName');
    const countryCode = document.querySelector('#country-code');
    const weatherType = document.querySelector('#lana');
    const weatherTypeIcon = document.querySelector('#lana-icon');
    const temperature = document.querySelector('.temp');
    const winspeed = document.querySelector('.windspeed-data');
    const humidity = document.querySelector('.humidity-data');
    const cloud = document.querySelector('.cloud-data');
    
    cityName.innerText = newData?.name;
    countryCode.src = `https://flagcdn.com/144x108/${newData?.sys?.country.toLowerCase()}.png`;
    weatherType.innerText = newData?.weather?.[0]?.main;
    weatherTypeIcon.src = `http://openweathermap.org/img/w/${newData?.weather?.[0].icon}.png`;
    temperature.innerText = `${newData?.main?.temp} C`;
    winspeed.innerText = newData?.wind?.speed;
    humidity.innerText = newData?.main?.humidity;
    cloud.innerText = newData?.clouds?.all;
}

function getUserLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
      }
}
function showPosition(position){
    const userCoordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude
    };
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchApiUserData(position);
}
accessBtn.addEventListener('click',()=>{
    getUserLocation();
})
let inputText = document.querySelector('#inputData');
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(inputText.value === null) return ;

    fetchApiCityName(inputText.value);
});
async function fetchApiCityName(city){
    weatherInfo.classList.remove('active');
    weatherInfo.classList.add('deactive');
    loading.classList.add('active');
    loading.classList.remove('deactive');
    try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let newData = await data.json();
        console.log(newData);
        loading.classList.remove('active');
        loading.classList.add('deactive');
        weatherInfo.classList.add('active');
        renderData(newData); 
    }catch(e){
        // 
        console.log('HII EE');
        loading.classList.remove('active');
    }
}
