export const MovieCard = (props) => {
    return (
      <div
        onClick={() => {
          props.onMovieClick(props.movieCard);
        }}
      >
        <p> {props.movieCard.title} </p>
      </div>
    );
  };
  