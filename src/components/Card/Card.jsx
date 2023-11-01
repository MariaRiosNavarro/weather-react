import PropTypes from "prop-types";
import React from "react";
import Button from "../Button/Button";
import "./Card.css";

const Card = ({
  name,
  coords,
  country,
  sunrise,
  sunset,
  date,
  time,
  partDay,
}) => {
  return (
    <>
      <section>
        <article className="card  bg-secundary">
          <h2 className="bg-red-900">{name}</h2>
          <h3>{country}</h3>
          <h3>Coords: {coords}</h3>
          <h3>Date: {date}</h3>
          <h3>{partDay}</h3>
          <h3>Time of weather data: {time}</h3>
          <h4>Sunrise: {sunrise}</h4>
          <h4>Sunset: {sunset}</h4>
          <Button text="hallo" className="btn btn-primary" />
          <Button text="alert" className="btn border-none btn-primary" />
          <Button text="other" className="btn btn-accent btn-outline" />
          <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
            test
          </button>
        </article>
      </section>
    </>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  coords: PropTypes.string,
  country: PropTypes.string,
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  partDay: PropTypes.string,
};

export default Card;
