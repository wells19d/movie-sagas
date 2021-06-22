import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './AddMovies.css';

function AddMovies(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [genre, setGenre] = useState(0); // set to a 0 used state for genre_id

  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((store) => store.genres); // grabbing all the genre's for option selection
  console.log(`Show me the genres`, genres);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Adding Movie`, { title, description, poster, genre });

    dispatch({
      type: 'ADD_MOVIES',
      payload: {
        title: title,
        description: description,
        poster: poster,
        genre_id: genre,
      },
    });
    history.push('/'); // send user back to movie list
  };

  return (
    <div className='addMain'>
      <Card>
        <form onSubmit={handleSubmit}>
          <table className='addInputTable'>
            <tbody>
              <tr>
                <td className='tableLeft'>Title:</td>
                <td className='tableRight'>
                  <input
                    className='titleField'
                    required
                    placeholder='Movie Title'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className='tableLeft'>Description:</td>
                <td className='tableRight'>
                  <textarea
                    className='descField'
                    required
                    placeholder='Movie Description'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td className='tableLeft'>Poster:</td>
                <td className='tableRight'>
                  <input
                    type='url'
                    placeholder='URL / Website Address'
                    value={poster}
                    onChange={(event) => setPoster(event.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className='tableLeft'>Main Genre:</td>
                <td className='tableRight'>
                  <select onChange={(event) => setGenre(event.target.value)}>
                    <option defaultValue={'DEFAULT'} selected disabled>
                      {/* This throws a warning of the defaultValue. I want the default selected to be forced to be disabled and force change instead of a targeted default value */}
                      - Select One -
                    </option>
                    {genres.map((genre) => {
                      return (
                        <option value={genre.id} key={genre.id}>
                          {genre.name}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan='2' className='buttonField'>
                  <p>
                    <Router>
                      <Button variant='outlined'>
                        <Link to='/'>Cancel</Link>
                      </Button>
                      <Route path='/' exact>
                        <MovieList />
                      </Route>
                    </Router>
                    {`\u00A0\u00A0\u00A0\u00A0\u00A0`}
                    {/* This is just for spacing between the buttons */}
                    <Button variant='outlined' type='submit'>
                      Submit
                    </Button>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Card>
    </div>
  );
}

export default AddMovies;
