export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
        </div>
        <div>
        <span>Year: </span>
        <span>{movie.Year}</span>
         </div>
        <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };