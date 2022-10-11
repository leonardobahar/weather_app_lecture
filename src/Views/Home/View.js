import {useEffect, useState} from "react";
import './index.css';
import useFetchWeather from "../../Hooks/useFetchWeather";
import {Button, TextField} from "@mui/material";

const View = ()=>{
  // Hooks call
  const [ fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();

  const [cityInput, setCityInput] = useState("");

  useEffect(()=>{
    fetchWeatherDataCallback("Jakarta");
  }, [fetchWeatherDataCallback])

  useEffect(()=>{
    console.log(weatherData)
  }, [weatherData])

  return (
    <div className="container">
      <div className="form">
        <p className="underline decoration-wavy">Enter City Name</p>
        <br/>
        <TextField variant="outlined" onChange={(event)=>{
          setCityInput(event.target.value)
        }} />
        <br/>
        <span className="error_message">{(error!==null) && error.message}</span>
        <br/>
        <Button variant="contained" onClick={()=>{
          fetchWeatherDataCallback(cityInput)
        }}>
          Fetch Data
        </Button>
      </div>
      <div className="weather-info">
        <table align={"center"}>
          <tr>
            <th>City</th><td>{weatherData?.city}</td>
          </tr>
          <tr>
            <th>Temperature</th><td>{weatherData?.temp}°C</td>
          </tr>
          <tr>
            <th>Humidity</th><td>{weatherData?.humidity}%</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default View;
