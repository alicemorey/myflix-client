import React,{ useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  useEffect(()=>{
    fetch ("https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/movies")
    .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        console.log(data.docs);

        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            genre: doc.genre,
            director: doc.director_name?.[0],
            image: "",
          };
        });
        setBooks(moviesFromApi);
        });
  }, []);

  if (!user) {
    return (
      <>
    <LoginView 
      onLoggedIn={(user, token) => {
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
            setUser(null);
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
