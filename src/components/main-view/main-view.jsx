import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://movieflixapi-267bf627ca0c.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromAPI = data.map((movie) => {
        return {
          title: movie.title,
          description: movie.description,
          genre: movie.genre.name,
          director: movie.director.name,
          year: movie.year
        };
      });

      setBooks(moviesFromAPI);
    });
}, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView 
      movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} 
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};