import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('ADD_MOVIES', addMovies); // Post movies to the movie list
  yield takeEvery('FETCH_GENRE', fetchGenre); // Post movies to the movie list
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie');
    console.log('Get all movies:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch {
    console.log('get all error');
  }
}

function* fetchGenre() {
  // get all genres from the DB
  try {
    const genres = yield axios.get('/api/genre');
    console.log('Get all genres:', genres.data);
    yield put({ type: 'SET_GENRES', payload: genres.data });
  } catch {
    console.log('get all error');
  }
}

function* addMovies(action) {
  try {
    yield axios.post('/api/movie', action.payload); // to add new movies
    console.log('Added movie');
    yield put({ type: 'FETCH_MOVIES' });
  } catch (err) {
    console.log('Error Adding Movie', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    addMovies,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
