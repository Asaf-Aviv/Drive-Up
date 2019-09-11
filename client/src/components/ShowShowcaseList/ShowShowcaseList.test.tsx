import React from 'react';
import 'intersection-observer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { MemoryRouter } from 'react-router';
import ShowShowcaseList from './ShowShowcaseList';
import configureStore from '../../store/configureStore';
import { rootReducer } from '../../store';
import { ShowShowcase } from '../../store/shows/interfaces';
import showsReducer from '../../store/shows/reducers';

const shows: ShowShowcase[] = [
  {
    original_name: 'American Dad!',
    name: 'American Dad!',
    popularity: 92.504,
    genre_ids: [],
    vote_count: 734,
    first_air_date: '2005-02-06',
    backdrop_path: '/vddYkC55H3DqWK5cG5hepSnhzGP.jpg',
    original_language: 'en',
    origin_country: [],
    id: 1433,
    vote_average: 6.1,
    overview: 'The series focuses on an eccentric motley',
    poster_path: '/eo2Xu4UWXHE8UlBlAktNiSsAmfx.jpg',
  },
  {
    original_name: 'Gotham',
    name: 'Gotham',
    popularity: 113.872,
    genre_ids: [],
    vote_count: 1157,
    first_air_date: '2014-09-22',
    backdrop_path: '/mKBP1OCgCG0jw8DwVYlnYqVILtc.jpg',
    original_language: 'en',
    origin_country: [],
    id: 60708,
    vote_average: 6.9,
    overview: 'Before there was Batman, there was',
    poster_path: '/4XddcRDtnNjYmLRMYpbrhFxsbuq.jpg',
  },
];

describe('ShowsShowcaseList component', () => {
  let store: Store;

  it('renders correctly', () => {
    store = configureStore(rootReducer);

    const wrapper = mount(
      <Provider store={store}>
        <ShowShowcaseList />
      </Provider>
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render Loading... when loading state is true', () => {
    store = configureStore(showsReducer, {
      shows: {
        page: 1,
        loading: true,
        error: false,
        shows: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ShowShowcaseList />
      </Provider>
    );

    const spanText = wrapper.find('span').text();

    expect(spanText).toEqual('Loading...');
  });

  it('should render RetryButton component when error state is true', () => {
    store = configureStore(showsReducer, {
      shows: {
        page: 1,
        loading: false,
        error: true,
        shows: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ShowShowcaseList />
      </Provider>
    );

    expect(wrapper.find('RetryButton')).toHaveLength(1);
  });

  it('should render shows list', () => {
    store = configureStore(showsReducer, {
      shows: {
        page: 1,
        loading: false,
        error: false,
        shows,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ShowShowcaseList />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('ShowShowcase')).toHaveLength(2);
  });
});
