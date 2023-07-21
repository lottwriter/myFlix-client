import { Link, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, movies }) => {
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))
    console.log(favoriteMovies);
    console.log(movies);
    return (
    <div><Row className='m-4'>
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
             {favoriteMovies !== 0 && (
            <div>
                <span>{favoriteMovies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard movieData={movie} />
                    </Col>
               ))} </span>
            </div>
            )}
        </div>
    </div>
)
}