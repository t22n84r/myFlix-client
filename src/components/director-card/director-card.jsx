/** @format */

// Import PropTypes and required components
import PropTypes from "prop-types";
import { useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./director-card.scss"; // Import the custom SCSS for DirectorCard styles

// Define the DirectorCard component
export const DirectorCard = (props) => {

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Handle modal open & close event
  const openDetailsModal = () => {
    setShowDetailsModal(true);
  };
  const closeDetailsModal = () => {
      setShowDetailsModal(false);
  }

  //creating the suggested movies array
  const suggestedMovies = props.directorCard.movies.filter(
   (directorCardMovie) =>
       directorCardMovie.director.some(director => 
           director.name === props.directorCard.director.name
       )
   );

  // Render the director card view
  return (
    <Col>
      <ul role="button" className="custom-card-directorCard"
      onClick={openDetailsModal} >
        {/* Genre Name */}
        <li>{props.directorCard.director.name}</li>
      </ul>

      {/*Modal for details of the director*/}
      <Modal show={showDetailsModal} onHide={closeDetailsModal} className="d-flex p-5 align-items-center justify-content-center text-center">
         <Modal.Header className="text-center justify-content-center">
            <Modal.Title>{props.directorCard.director.name}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {props.directorCard.director.bio}
            <div className="my-3"><span>
               <span>Birth year: </span>
               {props.directorCard.director.birthyear.map((year, yearIndex) => (
                  <span key={yearIndex}>
                     {year}
                     {yearIndex !== props.directorCard.director.birthyear.length - 1 ? ' - ' : ''}
                  </span>
               ))}
            </span></div>
            <div className="my-3"><span>
               <span>Death year: {props.directorCard.director.deathyear}</span>
            </span></div>
            <hr />
            <h4>Suggested movies from this director</h4>

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
DirectorCard.propTypes = {
  directorCard: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthyear: PropTypes.arrayOf(PropTypes.string).isRequired,
      deathyear: PropTypes.string.isRequired
  }).isRequired,
};

export default DirectorCard;
