import PropTypes from "prop-types";
import { Button, Card } from 'react-bootstrap';
export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant='top' src={movieData.ImagePath} style={{width: 200}}/>
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Description}</Card.Text>
        <Button
          onClick={() => {
            onMovieClick(movieData);
          }}
          variant='link'
        >
          Details
        </Button>
      </Card.Body>
    </Card> 
 );
};
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};