import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");
const [user, setUser] = useState(storedUser? storedUser : null);
const [token, setToken] = useState(null);
const [movies, setMovies] = useState([]);

  
  useEffect(()=> {
    if (!token) return;
    fetch ("https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/movies",{
    headers: { Authorization: `Bearer ${token}` },
   })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre,
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birth: movie.Director.Birth
            },
            image: movie.ImagePath,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

return (
  <BrowserRouter>
    <Row className ="justify-content-md-center">
      <Routes>
        <Route
          path="/signup"
          element={
            <>
             {!user ? (
              <Navigate to="/" />
             ):(
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
            {user? (
              <Navigate to="/" />
            ) :(
              <Col md={5}>
              <LoginView onLoggedIn={(user)=> setUser(user)}/>
              </Col>
            )}
            </>
          }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user? (
                  <Navigate to="/login" replace />
                ): movies.length === 0 ? (
                  <Col> This list is empty!</Col>
                ):(
                  <Col md={8}>
                    <MovieView movies={movies}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
          path="/"
          element={
            <>
              {!user? (
                <Navigate to="/login" replace />
              ): movies.length === 0 ? (
                  <Col> This list is empty!</Col>
                ):(
                <>
                {movies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard movie={movie} />
                </Col>
                ))}
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
