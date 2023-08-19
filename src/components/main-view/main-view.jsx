/** @format */

import { useEffect, useState } from "react";

import { MovieView } from "../movie-view/movie-view";

import { MovieCard } from "../movie-card/movie-card";

import { LoginView } from "../login-view/login-view";

import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user")); // user & token local storage

	const storedToken = localStorage.getItem("token");

	const [user, setUser] = useState(storedUser ? storedUser : null); // hooks to change component state

	const [token, setToken] = useState(storedToken ? storedToken : null);

	const [movies, setMovies] = useState([]);

	const [selectedMovie, setselectedMovie] = useState(null);

	useEffect(() => {
		// hook to fetch data through api

		if (!token) {
			return;
		}

		fetch("https://high-triode-348322.lm.r.appspot.com/movies", {
			headers: { Authorization: `Bearer ${token}` },
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

						featured: movie.featured,
					};
				});

				setMovies(movieFromAPI);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [token]);

	if (!user) {
		// Login and sign up page

		return (
			<div>
				<LoginView
					onLoggedIn={(user, token) => {
						setUser(user);
						setToken(token);
					}}
				/>

				<p>
					<hr /> or Signup for a new account{" "}
				</p>

				<SignupView />
			</div>
		);
	}

	if (selectedMovie) {
		// Movie details view with similar movie suggestion

		let similarMovies = movies.filter(
			(movie) =>
				selectedMovie.genre.name === movie.genre.name &&
				selectedMovie.id !== movie.id
		);

		return (
			<div>
				<MovieView
					movieView={selectedMovie}
					onBackClick={() => setselectedMovie(null)}
				/>

				<hr />

				<h2>Similar movies</h2>

				{similarMovies.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							movieCard={movie}
							onMovieClick={(newselectedMovie) => {
								setselectedMovie(newselectedMovie);
							}}
						/>
					);
				})}
			</div>
		);
	}

	if (movies.length === 0) {
		// Movie array check

		return <div> The movie list is empty. </div>;
	} else {
		return (
			// Main view/page with movie list

			<div>
				{movies.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							movieCard={movie}
							onMovieClick={(newselectedMovie) => {
								setselectedMovie(newselectedMovie);
							}}
						/>
					);
				})}

				<button
					onClick={() => {
						setUser(null);
						setToken(null);
						localStorage.clear();
					}}>
					{" "}
					Logout{" "}
				</button>
			</div>
		);
	}
};
