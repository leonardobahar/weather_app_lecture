import CityInformationTable from "../../Components/CityInformationTable/CityInformationTable";
import useFetchWeather from "../../Hooks/useFetchWeather";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {parse} from "querystring-es3";

const Detail = ()=>{
  const { pathname, search } = useLocation();
  const { searchFor } = parse(search.slice(1));

  // Hooks call
  const [ fetchWeatherDataCallback, initialiseWeatherData, weatherData, error, isLoading] = useFetchWeather();

  console.log(searchFor);

  useEffect(()=>{
    // To address the old componentDidMount method
    // Whatever runs in here, will run once when the page loads
  }, [])

  useEffect(()=>{
    // To address the old componentDidUpdate method
    // No dependency required because you want the block to run whenever any state changes
  })

  useEffect(()=>{
    // Whatever runs in here, will run when searchFor is changed
    fetchWeatherDataCallback(searchFor)
  }, [searchFor, fetchWeatherDataCallback])

  return (
    <CityInformationTable
      city={weatherData?.city}
      temp={weatherData?.temp}
      humidity={weatherData?.humidity}
    />
  );
}

export default Detail;
