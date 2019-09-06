import React from 'react';
import { Link } from 'react-router-dom';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';

const MovieShowcase: React.FC<IMovieShowcase> = ({
  id,
  title,
  original_language,
  overview,
  poster_path,
}) => (
  <Link to={`/movies/${id}`}>
    <div>
      <h2>{title}</h2>
      <p>{original_language}</p>
      <p>{overview}</p>
      <img
        src={`http://image.tmdb.org/t/p/w92/${poster_path}`}
        alt={title}
      />
    </div>
  </Link>
);

export default MovieShowcase;
