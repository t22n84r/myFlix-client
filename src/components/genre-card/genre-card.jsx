/** @format */

// Import PropTypes and required components
import PropTypes from "prop-types";
import { useState } from "react";
import { Card, Modal, Button, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./genre-card.scss"; // Import the custom SCSS for GenreCard styles

// Define the GenreCard component
export const GenreCard = (props) => {

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Handle modal open & close event
  const openDetailsModal = () => {
    setShowDetailsModal(true);
  };
  const closeDetailsModal = () => {
      setShowDetailsModal(false);
  }

  //creating the suggested movies array
  const suggestedMovies = props.genreCard.movies.filter(
    (genreCardMovie) =>
    genreCardMovie.genre.name === props.genreCard.genre.name 
  );

  // Render the genre card view
  return (
    <Col>
      <Card className="d-flex flex-column align-items-center justify-content-center mt-4 custom-card-genreCard"
      onClick={openDetailsModal} >
        {/* Genre Name */}
        <Card.Title>{props.genreCard.genre.name}</Card.Title>
      </Card>

      <Modal show={showDetailsModal} onHide={closeDetailsModal} className="d-flex p-5 align-items-center justify-content-center text-center">
        <Modal.Header className="text-center justify-content-center">
            <Modal.Title>{props.genreCard.genre.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.genreCard.genre.description}
          <hr />
          <h4>Suggested movies from this genre</h4>

          <Row sm={1} md={2} lg={3} xl={4} gap={4}>
            {suggestedMovies.map((movie) => (
              <Col
                key={movie.id}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <MovieCard movieCard={movie} />
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
            <Button variant="warning" size="lg" onClick={closeDetailsModal}>
            Close
            </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

// Prop types validation
GenreCard.propTypes = {
  genreCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default GenreCard; // Export the component
