/** @format */

import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreCard } from "../genre-card/genre-card";
import { DirectorCard } from "../director-card/director-card";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  // Check if user and token are stored in local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // Initialize user and token states with stored values
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // Initialize movies states
  const [movies, setMovies] = useState([]);

  // Initialize movie search states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
        setFilteredMovies([]);
    } else {
        const filtered = movies.filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredMovies(filtered);
    }
  };

  const getUniqueGenres = (movies) => {
    return movies
      .map(movie => movie.genre)
      .filter((genre, index, self) =>
        index === self.findIndex((g) => g.name === genre.name)
      );
  }

  const getUniqueDirectors = (movies) => {
    const allDirectors = movies.flatMap(movie => movie.director);
    const uniqueDirectors = allDirectors.filter((director, index, self) =>
      index === self.findIndex((d) => d.name === director.name)
    );
    return uniqueDirectors;
  }

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
                  <h2 className="text-center custom-color">Welcome to</h2>
                  <h1 className="text-center my-5 custom-color">MyFlix!</h1>
                  <h3 className="text-center mb-5 custom-color">Dive into the world of cinema</h3>
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
                <div className="mt-3 custom-color">
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
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
                  <h2 className="text-center custom-color">Welcome to</h2>
                  <h1 className="text-center my-5 custom-color">MyFlix!</h1>
                  <h3 className="text-center mb-5 custom-color">Dive into the world of cinema</h3>                  
                  <SignupView />
                </Col>   
              )
            }
          </div>
        }
        />

        <Route
        path="/profile"
        element={
          <div>
            {
              !user ? ( <Navigate to="/login" replace />) : (movies.length === 0) ? (<div> The movie list is empty. </div>) : (
                <Col className="vh-100 d-flex flex-column justify-content-center align-items-center">
                  <ProfileView profileView={{user, token, movies}} 
                  onAccountDeleted={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}/>
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

                <div className="d-flex flex-column">
                  <Col  className="d-flex ms-auto my-3">
                    <label htmlFor="movieSearch" className="form-label custom-color ms-auto">Search Movies</label>
                    <input 
                        className="form-control" 
                        id="movieSearch" 
                        placeholder="Search for movies by title..." 
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                  </Col>
                  <Col className="d-flex flex-column justify-content-center align-items-center">
                    <Row sm={1} md={1} lg={2} xl={3} xxl={4}  gap={4} className="w-100">
                      {(filteredMovies.length > 0 ? filteredMovies : movies).map((movie) => (
                        <Col
                          key={movie.id}
                          className="d-flex flex-column justify-content-center align-items-center"
                        >
                          <MovieCard movieCard={movie} />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </div>
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
                    movieView={{movies, user, token}}
                  />
              )
            }
          </div>
        }
        />

        <Route
          path="/genres"
          element={
            <div>
              {
                !user ? ( <Navigate to="/login" replace />) : (movies.length === 0) ? (<div> The movie list is empty. </div>) : (

                <Col className="d-flex flex-column justify-content-center align-items-center">
                  <Row sm={2} md={3} lg={4} xl={5} gap={4}>
                    {getUniqueGenres(movies).map((genre) => (
                      <Col key={genre.name}>
                        <GenreCard genreCard={{genre, movies}} />
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
          path="/directors"
          element={
            <div>
              {
                !user ? ( <Navigate to="/login" replace />) : (movies.length === 0) ? (<div> The movie list is empty. </div>) : (

                <Col className="mt-5">
                    {getUniqueDirectors(movies).map((director) => (
                      <Col key={director.name}>
                        <DirectorCard directorCard={{director, movies}} />
                      </Col>
                    ))}
                </Col>
                )
              }
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};
