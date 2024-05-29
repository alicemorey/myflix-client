import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";

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


  if (!user) {
    return (
      <>
    <LoginView onLoggedIn={(user, token) => {
      setUser(user);
      setToken(token);
    }}/>
      or
      <SignupView/>
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView 
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);setToken(null); localStorage.clear();
          }}
        >
          Logout
        </button>
    
    <div>The list is empty!</div>;
    </>
    );
  }

  return (
    <div>
     <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
