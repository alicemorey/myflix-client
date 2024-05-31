import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");
const [user, setUser] = useState(storedUser? storedUser : null);
const [token, setToken] = useState(null);
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);

  
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
  <div>
 {!user ? (
      <>
    <LoginView 
      onLoggedIn={(user, token) => {
      setUser(user);
      setToken(token);
    }}
    />
      or
      <SignupView/>
      </>
    ): selectedMovie ? (
      <MovieView 
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    ): movies.length === 0 ? (
      <>
        <button className="logout-button"
          onClick={() => {
            setUser(null);
            setToken(null); 
            localStorage.clear();
          }}
        >
          Logout
        </button>
    <div>The list is empty!</div>;
    </>
    ):(
    <>
   <Row>
      {movies.map((movie) => (
        <Col className="mb-5" key={movie.id} md={3}>
        <MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}
    </Row>
    <button className="logout-button"
        onClick={() => {
          setUser(null);
        }}
      >
        Logout 
      </button>
      </>

  )}
  </div>
  );
};
