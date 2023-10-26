import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { randomCities } from "../db/randomCites";
import "./Home.scss";

// Create a universal Fetch function

const fetchData = async (fetchObject) => {
  try {
    const response = await fetch(fetchObject.url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      console.log(data, "func");

      return data;
    }
  } catch (error) {
    console.error(fetchObject.message, error);
    throw error;
    // } finally {
    //   console.log("Add cleanup code here (if needed)");
  }
};

// fetchObject für oben, ich mache eine Function, dass ein Object rausgibt um in den Fetch zu benutzen

let fetchObj;

const fetchParams = (lat, lon) => {
  return (fetchObj = {
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a210fd9e00bee0d760dcfd2fc1cb1ef5`,
    message: `With the Geolocalisation and Fetch of this Place: lat:${lat} & lon:${lon} was an Issue`,
  });
};

// const randomObject = ()=>{

// }

const Home = (props) => {
  const [geolocalitation, setGeolocalitation] = useState(false);
  const [weatherData, setWeatherData] = useState();

  // Geolocalisierung allgemein

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocalitation(true);
        // Create the Object for the fetch
        fetchParams(position.coords.latitude, position.coords.longitude);
        // Use the object in the fetch and save in a variable for the state
        fetchData(fetchObj)
          .then((data) => {
            setWeatherData(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
    } else {
      console.log("no geolocalisation");
      setGeolocalitation(false);
    }
  }, []);

  console.log(weatherData, "last");

  //   useEffect(() => {
  //     fetchAsync();
  //   }, []);

  return (
    <>
      <h1>Home</h1>
      <section>
        <article>
          <h2>{props.property}</h2>
          {/* <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            click +1
          </button>
          <p>{count}</p> */}
          <Link to="/">See More</Link>
        </article>
      </section>
    </>
  );
};

Home.propTypes = {
  property: PropTypes.string,
};

export default Home;
