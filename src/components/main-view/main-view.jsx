import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


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
    <BrowserRouter>
    <NavigationBar
    user={user}
    onLoggedOut={() => {setUser(null); localStorage.clear(); setToken(null)}} />
    <Row className="justify-content-md-center">
      <Routes>
      <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
           <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
          path='/:UserID/profile'
          element={
            <Col>
              <ProfileView user={user} movies={movies} />
            </Col>
          } />
           <Route
            path="/movies/:MovieID"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} />
                  </Col>
                )}
              </>
            }
          /><Route
          path="/"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>Loading . . .</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard movieData={movie} />
                    </Col>
                    
                  ))}
                  <Button className='mb-4' onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                </>
              )}
            </>
          }
        />
    </Routes>
    </Row>
    </BrowserRouter>
  );
};