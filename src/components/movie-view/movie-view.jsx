/** @format */

import React from "react";
import { Button, Card, CardImg } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = (props) => {
	// Display detailed information about a movie

	return (
		// Card containing movie details
		<Card className="d-flex flex-column align-items-center py-3 my-5 custom-card-movieView">
			{/* Movie image */}
			<CardImg
				variant="top"
				alt={props.movieView.title}
				src={props.movieView.imageurl}
				className="w-50 py-3"
			/>
			<Card.Body className="d-flex flex-column align-items-center">
				{/* Movie title */}
				<Card.Title>{props.movieView.title}</Card.Title>

				{/* Movie description */}
				<Card.Text>{props.movieView.description}</Card.Text>

				{/* Director information */}
				<Card.Title>Director</Card.Title>
				{props.movieView.director.map((director, index) => (
					<Card.Text key={index}>
						<Card.Text>Name: {director.name}</Card.Text>
						<Card.Text>Bio: {director.bio}</Card.Text>
						<Card.Text>Birth Year:</Card.Text>
						<ul>
							{director.birthyear.map((year, yearIndex) => (
								<li key={yearIndex}>{year}</li>
							))}
						</ul>
						<Card.Text>Death Year: {director.deathyear || "N/A"}</Card.Text>
					</Card.Text>
				))}

				{/* Genre information */}
				<Card.Title>Genre</Card.Title>
				<Card.Text>Name: {props.movieView.genre.name}</Card.Text>
				<Card.Text>
					Description: {props.movieView.genre.description}
				</Card.Text>

				{/* Featured status */}
				<Card.Title>
					Featured: {props.movieView.featured ? "Yes" : "No"}
				</Card.Title>
			</Card.Body>

			{/* Back button */}
			<Button variant="info" size="lg" onClick={props.onBackClick}>
				<h3>Back</h3>
			</Button>
		</Card>
	);
};
