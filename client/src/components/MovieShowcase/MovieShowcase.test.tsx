import { mount } from 'enzyme';
import MovieShowcase from './MovieShowcase';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';
import { renderWithProviders } from '../../test-utils';

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

describe('MovieShowcase component', () => {
  it('renders correctly', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render the title of the movie', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    const title = wrapper.find('h2').text();
    expect(title).toEqual(movie.title);
  });

  it('should render the overview of the movie', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    const title = wrapper.find('h6').text();
    expect(title).toEqual(movie.overview);
  });

  it('should render a link to the movie by id', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    const href = wrapper.find('a').prop('href');
    expect(href).toEqual(`/movie/${movie.id}`);
  });

  it('should render the movie image', () => {
    const wrapper = mount(renderWithProviders(MovieShowcase, movie));
    const imgSrc = wrapper.find('img').prop('src');
    const baseSrc = 'http://image.tmdb.org/t/p/w';

    expect(wrapper.exists('img')).toBeTruthy();
    expect(imgSrc).toContain(baseSrc);
    expect(imgSrc).toContain(movie.poster_path);
  });
});
