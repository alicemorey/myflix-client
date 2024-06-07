import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, onToggleFavorite }) => {
  const isFavorite = user.FavoriteMovies.includes(movie.id);

  const handleToggleFavorite = () => {
    fetch(`https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: isFavorite ? "DELETE" : "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then(response => {
      if (response.ok) {
        onToggleFavorite(movie.id, !isFavorite);
      } else {
        alert("Something went wrong");
      }
    });
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary">Open</Button>
        </Link>
        <Button 
          className="ml-2" 
          variant={isFavorite ? "danger" : "success"} 
          onClick={handleToggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  token: PropTypes.string.isRequired,
  onToggleFavorite: PropTypes.func.isRequired
};
