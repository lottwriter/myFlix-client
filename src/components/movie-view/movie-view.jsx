export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} alt='movie'/>
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Year published: </span>
          <span>{movie.year}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
 