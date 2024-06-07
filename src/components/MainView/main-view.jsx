import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../NavigationBar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("");

  const handleToggleFavorite = (movieId, isFavorite) => {
    console.log(`Toggle favorite for movie with ID ${movieId} (${isFavorite ? 'Add to favorites' : 'Remove from favorites'})`);
  };

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre,
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birth: movie.Director.Birth,
            },
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                  user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                          localStorage.setItem("user", JSON.stringify(user));
                          localStorage.setItem("token", token);
                        }}
                      />
                    </Col>
                  )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )
                }
            />
            <Route
              path="/"
              element={
                !user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Search movies..."
                        value={filter}
                        onChange={handleFilterChange}
                      />
                      {filteredMovies.map((movie) => (
                        <Col md={3} sm={6} xs={12} className="movie-card-col" key={movie.id}>
                          <MovieCard
                            movie={movie}
                            onToggleFavorite={handleToggleFavorite}
                          />
                        </Col>
                      ))}
                    </>
                  )
                }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
