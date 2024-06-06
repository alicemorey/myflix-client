import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import "./movie-view.scss";

export const MovieView = ({movies}) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);
  return (
    <div>
      <div>
        <img src={movie.image} width={600} className="image"/>
      </div>
      <div className="movie-title">
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
        <div>
        <span>Bio:{movie.director.bio}</span>
        </div>
        <div>
        <span>Birth:{movie.director.birth}</span>
        </div>
      </div>
      <Link to={`/`}> 
      <button className="back-button" style={{ cursor: "pointer" }}> 
      Back 
      </button>
      </Link>
    </div>
  );
};
