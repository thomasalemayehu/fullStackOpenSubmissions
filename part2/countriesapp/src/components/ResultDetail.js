import axios from "axios";
import React, { useEffect, useState } from "react";

function ResultDetail({ country }) {
  const [weatherInfo, setWeatherInfo] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;
  const requestUrl = `https://api.openweathermap.org/data/2.5/find?q=${country.name.official}&units=imperial&type=accurate&mode=json&APPID=${api_key}`;

  const getWeatherInfo = async () => {
    axios.get(requestUrl).then((response) => {
      const weatherInfo = response.data.list[0];
      const newWeatherObject = {
        temp: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        pressure: weatherInfo.main.pressure,
        main: weatherInfo.weather[0].main,
        description: weatherInfo.weather[0].description,
        icon: weatherInfo.weather[0].icon,
        windSpeed: weatherInfo.wind.speed,
        windDegree: weatherInfo.wind.deg,
      };

      setWeatherInfo(newWeatherObject);
    });
  };

  useEffect(() => {
    getWeatherInfo();
  });
  return (
    <>
      <div>
        <span>Capital : </span> <span>{country.capital}</span>
      </div>

      <div>
        <span>Area : </span> <span>{country.area}</span>
      </div>

      <br />

      <img src={country.flags.png} alt="" width="170px" height="100px" />

      <div>
        <h1>Weather Info - {weatherInfo.main}</h1>
        <h5>{weatherInfo.description}</h5>

        <img
          src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          alt=""
        />

        <p>Temperature :{weatherInfo.temp}</p>

        <p>Pressure :{weatherInfo.pressure}</p>

        <p>Humidity :{weatherInfo.humidity}</p>

        <p>
          Wind : {weatherInfo.windSpeed}@{weatherInfo.windDegree}
        </p>
      </div>
    </>
  );
}

export default ResultDetail;
