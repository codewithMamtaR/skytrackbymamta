
async function getweather() {
    const city=document.getElementById('cityInput').value;
    
    try {
        const response = await fetch(`https://weather-service-o92z.onrender.com/weather?city=${city}`);
    
        if (!response.ok) {
          throw new Error(`HTTP error | status: ${response.status}`);
        }
    
        // your backend sends { current: {...}, forecast: {...} }
        const { current, forecast } = await response.json();
    
        displayweather(current, forecast);
      } catch (error) {
        console.error('failed to fetch:', error);
        alert('Failed to fetch weather data. Please check city name or your internet.');
      }
    }
        

    
    

function displayweather(data,data1)
{
    const { main: {temp,humidity} ,weather, wind: {speed}, sys:{country},name }=data;
    const [ { main: weatherMain, description, icon}]=weather;
    const weatherDisplay=document.getElementById('weatherDisplay');
    const forecastDiv = document.getElementById('forecast');
    if( data.cod!= 200 )
    {
        weatherDisplay.innerHTML= ` <p> Error: ${data.message}  </p> `;
        return;

    }
  const condition = weatherMain.toLowerCase();
    
    let iconu = `https://openweathermap.org/img/w/${icon}.png`;
    
    if (condition === 'rain') {
      iconu = `https://openweathermap.org/img/w/09d.png`;
    }
    
  weatherDisplay.innerHTML = "";
  forecastDiv.innerHTML = "";




    const weatherHTML=`<h3>Today</h3><h2> ${name},${country}</h2>
    <p>Temp: ${temp} °C</p>
    <p>Weather: ${weatherMain} ${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind: ${speed}m/s</p>
    <img src = "${iconu}" > `;
    weatherDisplay.innerHTML=weatherHTML;


    const today = new Date().toISOString().split('T')[0];

       const dailyForecasts = data1.list.filter(item => {
        const date = item.dt_txt.split(' ')[0];
        return item.dt_txt.includes("12:00:00") && date !== today;
    });






    
    const heading = document.createElement('h2');
    heading.textContent = "4-Day Forecast";
    forecastDiv.prepend(heading);

    dailyForecasts.forEach(item => {
        const condition = item.weather[0].main.toLowerCase();
        const icon1=item.weather[0].icon;
        let iconu1 = `https://openweathermap.org/img/w/${icon1}.png`;
    
        if (condition === 'rain') {
          iconu1 = `https://openweathermap.org/img/w/09d.png`; // force rain icon
        }
        const div = document.createElement('div');
     
        div.innerHTML = `
          <strong style="margin-right:20px">${new Date(item.dt_txt).toDateString()}</strong>
          Temp: ${item.main.temp} °C
          Weather: ${item.weather[0].description}
           <img src="${iconu1}"> 
        <br><br>
        `;
        forecastDiv.appendChild(div);
      });
}