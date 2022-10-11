import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useCallback, useEffect, useState} from "react";

const fetchWeatherData = (city)=>{
  return new Promise((resolve, reject)=>{
    const apiKey  = "afba36cb728b0015985b3602269c9a11"
    const url = `https://api.openweathermap.org/data/2.5/weather?appid${apiKey}=&q=${city}&units=metric`
    axios.get(url).then(r=>{
      if (r?.status === 200){
        resolve(r?.data)
      }else{
        reject("SOMETHING WENT WRONG")
      }
    }).then(e=>{
      reject(e)
    })
  })
}

const App =()=>{
  const [weatherData, setWeatherData] = useState(null);
  const [cityInput, setCityInput] = useState("");

  const fetchWeatherDataCallback = useCallback((city)=>{
    return fetchWeatherData(city).then(response=>{
      setWeatherData(response);
    }).catch(error=>{
      // TODO: Set a warning message here
    })
  }, [weatherData, setWeatherData])

  useEffect(()=>{
    fetchWeatherDataCallback("Jakarta");
  }, [])

  useEffect(()=>{
    console.log(weatherData)
  }, [weatherData])

  return (
    <div className="container">
      <div className="form">
        <p>Enter City Name</p>
        <input type="text" onChange={(event)=>{
          setCityInput(event.target.value)
        }} /><br/><br/>
        <button type="button" onClick={()=>{
          fetchWeatherDataCallback(cityInput)
        }}>
          Fetch Data
        </button>
      </div>
      <div className="weather-info">
        <table align={"center"}>
          <tr>
            <th>City</th><td>{weatherData?.name}</td>
          </tr>
          <tr>
            <th>Temperature</th><td>{weatherData?.main?.temp}°C</td>
          </tr>
          <tr>
            <th>Humidity</th><td>{weatherData?.main?.humidity}%</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
