import PropTypes from "prop-types";

export const MovieCard = (props) => {

  return (

    <div
      onClick={() => {
        props.onMovieClick(props.movieCard);
      }}
    >

      <div>
        <p>{props.movieCard.title}</p>
      </div>

    </div>
  );
};

MovieCard.propTypes = {

  movieCard: PropTypes.shape ({

    id: PropTypes.string.isRequired,

    title: PropTypes.string.isRequired,

    description: PropTypes.string.isRequired,

    director: PropTypes.shape ({

      name: PropTypes.string.isRequired,

      bio: PropTypes.string.isRequired,
      
      birthyear: PropTypes.string.isRequired,

      deathyear: PropTypes.string.isRequired
    }),

    genre: {

      name: PropTypes.string.isRequired,

      description: PropTypes.string.isRequired
    },

    imageurl: PropTypes.string.isRequired,

    featured: PropTypes.bool.isRequired

  }).isRequired,

  onMovieClick: PropTypes.func.isRequired
};