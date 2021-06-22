import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovies from '../AddMovies/AddMovies';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  console.log('App is rendering');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <div className='App'>
      <Router>
        <header>
          <h1 className='App-header'>Movie Lovers Online</h1>
          <Link to='/addmovies'>Add Movie</Link>
        </header>
        <br />
        <Route path='/' exact>
          <MovieList />
        </Route>
        <Route path='/addmovies' exact>
          <AddMovies />
        </Route>
        <Route path='/details/:movieId'>
          <MovieDetails />
        </Route>
      </Router>
    </div>
  );
}

export default App;
