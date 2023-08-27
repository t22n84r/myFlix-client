/** @format */

import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Card, CardImg, Col, Row } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = (props) => {
  // Display detailed information about a movie

  const { movieTitle } = useParams();
  
  const movie = props.movieView.find((m) => m.title === movieTitle);

  const similarMovies = props.movieView.filter(
    (similarMovie) =>
    similarMovie.genre.name === movie.genre.name &&
    movie.id !== similarMovie.id
  );

  return (
    <Col>
      // Card containing movie details
      <Card className="d-flex flex-column align-items-center py-3 my-5 custom-card-movieView">
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

        {/* Back button */}
        <Link to="/">
          <Button variant="info" size="lg" >
          <h3>Back</h3>
          </Button>
        </Link>
      </Card>

      {/* Similar movies */}
      <hr />
      <h2 className="text-center">Similar movies</h2>

      <Row xs={1} sm={2} md={3} lg={3} xl={3} gap={4}>
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
