/** @format */

// Import PropTypes and required components
import PropTypes from "prop-types";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

// Define the MovieCard component
export const MovieCard = (props) => {
  // Render the movie card view
  return (
    <Link to={`/movies/${encodeURIComponent(props.movieCard.title)}`}>
      <Card className="d-flex flex-column align-items-center mt-4 custom-card-movieCard" >
        {/* Movie image */}
        <Image
          src={props.movieCard.imageurl}
          alt={props.movieCard.title}
          className="w-75 h-100 py-3"
        />
        {/* Movie title */}
        <Card.Title>{props.movieCard.title}</Card.Title>
      </Card>
    </Link>
  );
};

// Prop types validation
MovieCard.propTypes = {
  movieCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birthyear: PropTypes.arrayOf(PropTypes.string).isRequired,
        deathyear: PropTypes.string.isRequired
      })
    ),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    imageurl: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired,
};

export default MovieCard; // Export the component
