import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Button, Card, CardBody} from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onToggleFavorite}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState();
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(movie.id, !isFavorite);
  };

    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image}/>
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Link to={encodeURIComponent(movie.id)}>
        <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
        );
 };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
    title: PropTypes.string
    }).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
  };
  