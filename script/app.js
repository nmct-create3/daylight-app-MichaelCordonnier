// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
  //Get hours from milliseconds
  const date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  const hours = "0" + date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp (gebruiken we nu niet)
  // const seconds = '0' + date.getSeconds();

  // Will display time in 10:30(:23) format
  return hours.substr(-2) + ":" + minutes.substr(-2); //  + ':' + s
}

// 5 TODO: maak updateSun functie
const updateSun = (sunElement) => {
  

  
};

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise) => {
  // In de functie moeten we eerst wat zaken ophalen en berekenen.
  // Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
  // Bepaal het aantal minuten dat de zon al op is.
  // Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
  // We voegen ook de 'is-loaded' class toe aan de body-tag.
  // Vergeet niet om het resterende aantal minuten in te vullen.
  // Nu maken we een functie die de zon elke minuut zal updaten
  // Bekijk of de zon niet nog onder of reeds onder is
  // Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
  // PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
  const sunHtml = document.querySelector(".js-sun");
  const minutesLeftHtml = document.querySelector(".js-time-left");

  const now = new Date();

  

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const totalMinutesPassed = currentHour * 60 + currentMinute;

  


  const sunriseDateFormat = new Date(sunrise * 1000);
  const sunriseInMinutes = sunriseDateFormat.getHours() * 60 + sunriseDateFormat.getMinutes();

  const sunsetInMinutes  = Math.round(sunriseInMinutes + totalMinutes);



  const minutesSunLeft = sunsetInMinutes - totalMinutesPassed;
  const timeNow = currentHour + ":" + currentMinute;

  console.log(timeNow);

  sunHtml.dataset.time = timeNow;

  if (totalMinutesPassed > sunriseInMinutes && totalMinutesPassed < sunsetInMinutes) {
    const percentage = ((totalMinutesPassed - sunriseInMinutes) / (sunsetInMinutes - sunriseInMinutes)) * 100;
    sunHtml.style.left = percentage + "%";
    sunHtml.style.bottom = percentage + "%";
    minutesLeftHtml.innerHTML = minutesSunLeft;
  } else {
    document.querySelector("html").classList.add("is-night");
    document.querySelector(".c-app__summary").innerHTML = "De zon is onder, we gaan slapen!";
  }
};
// 3 Met de data van de API kunnen we de app opvullen
let showResult = (queryResponse) => {
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
  // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
  // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.

  const locationHtml = document.querySelector(".js-location");
  const sunriseHtml = document.querySelector(".js-sunrise");
  const sunsetHtml = document.querySelector(".js-sunset");

  locationHtml.innerHTML = `${queryResponse.city.name}, ${queryResponse.city.country}`;

  const sunrise = _parseMillisecondsIntoReadableTime(queryResponse.city.sunrise);

  const sunset = _parseMillisecondsIntoReadableTime(queryResponse.city.sunset);

  sunriseHtml.innerHTML = sunrise;
  sunsetHtml.innerHTML = sunset;

  const differenceInMinutes = (queryResponse.city.sunset - queryResponse.city.sunrise) / 60;

  const timeSunrise = queryResponse.city.sunrise;
  
  placeSunAndStartMoving(differenceInMinutes, timeSunrise);
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = (lat, lon) => {
  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  // Als dat gelukt is, gaan we naar onze showResult functie.
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f8461a1b7f9d3b9337c30aceaf5999c4&units=metric&lang=nl&cnt=1`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showResult(data);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  // 1 We will query the API with longitude and latitude.
  console.log("starten api");
  getAPI(50.8027841, 3.2097454);
});
