import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: "The Ring",
        description:"Teenage girls Katie and Becca discuss an urban legend about a cursed videotape that causes whoever watches it to die ins even days. That night, Katie, who watched it a week ago, is killed by an unseen force.",
        year:"2002",
        genre:"Horror",
        director: "Gore Verbinski",
        image: "https://en.wikipedia.org/wiki/The_Ring_(2002_film)#/media/File:Theringpostere.jpg", 
    },
    {   id: 2, 
        title: "Great Expectations",
        description:"A contemporary film adaptation of Charles Dickens’s 1861 novel of the same name, it is known for having moved the setting of the original novel from 1812-1827 London to 1990s New York.",
        year:"1998",
        genre:"Romance", 
        image:"https://en.wikipedia.org/wiki/Great_Expectations_(1998_film)#/media/File:Great_expectations_poster.jpg",
        director: "Alfonso Cuarón"
     },
    {   id: 3, 
        title: "Alien:Covenant" , 
        description:"A joint American and British production, it is a sequel to Prometheus (2012), the second entry in the Alien prequel series, and the sixth installment in the series but counting crossovers eighth film in the overall Alien franchise (three of which have been directed by Scott)", 
        year:"2017",
        genre:"Horror",
        image:"https://en.wikipedia.org/wiki/Alien:_Covenant#/media/File:Alien_Covenant_Teaser_Poster.jpg",
        director: "Ridley Scott"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
