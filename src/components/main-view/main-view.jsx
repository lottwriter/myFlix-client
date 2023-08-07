import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import React from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { setUser } from "../../redux/reducers/user";
import { MoviesList } from "../movies-list/movies-list";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  //const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  //const [movies, setMovies] = useState([]);
const movies = useSelector((state) => state.movies);
const user = useSelector ((state) => state.user)

const dispatch = useDispatch();
  


  useEffect(() => {
    if (!token) {
        return;
    }
    fetch("https://movieflixapi-267bf627ca0c.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((data) => {
        const moviesFromApi = data.map((movie) => {
            return {
              id: movie._id,
              Title: movie.Title,
              Description: movie.Description,
              Director: movie.Director.Name,
              Genre: movie.Genre.Name,
              Year: movie.Year,
              ImagePath: movie.ImagePath,
            };
        });
        dispatch(setMovies(moviesFromApi));
    })
    .catch((error) => {
        console.log(error)
    })
}, [token, user]);
  
  

  


  

console.log(movies.length)
  return (
    <HashRouter>
    <NavigationBar onLoggedOut={() => {dispatch(setUser(null)); localStorage.clear(); setToken(null)}} />
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
                    <LoginView token={token} />
                  </Col>
                )}
              </>

            }
          />
          <Route
          path='/:UserID/profile'
          element={
            <Col>
              <ProfileView user={user} movies={movies} token={token}/>
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
                    <MovieView user={user} token={localStorage.getItem("token")} />
                  </Col>
                )}
              </>
            }
          /><Route
          path="/"
          element={
          <>{!user ? <Navigate to="/login" replace /> :
          <MoviesList />}</>
          }
          />
    </Routes>
    </Row>
    </HashRouter>
  );
};