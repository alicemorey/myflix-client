import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';

const App = () => (
  <Provider store={store}>
    <div>
      <h1>Movie List</h1>
      <Filter />
      <AddMovie />
      <MovieList />
    </div>
  </Provider>
);

export default App;