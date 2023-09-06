/** @format */

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { Button, ButtonGroup, Card, CardImg, Col, Row, ToggleButton } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = (props) => {
  // Display detailed information about a movie

  const [user, setUser] = useState(props.movieView.user);

  // handle back navigation on a movie view page
  const naivigate = useNavigate();
  const handleBack = () => { naivigate(-1); };

  // handle movie title parameter change
  const { movieTitle } = useParams();
  const movie = props.movieView.movies.find((m) => m.title === movieTitle);

  //creating the similar movies array
  const similarMovies = props.movieView.movies.filter(
    (similarMovie) =>
    similarMovie.genre.name === movie.genre.name &&
    movie.id !== similarMovie.id
  );

  const addToFavorites = () => {
    // PUT request to update user favorite movies
    fetch(
      `https://high-triode-348322.lm.r.appspot.com/users/${user.username}/${movie.id}`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${props.movieView.token}`
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Change failed');
        }
      })
      .then((updatedUser) => {
        setUser((prevUser) => {
          return {
            ...prevUser,
            ...updatedUser,
          };
        });
        localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const removeFromFavorites = () => {
    // DELETE request to remove movie from user's favorite movies
    fetch(
      `https://high-triode-348322.lm.r.appspot.com/users/${user.username}/${movie.id}`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${props.movieView.token}`
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Change failed');
        }
      })
      .then((updatedUser) => {
        setUser((prevUser) => {
          return {
            ...prevUser,
            ...updatedUser,
          };
        });
        localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // user favorite movie check box toggle
  const isFavorite = user.favoriteMovies.includes(movie.id);
  const [checked, setChecked] = useState(isFavorite);

  return (
    <Col className="custom-movieView">
      {/*Card containing movie details*/}
      <Card className="d-flex flex-column align-items-center py-3 my-5 custom-movieView">
        {/* Movie image */}
        <CardImg
          variant="top"
          alt={movie.title}
          src={movie.imageurl}
          className="w-50 py-3"
        />
        <Card.Body className="d-flex flex-column align-items-center">
          {/* Movie title */}
          <Card.Title>{movie.title}</Card.Title>

          {/* Movie description */}
          <Card.Text>{movie.description}</Card.Text>

          {/* Director information */}
          <Card.Title>Director</Card.Title>
          {movie.director.map((director, index) => (
            <div key={index}>
              <Card.Text>Name: {director.name}</Card.Text>
              <Card.Text>Bio: {director.bio}</Card.Text>
              <Card.Text>Birth Year:</Card.Text>
              <ul>
                {director.birthyear.map((year, yearIndex) => (
                  <li key={yearIndex}>{year}</li>
                ))}
              </ul>
              <Card.Text>Death Year: {director.deathyear || "N/A"}</Card.Text>
            </div>
          ))}

          {/* Genre information */}
          <Card.Title>Genre</Card.Title>
          <Card.Text>Name: {movie.genre.name}</Card.Text>
          <Card.Text>Description: {movie.genre.description}</Card.Text>

          {/* Featured status */}
          <Card.Title>
            Featured: {movie.featured ? "Yes" : "No"}
          </Card.Title>
        </Card.Body>

        <Card.Body className="d-flex align-items-center w-100">

          {/* Add to favorites button */}

          <ButtonGroup className="mb-2">
            <ToggleButton
              type="checkbox"
              variant="success"
              size="lg"
              className="align-self-start mx-5"
              checked={checked}
              onChange={(e) => setChecked(e.currentTarget.checked)}
              disabled={isFavorite}
              onClick={!isFavorite ? addToFavorites : undefined}
              aria-label="add to favorites, active only when movie is not in favorite list"
            >
              Add to Favorites
            </ToggleButton>
          </ButtonGroup>

          {/* Remove from favorites button */}
          <Button variant="danger" size="lg" 
            className="align-self-start mx-5" 
            onClick={removeFromFavorites}
            disabled={!isFavorite}
            aria-label="Remove from Favorites, active only when movie is in favorite list">
            Remove from Favorites
          </Button>

          {/* "Back" button */}
          <Button variant="info" size="lg" 
            className="ms-auto" 
            onClick={handleBack}
            aria-label="Go to previous view">
            Back
          </Button>
        </Card.Body>

      </Card>

      {/* Similar movies */}
      <hr />
      <h2 className="text-center">Similar movies</h2>

      <Row sm={1} md={2} lg={3} xl={4} gap={4}>
        {similarMovies.map((movie) => (
          <Col
            key={movie.id}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <MovieCard movieCard={movie} />
          </Col>
        ))}
      </Row>

    </Col>
  );
};
