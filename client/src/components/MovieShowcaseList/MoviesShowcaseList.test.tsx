import React from 'react';
import 'intersection-observer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { MemoryRouter } from 'react-router';
import { MovieShowcase } from '../../store/movies/interfaces';
import MoviesShowcaseList from './MoviesShowcaseList';
import configureStore from '../../store/configureStore';
import moviesReducer from '../../store/movies/reducers';
import { rootReducer } from '../../store';

const movies: MovieShowcase[] = [
  {
    adult: false,
    backdrop_path: '/4W0FnjSGn4x0mKZlBRx8OjFxQUM.jpg',
    genre_ids: [27],
    id: 474350,
    original_language: 'en',
    original_title: 'It Chapter Two',
    overview: '27 years after',
    popularity: 450.453,
    poster_path: '/zfE0R94v1E8cuKAerbskfD3VfUt.jpg',
    release_date: '2019-09-06',
    title: 'It Chapter Two',
    video: false,
    vote_average: 7.4,
    vote_count: 135,
  },
  {
    adult: false,
    backdrop_path: '/4W0FnjSGn4x0mKZlBRx8OjFxQUM.jpg',
    genre_ids: [27],
    id: 52374350,
    original_language: 'en',
    original_title: 'It Chapter Three',
    overview: '3 years after',
    popularity: 450.453,
    poster_path: '/zfE0R94v1E8cuKAerbskfD3VfUt.jpg',
    release_date: '2019-09-06',
    title: 'It Chapter Two',
    video: false,
    vote_average: 7.4,
    vote_count: 135,
  },
];

describe('MoviesShowcaseList component', () => {
  let store: Store;

  it('renders correctly', () => {
    store = configureStore(rootReducer);

    const wrapper = mount(
      <Provider store={store}>
        <MoviesShowcaseList />
      </Provider>
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render Loading... when loading state is true', () => {
    store = configureStore(moviesReducer, {
      movies: {
        page: 0,
        loading: true,
        error: false,
        movies: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <MoviesShowcaseList />
      </Provider>
    );

    const spanText = wrapper.find('span').text();

    expect(spanText).toEqual('Loading...');
  });

  it('should render RetryButton component when error state is true', () => {
    store = configureStore(moviesReducer, {
      movies: {
        page: 0,
        loading: false,
        error: true,
        movies: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <MoviesShowcaseList />
      </Provider>
    );

    expect(wrapper.find('RetryButton')).toHaveLength(1);
  });

  it('should render movies list', () => {
    store = configureStore(moviesReducer, {
      movies: {
        page: 0,
        loading: false,
        error: false,
        movies,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesShowcaseList />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('MovieShowcase')).toHaveLength(2);
  });
});
