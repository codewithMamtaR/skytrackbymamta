

//code to get weather info from weather-service app which is an app/service developed by me which 
//actually gets weather info from openweather.org .I made a service so that i can hide API key


async function getweather() {
    //get city from the user  using DOM
    const city=document.getElementById('cityInput').value;
    
    try {
        //making a request to get weather info from weather-service
        const response = await fetch(`https://weather-service-o92z.onrender.com/weather?city=${city}`);
      //handle the error if there is a problem fetching data
        if (!response.ok) {
          throw new Error(`HTTP error | status: ${response.status}`);
        }
    
        //we get current weather info and forecast info from weather-service in two variables current and forecast
        const { current, forecast } = await response.json();
        //calling the fun displayweather to display weather info like temp,weather,humidity and wind
        displayweather(current, forecast);
      } 
      //handle the error if user leaves the input empty or incorrect city name
      catch (error) {
        console.error('failed to fetch:', error);
        alert('Failed to fetch weather data. Please check city name or your internet.');
      }
    }
        
function displayweather(data,data1)
{
    const ra= './images/rain.png';
    const cl='./images/cloudy.png';
  //we are extracting info from data and data1 in our local variables
    const { main: {temp,humidity} ,weather, wind: {speed}, sys:{country},name }=data;
    const [ { main: weatherMain, description, icon}]=weather;
    //we have two divs weatherDisplay and forecast devoted for displaying weather info iin index.html
    //we will be using innerHTML property of HTML to read weatherHTML which  is filled with data from openweather  
    const rs=document.getElementById('res');

    const frs=document.getElementById('foreres');    
    const weatherDisplay=document.getElementById('weatherDisplay');
    const forecastDiv = document.getElementById('forecast');
    const place=document.getElementById('placename');
    rs.style.display='flex';
    //if API response from weather-service fails we will return instead of proceeding further
    frs.style.display='flex';
    if( data.cod!= 200 )
    {
        weatherDisplay.innerHTML= ` <p> Error: ${data.message}  </p> `;
        return;

    }
    //if its rain in a particular city display rain icon
    const condition = weatherMain.toLowerCase();
    
    let iconu = cl;
    
    if (condition === 'rain') {
      iconu = ra;
    }
  //we need to clear the old weather info before displaying the new info
    weatherDisplay.innerHTML = "";
    forecastDiv.innerHTML = "";
    place.innerHTML="";


//displaying temp,weather,humidity,wind to the user
const phtml=`<h3>Today</h3><br>
 <img src = "${ra}"  style="max-width:100%; height:auto;width:30px; height:40px;"><br>
<h1> ${name}</h1>`;
place.innerHTML=phtml;

    const weatherHTML=`
    <h2>Temperature:</h2> <h1>${temp} °C</h1>
    <p>Weather: ${weatherMain} ${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind: ${speed}m/s</p>
    `;
    weatherDisplay.innerHTML=weatherHTML;

//get today's date
    const today = new Date().toISOString().split('T')[0];
    //we have extracted all info from data1 which we have received as response from weather-service 
    // and stored in dailyForecasts and after that we will filter it for 4 days only
    //get forecast details at 12:00 PM only  for five days and leave todays forecast because we have already displayed it
    const dailyForecasts = data1.list.filter(item => {
          const date = item.dt_txt.split(' ')[0];
          return item.dt_txt.includes("12:00:00") && date !== today;
                                                      });
  //we will display forecast to the user with the heading 4 day forecast
  
    const heading = document.createElement('h2');
    heading.textContent = "4-Day Forecast";
    forecastDiv.prepend(heading);
//we will browse 4 day forecast and display the info one by one  
    dailyForecasts.forEach(item => {
        const condition = item.weather[0].main.toLowerCase();
        
        let iconu1 = cl;
        
    //we are displaying icons according to data like if its rainy  or cloudy
        if (condition === 'rain') {
              iconu1=ra;
        }
        const div = document.createElement('div');
        const dateStr = new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric"
        });


     //displaying forecast to the user
     div.innerHTML = `
     <div class="fore" >
       <strong>${dateStr}</strong>
       <span>${item.main.temp} °C</span>
       <img class="myimg"  src="${iconu1}" style="; max-width:30px; height:auto;">
     </div>
     <br><br>
   `;
 forecastDiv.appendChild(div);
      });
}