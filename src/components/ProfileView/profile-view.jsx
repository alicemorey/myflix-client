import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, token, movies, onUserUpdate, onUserDeregister }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.split('T')[0]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));
    setFavoriteMovies(favoriteMovies);
  }, [user, movies]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    fetch(`https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedUser)
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated successfully");
        onUserUpdate(updatedUser);
      } else {
        alert("Update failed");
      }
    });
  };

  const handleDeregister = () => {
    fetch(`https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Account deleted");
        onUserDeregister();
      } else {
        alert("Deletion failed");
      }
    });
  };

  const handleToggleFavorite = (movieId, isAdding) => {
    const updatedUser = {
      ...user,
      FavoriteMovies: isAdding
        ? [...user.FavoriteMovies, movieId]
        : user.FavoriteMovies.filter(id => id !== movieId)
    };

    onUserUpdate(updatedUser);

    setFavoriteMovies(
      isAdding
        ? [...favoriteMovies, movies.find(m => m.id === movieId)]
        : favoriteMovies.filter(m => m.id !== movieId)
    );
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={5}>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="submit-button" variant="primary" type="submit">
            Update Profile
          </Button>
          <Button className="deregister-button" variant="danger" onClick={handleDeregister}>
            Deregister
          </Button>
        </Form>
      </Col>
      <Col md={7}>
        <h4>Favorite Movies</h4>
        <Row>
          {favoriteMovies.map(movie => (
            <Col md={4} key={movie.id}>
              <MovieCard movie={movie} user={user} token={token} onToggleFavorite={handleToggleFavorite} />
            </Col>
          ))}
        </Row>
        <h4>All Movies</h4>
        <Row>
          {movies.map(movie => (
            <Col md={4} key={movie.id}>
              <MovieCard movie={movie} user={user} token={token} onToggleFavorite={handleToggleFavorite} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

