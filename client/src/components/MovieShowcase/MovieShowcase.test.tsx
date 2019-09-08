import React, { FunctionComponent } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MovieShowcase from './MovieShowcase';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';

const movie: IMovieShowcase = {
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
};

const renderWithProviders = (Component: FunctionComponent<any>, props = {}) => (
  <MemoryRouter>
    <MuiThemeProvider theme={createMuiTheme()}>
      <Component {...props} />
    </MuiThemeProvider>
  </MemoryRouter>
);

describe('MovieShowcase component', () => {
  it('renders correctly', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should display the title of the movie', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    const title = wrapper.find('h2').text();
    expect(title).toEqual(movie.title);
  });

  it('should have a link to the movie by id ', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    const href = wrapper.find('a').prop('href');
    expect(href).toEqual(`/movie/${movie.id}`);
  });
});
