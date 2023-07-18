import './movie-view.scss';
export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie);
    return (
      <div>
        <div>
          <img src={movie.ImagePath} alt='movie'/>
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Year published: </span>
          <span>{movie.Year}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <button onClick={onBackClick} className='back-button'>Back</button>
      </div>
    );
  };
 