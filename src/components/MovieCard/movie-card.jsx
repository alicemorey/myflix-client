import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => 
  {
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image}/>
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
          </Button>
        </Card.Body>
      </Card>
        );
 };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };
  