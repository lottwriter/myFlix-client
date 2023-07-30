import { Link, useParams } from 'react-router-dom';
import './movie-view.scss';
import React from 'react';

export const MovieView = ({ movies, user, token, updatedUser }) => {
  const { MovieID } = useParams();
  const movie = movies.find((b) => b.id === MovieID)

  const addFavorite = async () => {
    await fetch(`https://movieflixapi-267bf627ca0c.herokuapp.com/users/${user.Username}/${movie.id}`, {
      method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      if (response.ok) {
        alert('Added to favorites')
      } else {
        alert("Failure.")
      }
    }).then((user) => {
      if (user) {
        setFavorite(true);
        updatedUser(user);
      }
    })
  }

  const removeFavorite = () => {
    fetch(`https://movieflixapi-267bf627ca0c.herokuapp.com/users/${user.Username}/${movie.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      if (response.ok) {
        alert("Removed from favorites")
      } else {
        alert("Failure.")
      }
    }).then((user) => {
      if (user) {
        setFavorite(true);
        updatedUser(user);
      }
    })
  }
 
  console.log(MovieID + `1`);
  console.log(movies)

  if (!movies || movies.length === 0) {
    return <div>Loading...</div>; 
  }

 
  console.log(movie);

  if (!movie) {
    return <div>Movie not found</div>; 
  }

    return (
      <div>
        <div>
          <img className='w-50' src={movie.ImagePath} alt='movie'/>
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
          <div>
          <button variant='link' onClick={removeFavorite}>Remove from Favorites</button>
          </div>
          <div>
          <button variant='link' onClick={addFavorite}>Favorite</button>
        </div>
        
        <Link to={`/`}>
          <div>
          <button className='back-button'>Back</button>
          </div>
        </Link>
       
      </div>
    );
  };
 