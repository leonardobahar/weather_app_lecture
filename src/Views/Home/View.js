import {useEffect, useState} from "react";
import './index.css';
import useFetchWeather from "../../Hooks/useFetchWeather";
import {Box, Button, Container, Snackbar, TextField} from "@mui/material";
import CityCardList from "./components/CityCardList";
import {validateIfCityExist} from "./helper/ValidateIfCityExist";

const View = ()=>{
  const [citiesArray, setCitiesArray] = useState(
    [
      {
        cityName: "Singapore",
        countryCode: "SG"
      },
      {
        cityName: "Berlin",
        countryCode: "DE"
      },
      {
        cityName: "Hongkong",
        countryCode: "HK"
      }
    ]);

  // Hooks call
  const [ fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();

  const [cityInput, setCityInput] = useState("");
  const [shouldSnackbarOpen, setShouldSnackbarOpen] = useState(false);

  // For snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShouldSnackbarOpen(false);
  };

  useEffect(()=>{
    fetchWeatherDataCallback("Jakarta");
  }, [fetchWeatherDataCallback])

  useEffect(()=>{
    console.log(weatherData)
  }, [weatherData])

  return (
    <div className="container">
      <div className="form">
        <p className="mt-8 decoration-wavy">Enter City Name</p>
        <br/>
        <TextField variant="outlined" onChange={(event)=>{
          setCityInput(event.target.value)
        }} />
        <br/>
        <span className="error_message">{(error!==null) && error.message}</span>
        <br/>
        <Container maxWidth="sm">
          <Button variant="contained" onClick={()=>{
            fetchWeatherDataCallback(cityInput)
          }}>
            Fetch Data
          </Button>
          &nbsp;
          <Button variant="contained" onClick={async()=>{
            const cityInputSplit = cityInput.split(",")
            try {
              const validationResult = await validateIfCityExist(cityInput)
              console.log(validationResult)
              if (validationResult === true){
                if (cityInputSplit.length === 1) {
                  const arr = [...citiesArray, {
                    cityName: cityInputSplit[0].trim(),
                    countryCode: ""
                  }]
                  setCitiesArray(arr)
                } else {
                  const arr = [...citiesArray, {
                    cityName: cityInputSplit[0].trim(),
                    countryCode: cityInputSplit[1].trim()
                  }]
                  setCitiesArray(arr)
                }
              }else{
                setShouldSnackbarOpen( true);
              }
            }catch(e){
              console.error(e)
              setShouldSnackbarOpen(true);
            }
          }}>
            Add
          </Button>
        </Container>
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
        <CityCardList
          cityArray={citiesArray}
        />
      <Snackbar
        open={shouldSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="City not found"
      />
    </div>
  );
}

export default View;
