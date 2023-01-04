import axios from "axios";
import {useCallback, useState} from "react";

// Function containing fetch weather data network services
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

// Start of hook
const useFetchWeather = ()=>{
  const [weatherData={
    city: "",
    temp: "",
    humidity: "",
  }, setWeatherData] = useState();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function initialiseWeather data will be called to set each attributes as empty
  const initialiseWeatherData = useCallback(()=>{
    setWeatherData({
      city: "",
      temp: "",
      humidity: "",
    })
  }, [setWeatherData])

  // Function to actually invoke fetchWeatherData
  const fetchWeatherDataCallback = useCallback((city)=>{ // useCallback is used to cache the functions between re-renders -> performance optimization
    setIsLoading(true);
    return fetchWeatherData(city).then(response=>{
      console.log(typeof response?.name);

      // Check for error in response payload
      if (typeof response?.name !== "string" &&
        !isNaN(response?.main?.temp) &&
        !isNaN(response?.main?.humidity)){
        setError("WRONG DATA TYPES");
        setIsLoading(false);
        return;
      }

      // No error, hence define weatherData object
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
