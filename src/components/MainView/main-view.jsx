import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(()=>{
    fetch ("https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/movies")
    .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director.Name, 
            Bio: movie.Director.Bio,
            image: "",
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);


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
    return <div>The list is empty!</div>;
  }
  return (
    <div>
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
