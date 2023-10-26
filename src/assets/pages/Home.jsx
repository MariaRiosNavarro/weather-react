import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Home.scss";
import { randomCities } from "../db/randomCites";
import NoGeo from "../components/NoGeo/NoGeo";
import Loading from "../components/Loading/Loading";

// Create a universal Fetch function

const fetchData = async (fetchObject) => {
  try {
    const response = await fetch(fetchObject.url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(fetchObject.message, error);
    // throw error;
  }
};

const Home = (props) => {
  const [geolocalitation, setGeolocalitation] = useState(false);
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    // first one is the Object to use in fetchData
    let fetchObj, randomIndex, randomCity;

    const random = (n) => {
      return (randomIndex = Math.round(Math.random() * n));
    };

    // TODO:here check!
    console.log(randomCities.length);

    // function to change the object for all lat and lon
    const fetchParams = (lat, lon) => {
      return (fetchObj = {
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=a210fd9e00bee0d760dcfd2fc1cb1ef5`,
        message: `With the Geolocalisation and Fetch of this Place: lat:${lat} & lon:${lon} was an Issue`,
      });
    };

    // geocalisation general
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocalitation(true);
        fetchObj = fetchParams(
          position.coords.latitude,
          position.coords.longitude
        );
        fetchData(fetchObj)
          .then((data) => {
            setWeatherData(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
      //  if no geocalisation -> use a random city of the randomCity-array
    } else {
      setGeolocalitation(false);
      //   noGeoMessage visibility:visible!
      randomIndex = random(randomCities.length);
      randomCity = randomCities[randomIndex];
      fetchObj = fetchParams(randomCity.lat, randomCity.lon);
      fetchData(fetchObj)
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  if (!weatherData) {
    return <Loading />;
  }

  console.log("here!!!!!!!", weatherData);
  console.log(geolocalitation);

  //   Transformation

  let name, coords, country, population, timezone, sunrise, sunset;

  name = weatherData.city.name;
  coords = `{weatherData.city.coords.lat}, {weatherData.city.coords.lon}`;
  country = weatherData.city.country;
  population = weatherData.city.population;
  timezone = weatherData.city.timezone;
  sunrise = weatherData.city.sunrise;
  sunset = weatherData.city.sunset;

  let weatherList = weatherData.city.list;
  let weatherListIndex;
  let oneWeatherDataObject = weatherList[weatherListIndex];

  let dateString, date, temp, min, max, humidity, wind, clouds;

  dateString = oneWeatherDataObject.dt_text;
  date = oneWeatherDataObject.dt;
  temp = oneWeatherDataObject.main.temp;
  min = oneWeatherDataObject.main.temp_min;
  max = oneWeatherDataObject.main.temp_max;
  humidity = oneWeatherDataObject.main.humidity;
  wind = oneWeatherDataObject.wind.speed;
  clouds = oneWeatherDataObject.clouds.all;

  let weatherText, weatherDescription, icon;

  weatherText = oneWeatherDataObject.weather.main;
  weatherDescription = oneWeatherDataObject.weather.description;
  icon = oneWeatherDataObject.weather.icon;

  return (
    <>
      <h1>Props Weather</h1>
      <h2>The weather for the next few days around the world</h2>
      {!geolocalitation ? <NoGeo /> : ""}
      <section>
        <Card />
      </section>
    </>
  );
};

Home.propTypes = {
  property: PropTypes.string,
};

export default Home;
