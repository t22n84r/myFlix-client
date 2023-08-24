/** @format */

import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  // Check if user and token are stored in local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // Initialize user and token states with stored values
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // Initialize movies and selectedMovie states
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setselectedMovie] = useState(null);

  // Fetch movies data based on token when component mounts
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://high-triode-348322.lm.r.appspot.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())

      .then((movies) => {
        const movieFromAPI = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            director: movie.director,
            genre: movie.genre,
            imageurl: movie.imageurl,
            featured: movie.featured
          };
        });

        setMovies(movieFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  // Define the main content based on user, selectedMovie, and movies
  let mainContent;
  if (!user) {
    // Render LoginView and SignupView for guests
    mainContent = (
      <Col className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <p>
          <h3>
            <hr /> or Signup for a new account{" "}
          </h3>
        </p>
        <SignupView />
      </Col>
    );
  } else if (selectedMovie) {
    // Render MovieView and similar movies for selected movie
    const similarMovies = movies.filter(
      (movie) =>
        movie.genre.name === selectedMovie.genre.name &&
        selectedMovie.id !== movie.id
    );

    mainContent = (
      <Col>
        <MovieView
          movieView={selectedMovie}
          onBackClick={() => setselectedMovie(null)}
        />
        <hr />
        <h2>Similar movies</h2>
        <Row xs={1} sm={2} md={3} lg={3} xl={3} gap={4}>
          {similarMovies.map((movie) => (
            <Col
              key={movie.id}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <MovieCard
                movieCard={movie}
                onMovieClick={(newselectedMovie) => {
                  setselectedMovie(newselectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
      </Col>
    );
  } else if (movies.length === 0) {
    // Display message for empty movie list
    mainContent = <div> The movie list is empty. </div>;
  } else {
    // Render movie list and logout button for logged-in users
    mainContent = (
      <div>
        <Navbar expand="lg" className="custom-navbar" variant="dark">
          <Container>
            <Navbar.Brand className="custom-navbar-brand">MyFlix</Navbar.Brand>
            <Nav className="ml-auto">
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
                variant="primary"
              >
                Logout
              </Button>
            </Nav>
          </Container>
        </Navbar>

        <Col className="d-flex flex-column justify-content-center align-items-center">
          <Row sm={1} md={2} lg={3} xl={4} gap={4}>
            {movies.map((movie) => (
              <Col
                key={movie.id}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <MovieCard
                  movieCard={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setselectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </div>
    );
  }

  // Render the main content within a row
  return <Row>{mainContent}</Row>;
};
