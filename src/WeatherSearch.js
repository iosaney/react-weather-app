import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { useState } from "react";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(null); 
  const [temperature, setTemperature] = useState("");
  const [loaded, setLoaded] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoaded(true);

    const apiKey = "97c2f6a3b34509ac62090edc5d18d949";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
&units=metric&appid=${apiKey}`;

    axios.get(url).then(showCity);
  }

  function showCity(response) {
    setSearch(response.data.name);
    setTemperature(Math.round(response.data.main.temp));
    setLoaded(false);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="WeatherSearch">
      {" "}
      <form onSubmit={handleSubmit}>
        <input
        className="searchBar"
          type="search"
          name="search"
          placeholder="Search for a City"
          onChange={updateCity}
        />
        <input className="searchButton" type="submit" name="submitButton" value="Search" />
      </form>
      {loaded ? (
        <InfinitySpin
          visible={true}
          width="200"
          color="#6643b5"
          ariaLabel="infinity-spin-loading"
        />
      ) : temperature ? (
        <h1>
          {" "}
          It is currently {temperature}ºC in {search}{" "}
        </h1>
      ) : (
        <small>Type a city and click Search.</small>
      )}
    </div>
  );
}
