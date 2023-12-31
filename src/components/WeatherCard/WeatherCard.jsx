// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./WeatherCard.scss";

const WeatherCard = ({
  iconSrc,
  text,
  temp,
  min,
  max,
  humidity,
  wind,
  clouds,
  description,
}) => {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   console.log(count);
  // }, [count]);

  return (
    <>
      <article>
        <div className="img-wrapper">
          <img src={iconSrc} alt="icon" />
        </div>
        <div className="text-wrapper">
          <h2>{temp}°</h2>
          <h2>
            {min}° ↔ {max}°
          </h2>
          <h3>
            {text}: {description}
          </h3>
          <h3>Clouds:{clouds}</h3>
          <h3>Wind:{wind}</h3>
          <h3>Humidty:{humidity}</h3>
        </div>
      </article>
    </>
  );
};

WeatherCard.propTypes = {
  temp: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  humidity: PropTypes.number,
  wind: PropTypes.number,
  clouds: PropTypes.number,
  text: PropTypes.string,
  description: PropTypes.string,
  iconSrc: PropTypes.string,
};

export default WeatherCard;
