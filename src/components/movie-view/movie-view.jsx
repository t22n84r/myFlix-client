export const MovieView = (props) => {
    return (
      <div>
        <h3> Title </h3>
        <p> {props.movieView.title} </p>
  
        <h3> Description </h3>
        <p> {props.movieView.description} </p>
  
        <h3>Director</h3>
        {props.movieView.director.map((director, index) => (
          <div key={index}>
            <p>Name: {director.name}</p>
            <p>Bio: {director.bio}</p>
            <p>Birth Year: {director.birthyear}</p>
            <p>Death Year: {director.deathyear || "N/A"}</p>
          </div>
        ))}
  
        <h3>Genre</h3>
        <p>Name: {props.movieView.genre.name}</p>
        <p>Description: {props.movieView.genre.description}</p>
  
        <img alt={props.movieView.title} src={props.movieView.imageurl} width={300}/>
  
        <p>Featured: {props.movieView.featured ? "Yes" : "No"}</p>
  
        <button onClick={props.onBackClick}>Back</button>
      </div>
    );
  };
  