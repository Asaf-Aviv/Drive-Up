import React, { useEffect, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch } from 'react-redux';
import useShallowEqualSelector from './hooks/useShallowEqualSelector';
import { requestMovies } from './store/movies/actions';
import { useOnVisibilityTrigger } from './hooks/useOnVisibilityTrigger';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { page, loading, movies } = useShallowEqualSelector(state => state.movies);
  const triggerRef = useRef(null);
  useOnVisibilityTrigger(triggerRef, () => dispatch(requestMovies(page + 1)));

  useEffect(() => {
    dispatch(requestMovies(1));
  }, [dispatch]);

  return (
    <div className="App">
      <CssBaseline />
      {movies.length > 0 && (
        <div>
          {movies.map(movie => (
            <div key={movie.id}>
              <h3>{movie.id}</h3>
              <h3>{movie.title}</h3>
              <p>{movie.original_language}</p>
              <p>{movie.overview}</p>
              <img
                src={`http://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
          {loading ? 'Loading...' : <span ref={triggerRef} />}
        </div>
      )}
    </div>
  );
};

export default App;
