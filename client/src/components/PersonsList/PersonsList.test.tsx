import React from 'react';
import 'intersection-observer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { MemoryRouter } from 'react-router';
import { MovieShowcase } from '../../store/movies/interfaces';
import configureStore from '../../store/configureStore';
import moviesReducer from '../../store/movies/reducers';
import { rootReducer } from '../../store';
import { PersonSummary } from '../../store/persons/interfaces';
import PersonsList from './PersonsList';
import personsReducer from '../../store/persons/reducers';

const persons: PersonSummary[] = [
  {
    popularity: 20.346,
    known_for_department: 'Acting',
    gender: 2,
    id: 6384,
    profile_path: '/bOlYWhVuOiU6azC4Bw6zlXZ5QTC.jpg',
    adult: false,
    name: 'Keanu Reeves',
  },
  {
    popularity: 35.731,
    known_for_department: 'Directing',
    gender: 2,
    id: 224653,
    profile_path: '/b0fUF8XeZb3qDBb7ktEJlQL8ZAx.jpg',
    adult: false,
    name: 'Kazuo Kuroki',
  },
];

describe('PersonsList component', () => {
  let store: Store;

  it('renders correctly', () => {
    store = configureStore(rootReducer);

    const wrapper = mount(
      <Provider store={store}>
        <PersonsList />
      </Provider>
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render Loading... when loading state is true', () => {
    store = configureStore(personsReducer, {
      persons: {
        page: 0,
        loading: true,
        error: false,
        persons: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PersonsList />
      </Provider>
    );

    const spanText = wrapper.find('span').text();

    expect(spanText).toEqual('Loading...');
  });

  it('should render RetryButton component when error state is true', () => {
    store = configureStore(personsReducer, {
      persons: {
        page: 0,
        loading: false,
        error: true,
        persons: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PersonsList />
      </Provider>
    );

    expect(wrapper.find('RetryButton')).toHaveLength(1);
  });

  it('should render persons list', () => {
    store = configureStore(personsReducer, {
      persons: {
        page: 0,
        loading: false,
        error: false,
        persons,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PersonsList />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('PersonShowcase')).toHaveLength(2);
  });
});
