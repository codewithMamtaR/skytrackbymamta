const apikey="4e723fa07bb3f4dbdd3dbe2a2696ef56";

async function getweather() {
    const city=document.getElementById('cityInput').value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const furl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
    try{
    

        const [response, response1] = await Promise.all([
            fetch(url),
            fetch(furl)
        ]);
        if(!response.ok || !response1.ok)
        {
            throw new Error(`Http error |status:${response.status}`);
        }
        const data=await response.json();
        const data1=await response1.json();
        displayweather(data,data1);
    }

    catch(error){
        console.error('failed to fetch:',error);
        alert('Failed to fetch weather data.please check city name or check your internet.');

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
    <h4>Temperature:${temp}degree cent</h4>
    <p>weather:${weatherMain} ${description}</p>
    <p>humidity:${humidity}%</p>
    <p>wind:${speed}m/s</p>
    <img src = "${iconu}" > `;
    weatherDisplay.innerHTML=weatherHTML;


    
    const dailyForecasts = data1.list.filter(item => item.dt_txt.includes("12:00:00"));
    const heading = document.createElement('h2');
    heading.textContent = "5-Day Forecast";
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