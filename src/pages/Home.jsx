import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import "./Home.scss";
import { randomCities } from "../db/randomCites";
import { countries } from "../db/countries";
import NoGeo from "../components/NoGeo/NoGeo";
import Loading from "../components/Loading/Loading";
import Card from "../components/Card/Card";
import WeatherCard from "../components/WeatherCard/WeatherCard";

// Help Object and Function for the Outputs

const dayParts = {
  "Early Morning": ["03:00:00", "06:00:00"],
  Morning: ["09:00:00", "12:00:00"],
  Afternoon: ["15:00:00", "18:00:00"],
  Night: ["21:00:00", "00:00:00"],
};

function getPartOfDay(timeValue) {
  for (const part in dayParts) {
    if (dayParts[part].includes(timeValue)) {
      return part;
    }
  }
  return console.log("Dont find the Time Value");
}

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

const Home = () => {
  const [geolocalitation, setGeolocalitation] = useState(false);
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    // first one variable is the Object to use in fetchData
    let fetchObj, randomIndex, randomCity;

    const random = (n) => {
      return (randomIndex = Math.round(Math.random() * n));
    };

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

  //   ! Values for the main Card

  // Extract name of Country with the countries array

  const name = weatherData.city.name;
  let countryName = "";
  let countryCode = weatherData.city.country;
  countries.forEach((country) =>
    country.code === countryCode ? (countryName = country.name) : ""
  );

  // Coords:

  const coords = `${weatherData.city.coord.lat} / ${weatherData.city.coord.lat}`;

  // Conversion date & Time

  const dateTime = weatherData.list[0].dt_txt;
  const dateReverse = dateTime.split(" ")[0];
  const timeComplete = dateTime.split(" ")[1];
  const time = timeComplete.slice(0, -3);

  const dayPartOfTime = getPartOfDay(timeComplete);

  const dateParts = dateReverse.split("-");
  const date = dateParts.reverse().join("/");

  console.log(date);
  console.log(time);

  //! sunset/sunrise calculation:

  function convertUnixTimestampToTime(unixTimestamp, timezoneInfo) {
    const date = new Date(unixTimestamp * 1000 + timezoneInfo * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  let timeZone = weatherData.city.timezone;
  let sunriseData = weatherData.city.sunrise;
  let sunsetData = weatherData.city.sunset;

  let formatedSunrise = convertUnixTimestampToTime(sunriseData, timeZone);
  let formatedSunset = convertUnixTimestampToTime(sunsetData, timeZone);

  // remove initial 0
  let sunriseParts = formatedSunrise.split(":");
  let hourWithOutInitialCeroSunrise = parseInt(sunriseParts[0], 10).toString();
  let sunrise =
    hourWithOutInitialCeroSunrise +
    ":" +
    sunriseParts[1] +
    ":" +
    sunriseParts[2];

  let sunsetParts = formatedSunset.split(":");
  let hourWithOutInitialCeroSunset = parseInt(sunsetParts[0], 10).toString();
  let sunset =
    hourWithOutInitialCeroSunset + ":" + sunsetParts[1] + ":" + sunsetParts[2];

  // ! Values for the WeatherCard

  const tempNow = weatherData.list[0].main.temp;
  const minNow = weatherData.list[0].main.temp_min;
  const maxNow = weatherData.list[0].main.temp_max;
  const humidityNow = weatherData.list[0].main.humidity;
  const windsNow = weatherData.list[0].wind.speed;
  const cloudsNow = weatherData.list[0].clouds.all;
  const textNow = weatherData.list[0].weather[0].main;
  const descriptionNow = weatherData.list[0].weather[0].description;
  const iconNow = weatherData.list[0].weather[0].icon;

  const iconSrc = `https://openweathermap.org/img/wn/${iconNow}@2x.png`;

  return (
    <>
      <h1>Weather PROP(g)Nose</h1>
      {!geolocalitation ? <NoGeo /> : ""}
      <section>
        <Card
          name={name}
          country={countryName}
          coords={coords}
          partDay={dayPartOfTime}
          sunrise={sunrise}
          sunset={sunset}
          date={date}
          time={time}
        />
        <WeatherCard
          iconSrc={iconSrc}
          text={textNow}
          temp={tempNow}
          min={minNow}
          max={maxNow}
          humidity={humidityNow}
          wind={windsNow}
          clouds={cloudsNow}
          description={descriptionNow}
        />
      </section>
    </>
  );
};

// Home.propTypes = {
//   property: PropTypes.string,
// };

export default Home;
