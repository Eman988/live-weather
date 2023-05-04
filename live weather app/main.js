let CITY_NAME='';
const WEATHER_API_KEY = 'bdeae20dc9f40c8c25ee0a08561006c7';
const PIXAPAY_API_KEY = '17968361-06a3be4412697d5e542635e91';
let currentDate = new Date();


const weatherInfo = async ()=>{
    try{
        const BASEURL_WEATHER =`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${WEATHER_API_KEY}&units=metric`;
        let weatherResponse = await fetch(BASEURL_WEATHER);
        console.log(weatherResponse);
        let jsonWeatherResponse = await weatherResponse.json();
        //console.log(jsonWeatherResponse.main.temp);
        let weatherTemp = jsonWeatherResponse.main.temp;
        let weatherDescription = jsonWeatherResponse.weather[0].description;
        let weatherFeelsLike = jsonWeatherResponse.main.feels_like;
        document.getElementById('description').innerText= `The weather in ${CITY_NAME} is ${weatherDescription}`;
        document.getElementById('temp').innerText = `Temprature is: ${weatherTemp}`;
        document.getElementById('feelsLike').innerText = `Feels Like: ${weatherFeelsLike}`;
        document.getElementById('lastUpdated').innerText = `Last updated on ${currentDate}`
              
        
    }
    catch(err){

    }
}
const pixaInfo = async ()=>{
    try{
        const BASEURL_PIXAPAY =`https://pixabay.com/api/?q=${CITY_NAME}&key=${PIXAPAY_API_KEY}`;
        let pixaResponse = await fetch(BASEURL_PIXAPAY);
        let jsonPixaResponse = await pixaResponse.json();
        //console.log(jsonPixaResponse.hits[0].webformatURL);
        let img = jsonPixaResponse.hits[0].webformatURL
        //document.getElementById("myImg").src = "hackanm.gif";
        const cardSection = document.getElementById('card-section');
        if(cardSection.style.visibility === "hidden"){
            cardSection.style.visibility =  "visible";
            
            document.getElementById('cityImg').src = `${img}`;
            document.getElementById('cityImg').alt = `${CITY_NAME}`;
            document.getElementById('cityName').innerText = `${CITY_NAME}`;
        }
        
    }
    catch(err){

    }
}
const updateUI = ()=>{
   
    weatherInfo();
    pixaInfo();
    return true;
}

const getCapital = async ()=>{

    let  COUNTRY_NAME = document.getElementById('exampleInputCityName').value;
    let countryUrl = `https://restcountries.com/v3.1/name/${COUNTRY_NAME}?fullText=true`;
    //let  CITY_NAME = document.getElementById('exampleInputCityName').value;
    try{
    let capitalResponse = await fetch (countryUrl);
    let jsonCapitalResponse = await capitalResponse.json();
    console.log(jsonCapitalResponse[0].capital[0]);
    CITY_NAME = jsonCapitalResponse[0].capital[0];
    updateUI();
    }catch{
        document.getElementById('cityName').innerText = `country ${COUNTRY_NAME} does not exist`;

    }
    
}