import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import { requestPopularPersons } from '../../store/persons/actions';
import InfiniteMediaList from '../shared/InfiniteMediaList';
import Poster from '../shared/Poster';
import Container from '../shared/Container';

const Persons: React.FC = () => {
  const {
    page,
    loading,
    results: persons,
    error,
    total_pages,
  } = useShallowEqualSelector(state => state.persons.popular);
  const dispatch = useDispatch();
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  const fetchNextPage = () => {
    dispatch(requestPopularPersons(page + 1));
  };

  useEffect(fetchNextPage, []);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPage);

  return (
    <main>
      <Container>
        <InfiniteMediaList
          fetchNextPage={fetchNextPage}
          isLastPage={page === total_pages}
          loading={loading}
          error={error}
        >
          {persons.map(person => (
            <Link key={person.id} to={`/person/${person.id}`}>
              <Poster
                imgPath={person.profile_path}
                alt={person.name}
              />
            </Link>
          ))}
        </InfiniteMediaList>
      </Container>
    </main>
  );
};

export default Persons;
