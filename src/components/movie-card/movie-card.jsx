import PropTypes from "prop-types";
export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movieData);
      }}
    >
      {movieData.title}
    </div>
  );
};
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};