import axios from "axios";
import {useCallback, useState} from "react";

const fetchWeatherData = (city)=>{
  return new Promise((resolve, reject)=>{
    const apiKey  = "afba36cb728b0015985b3602269c9a11"
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=metric`
    axios.get(url).then(r=>{
      console.log(r.status)
      if (r?.status === 200){
        resolve(r?.data)
      }else{
        reject("SOMETHING WENT WRONG")
      }
    }).catch(e=>{
      reject(e)
    })
  })
}

const useFetchWeather = ()=>{
  const [weatherData={
    city: "",
    temp: "",
    humidity: "",
  }, setWeatherData] = useState();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialiseWeatherData = useCallback(()=>{
    setWeatherData({
      city: "",
      temp: "",
      humidity: "",
    })
  }, [setWeatherData])

  const fetchWeatherDataCallback = useCallback((city)=>{
    setIsLoading(true);
    return fetchWeatherData(city).then(response=>{
      console.log(typeof response?.name);

      // Check for error
      if (typeof response?.name !== "string" &&
        !isNaN(response?.main?.temp) &&
        !isNaN(response?.main?.humidity)){
        setError("WRONG DATA TYPES");
        setIsLoading(false);
        return;
      }

      const weatherData = {
        city: response?.name,
        temp: response?.main?.temp,
        humidity: response?.main?.humidity
      }

      setWeatherData(weatherData);
      setIsLoading(false);
    }).catch(error=>{
      // TODO: Set a warning message here
      setError(error)
      setIsLoading(false);
    })
  }, [setWeatherData])

  return [
    fetchWeatherDataCallback,
    initialiseWeatherData,
    weatherData,
    error,
    isLoading,
  ]
}

export default useFetchWeather;
