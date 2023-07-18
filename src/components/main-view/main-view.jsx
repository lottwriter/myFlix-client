import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://movieflixapi-267bf627ca0c.herokuapp.com/movies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        const moviesFromAPI = data.map((movie) => ({
          id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Director: movie.Director.Name,
          Genre: movie.Genre.Name,
          Year: movie.Year,
          ImagePath: movie.ImagePath,
        }));
  
        setMovies(moviesFromAPI);
      } catch (error) {
        alert("something broke!")
        console.error(error);
      }
    };
  
    fetchData();
  }, [token]);
  

  


  

console.log(movies.length)
console.log(movies)
  return (
    <Row className="justify-content-md-center">
    {!user ?
       (
        
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
       </Col>
       ) : selectedMovie ? (
      <Col md={8}>
        <MovieView 
      movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} 
      />
      </Col>
       ) : movies.length === 0 ? (
        <div>The list is empty!</div>
       ) :
    
    
    
    <>
      {movies.map((movie) => (
        <Col className="mb-5" key={movie.id} md={3}>
          <MovieCard
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        /></Col>
      ))}
      <Button className='mb-4' onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
    </>
    }
    </Row>
  );
};