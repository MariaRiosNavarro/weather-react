// import "./Card.scss";
import PropTypes from "prop-types";

const Card = ({ name, coords, country, sunrise, sunset, date, time }) => {
  return (
    <>
      <section>
        <article>
          <h2>Card</h2>
          <h2>{name}</h2>
          <h3>{country}</h3>
          <h3>Coords: {coords}</h3>
          <h3>Date: {date}</h3>
          <h3>Time: {time}</h3>
          <h4>Sunrise: {sunrise}</h4>
          <h4>Sunset: {sunset}</h4>
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
};

export default Card;
