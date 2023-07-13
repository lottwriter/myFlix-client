import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => {
      if (!token) {
        return;
      }
      
      fetch("https://movieflixapi-267bf627ca0c.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((movies) => {
          setMovies(movies)
        });
    }, [token]);

  useEffect(() => {
    fetch("https://movieflixapi-267bf627ca0c.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromAPI = data.map((movie) => {
        return {
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          director: movie.Director.Name,
          genre: movie.Genre.Name,
          year: movie.Year,
          image: movie.ImagePath
        };
      });
        
      setMovies(moviesFromAPI);
    });
}, []);

  

if (!user) {
  return (
    <>
      <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }} />
      or
      <SignupView />
    </>
  );
}

  

    

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
console.log(movies.length)
console.log(movies)
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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};