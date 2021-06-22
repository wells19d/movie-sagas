import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import Button from '@material-ui/core/Button';
import './MovieDetails.css';
import Card from '@material-ui/core/Card';

function MovieDetails() {
  const movies = useSelector((store) => store.movies); // entire movie list in redux
  const genres = useSelector((store) => store.genres);

  let params = useParams(); // grabbbing params from the react router
  console.log(params);

  let movieId = params.movieId; // id setup in app.js

  let movie = movies.find((movie) => movie.id === Number(movieId)); // hunting for the book id given
  console.log(`Found movie`, movie);

  if (!movie) {
    // bailout if movie isn't found
    return <h2> Movie ID Not Found</h2>;
  }

  return (
    <Card className='cardStyle'>
      <h1>{movie.title}</h1>
      <table className='movieDetail'>
        <tbody>
          <tr>
            <td className='poster'>
              <img className='imageResizer' src={movie.poster} />
            </td>
            <td className='movieDesc'>{movie.description}</td>
          </tr>
        </tbody>
      </table>
      <Router>
        <Button>
          <Link to='/'>Back to List</Link>
        </Button>
        <Route path='/' exact>
          <MovieList />
        </Route>
      </Router>
    </Card>
  );
}
export default MovieDetails;
