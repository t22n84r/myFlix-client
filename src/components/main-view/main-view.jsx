import { useEffect, useState } from "react";

import { MovieView } from "../movie-view/movie-view";

import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setselectedMovie] = useState(null);

  useEffect ( () => {

    fetch ("https://high-triode-348322.lm.r.appspot.com/movies")

    .then ((response) => response.json())

    .then ((data) => {

      const movieFromAPI = data.map((movie) => {

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
  }, [] );

  if (selectedMovie) {

    let similarMovies = movies.filter ((movie) => selectedMovie.genre.name === movie.genre.name && selectedMovie.id !== movie.id);

    console.log(similarMovies);

    return (

      <div>

        <MovieView movieView={selectedMovie} onBackClick={() => setselectedMovie(null)} />

        <hr />

        <h2>Similar movies</h2>

        {similarMovies.map((movie) => {

          return (
            <MovieCard key={movie.id} movieCard={movie} onMovieClick={(newselectedMovie) => { setselectedMovie(newselectedMovie)}} />
          );

        })}

      </div>
    );
  }

  if (movies.length === 0) {

    return <div> The movie list is empty. </div>;

  } else {

    return (

      <div>

        {movies.map((movie) => {

          return (
            <MovieCard key={movie.id} movieCard={movie} onMovieClick={(newselectedMovie) => { setselectedMovie(newselectedMovie)}} />
          );

        })}

      </div>
    );
  }
};
