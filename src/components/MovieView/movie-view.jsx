import React from "react";
import "./movie-view.scss";
import Col from 'react-bootstrap/Col';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imagepath} />
      </div>
      <div>
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
      <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}> 
      Back 
      </button>
    </div>
  );
};
