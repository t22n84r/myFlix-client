/** @format */

// Import PropTypes and required components
import PropTypes from "prop-types";
import { Card, CardImg } from "react-bootstrap";
import "./movie-card.scss"; // Import the custom SCSS for MovieCard styles

// Define the MovieCard component
export const MovieCard = (props) => {
  // Render the movie card view
  return (
    <Card
      onClick={() => {
        props.onMovieClick(props.movieCard);
      }}
      className="d-flex flex-column align-items-center mt-4 custom-card-movieCard"
    >
      {/* Movie image */}
      <CardImg
        src={props.movieCard.imageurl}
        alt={props.movieCard.title}
        className="w-75 py-3"
      />

      {/* Movie title */}
      <Card.Title>{props.movieCard.title}</Card.Title>

      {/* Movie director */}
      <Card.Text>
        {props.movieCard.director.map((director, index) => (
          <div key={index}>
            <Card.Text>Director: {director.name}</Card.Text>
          </div>
        ))}
      </Card.Text>
    </Card>
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

  onMovieClick: PropTypes.func.isRequired // Function to handle movie click
};

export default MovieCard; // Export the component
