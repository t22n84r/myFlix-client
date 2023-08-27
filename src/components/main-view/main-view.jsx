/** @format */

import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Row } from "react-bootstrap";
import "./main-view.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const MainView = () => {
  // Check if user and token are stored in local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // Initialize user and token states with stored values
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // Initialize movies states
  const [movies, setMovies] = useState([]);

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

  return (

    <BrowserRouter>
      
      <NavigationBar user={user} onLoggedOut={() => {
                         setUser(null);
                         setToken(null);
                         localStorage.clear();
      }} />

      <Routes>
        <Route
        path="/login"
        element={
          <div>
            {
              user ? ( <Navigate to="/" />) : (

                <Col className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
                </Col>   
              )
            }
          </div>
        }
        />

        <Route
        path="/register"
        element={
          <div>
            {
              user ? ( <Navigate to="/" />) : (

                <Col className="vh-100 d-flex flex-column justify-content-center align-items-center">
                  <SignupView />
                </Col>   
              )
            }
          </div>
        }
        />

        <Route
          path="/"
          element={
            <div>
              {
                !user ? ( <Navigate to="/login" replace />) : (movies.length === 0) ? (<div> The movie list is empty. </div>) : (

                <Col className="d-flex flex-column justify-content-center align-items-center">
                  <Row sm={1} md={2} lg={3} xl={4} gap={4}>
                    {movies.map((movie) => (
                      <Col
                        key={movie.id}
                        className="d-flex flex-column justify-content-center align-items-center"
                      >
                        <MovieCard movieCard={movie} />
                      </Col>
                    ))}
                  </Row>
                </Col>
                )
              }
            </div>
          }
        />

        <Route
        path="/movies/:movieTitle"
        element={
          <div>
            {
              !user ? ( <Navigate to="/login" replace />) : (movies.length === 0) ? (<div> The movie list is empty. </div>) : (
                
                  <MovieView
                    movieView={movies}
                  />
              )
            }
          </div>
        }
        />

      </Routes>
    </BrowserRouter>
  );
};
