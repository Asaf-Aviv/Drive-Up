import React from 'react';
import { mount, shallow } from 'enzyme';
import ShowShowcase from './ShowShowcase';
import { ShowShowcase as IShowShowcase } from '../../store/shows/interfaces';
import { renderWithProviders } from '../../test-utils';

const show: IShowShowcase = {
  backdrop_path: '/1pP0gg0iNGX06wSs19EQOvzfZIF.jpg',
  first_air_date: '1989-12-17',
  genre_ids: [16, 35],
  id: 456,
  name: 'The Simpsons',
  origin_country: ['US'],
  original_language: 'en',
  original_name: 'The Simpsons',
  overview: 'Set in Springfield',
  popularity: 160.624,
  poster_path: '/yTZQkSsxUFJZJe67IenRM0AEklc.jpg',
  vote_average: 7.1,
  vote_count: 2123,
};

describe('ShowShowcase component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ShowShowcase {...show} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render the name of the show', () => {
    const wrapper = mount(renderWithProviders(ShowShowcase, show));
    const name = wrapper.find('h2').text();
    expect(name).toEqual(show.name);
  });

  it('should render the overview of the show', () => {
    const wrapper = mount(renderWithProviders(ShowShowcase, show));
    const overview = wrapper.find('h6').text();
    expect(overview).toEqual(show.overview);
  });

  it('should render a link to the show by id', () => {
    const wrapper = mount(renderWithProviders(ShowShowcase, show));
    const href = wrapper.find('a').prop('href');
    expect(href).toEqual(`/show/${show.id}`);
  });

  it('should render the show image', () => {
    const wrapper = mount(renderWithProviders(ShowShowcase, show));
    const imgSrc = wrapper.find('img').prop('src');
    const baseSrc = 'http://image.tmdb.org/t/p/w';

    expect(wrapper.exists('img')).toBeTruthy();
    expect(imgSrc).toContain(baseSrc);
    expect(imgSrc).toContain(show.poster_path);
  });
});
