import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import './MovieList.css';
import { useHistory } from 'react-router-dom';

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    dispatch({ type: 'FETCH_GENRE' });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <section className='movies'>
        {movies.map((movie) => {
          return (
            <div className='cardMain' key={movie.id}>
              <br />
              <Card className='cardContent'>
                <Button onClick={() => history.push(`/details/${movie.id}`)}>
                  <img
                    className='imageResizer'
                    src={movie.poster}
                    alt={movie.title}
                  />
                </Button>
              </Card>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
