import PropTypes from "prop-types";
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export const MovieCard = ({ movie, onMovieClick }) => {
console.log("Movie: "+movie)
  const movies = (useSelector((state) => state.movies))

  return (
    <Card className="h-100">
      <Card.Img variant='top' src={movie.ImagePath} style={{width: 200}}/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Button variant="link">Open
        </Button>
        </Link>
      </Card.Body>
    </Card> 
 );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired
  }).isRequired,
};