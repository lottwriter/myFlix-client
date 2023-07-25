import { Link, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { useState, useEffect } from 'react';

export const ProfileView = ({ user, movies, token }) => {
     
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    useEffect(() => {
      fetch(`https://movieflixapi-267bf627ca0c.herokuapp.com/users/${user.Username}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`Returned data: ` + data);
          const filteredMovies = movies.filter((m) => data.FavoriteMovies.includes(m.id));
          setFavoriteMovies(filteredMovies);
        });
    }, []);

 
  return (
    <div>
      <Row className='m-4'>
        <Col>
          <div>
            <span>Username: </span>
            <span>{user.Username}</span>
          </div>
        </Col>
        <Col>
          <div>
            <span>Email: </span>
            <span>{user.Email}</span>
          </div>
        </Col>
        <Col>
          <div>
            <span>Birthday: </span>
            <span>{user.Birthday} </span>
          </div>
        </Col>
        <Col>
          <div>
            <span>User ID: </span>
            <span>{user._id} </span>
          </div>
        </Col>
      </Row>
      <div>
        <span>Favorite movies: </span>
        {user.FavoriteMovies.length === 0 && (
          <span>You do not have any favorite movies.</span>
        )}
        {favoriteMovies.length > 0 && (
          <Row>
            {favoriteMovies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={3}>
                <MovieCard movieData={movie} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};
