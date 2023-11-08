// Updates clock of local clock from machine
setInterval(() => {
    const d = new Date();
    let clockText = d.toLocaleTimeString().slice(0,5)
    document.getElementById("clock").innerText= clockText
}, 1000);

// Gets local date from machine to a string
const d = new Date();
const dateDay = d.toLocaleDateString().slice(8);
const dateMonth = d.toLocaleDateString().slice(5,7);
let dateMonthNumber = parseFloat(dateMonth);

// Display previous, current and next month
switchDate(dateMonthNumber-1);
switchDate(dateMonthNumber);
switchDate(dateMonthNumber+1);
// Display current day
document.getElementById("dateDay").innerText=dateDay;
// info for developer
console.log(dateMonthNumber);

// Array for icons to display weather
const weatherSymbol = [
    "",
    "fa-solid fa-sun",
    "fa-solid fa-cloud-sun",
    "fa-solid fa-cloud",
    "fa-solid fa-cloud-sun",
    "fa-solid fa-cloud",
    "fa-solid fa-cloud",
    "fa-solid fa-smog",
    "fa-solid fa-cloud-rain",
    "fa-solid fa-cloud-showers-heavy",
    "fa-solid fa-cloud-showers-water",
    "fa-solid fa-cloud-bolt",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-umbrella",
    "fa-solid fa-umbrella",
    "fa-solid fa-umbrella",
    "fa-solid fa-bolt",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake",
    "fa-solid fa-snowflake"

];

// Info for developer
console.log(weatherSymbol);

// Display first weather
fetchWeather();
// Updates current weather after 10min
setInterval(() => {
    fetchWeather();
}, 300000);

// Display first advice
fetchRandomAdvice();
// Updates with new advice after 30min
setInterval(() => {
    fetchRandomAdvice();
}, 1800000 );

// Fetch random advice API
async function fetchRandomAdvice(){
    const response = await fetch("https://api.adviceslip.com/advice");
    const responseData = await response.json();
    document.getElementById("randomAdvice").innerText=`"` + responseData.slip.advice + `"`;
}

// Fetch weather from Helsingborg
async function fetchWeather(){
    const response = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/12.694512/lat/56.046467/data.json");
    const responseData = await response.json();
    // Info for developer
    console.log(responseData);
    document.getElementById("temp").innerHTML=Math.round(responseData.timeSeries[0].parameters[10].values) + "°";
    document.getElementById("weatherSymbol").setAttribute("class", weatherSymbol[responseData.timeSeries[0].parameters[18].values]);
    // Info for developer
    console.log(responseData.timeSeries[0].parameters[18].values);
    const tempPerDay = document.getElementById("tempPerDay");
    tempPerDay.innerHTML="";
    
    // Display weather for 7 hour forwards
    for(let i = 1; i<7; i++){
        const addI = document.createElement("i");
        tempPerDay.append(addI);
        addI.setAttribute("class", weatherSymbol[responseData.timeSeries[i].parameters[18].values]);
    }
}

// Switch for display month in text. P.S can be done with an array
function switchDate(date){
    switch (date){
        case 1:
            document.getElementById("dateMonth").innerHTML+="<p>Januari</p>";
            break;
        
        case 2:
            document.getElementById("dateMonth").innerHTML+="<p>Februari</p>";
            break;

        case 3:
            document.getElementById("dateMonth").innerHTML+="<p>Mars</p>";
            break;

        case 4:
            document.getElementById("dateMonth").innerHTML+="<p>April</p>";
            break;

        case 5:
            document.getElementById("dateMonth").innerHTML+="<p>Maj</p>";
            break;

        case 6:
            document.getElementById("dateMonth").innerHTML+="<p>Juni</p>";
            break;

        case 7:
            document.getElementById("dateMonth").innerHTML+="<p>Juli</p>";
            break;

        case 8:
            document.getElementById("dateMonth").innerHTML+="<p>Augusti</p>";
            break;

        case 9:
            document.getElementById("dateMonth").innerHTML+="<p>September</p>";
            break;

        case 10:
            document.getElementById("dateMonth").innerHTML+=`<p>Oktober</p>`;
            break;

        case 11:
            document.getElementById("dateMonth").innerHTML+=`<p>November</p>`;
            break;

        case 12:
            document.getElementById("dateMonth").innerHTML+="<p>December</p>";
            break;
    }
}