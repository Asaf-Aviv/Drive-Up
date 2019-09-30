import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import { PersonSummary } from '../../store/persons/interfaces';
import RetryButton from '../RetryButton';
import { requestPopularPersons } from '../../store/persons/actions';
import CelebTile from '../CelebTile';

const PersonsList: React.FC = () => {
  const {
    page, loading, results, error,
  } = useShallowEqualSelector(state => state.persons.popular);
  const dispatch = useDispatch();
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  const fetchNextPersonsPage = () => {
    dispatch(requestPopularPersons(page + 1));
  };

  useEffect(fetchNextPersonsPage, []);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPersonsPage);

  const renderPersonSummary = (person: PersonSummary) => (
    <Grid item xs={3} key={person.id}>
      <CelebTile
        id={person.id}
        name={person.name}
        image={person.profile_path}
      />
    </Grid>
  );

  return (
    <main>
      <Container>
        <Grid container spacing={3}>
          {results.map(renderPersonSummary)}
          {!error && !loading && <span ref={fetchNextPageTrigger} />}
          {loading && <span>Loading...</span>}
          {error && <RetryButton onClick={fetchNextPersonsPage} />}
        </Grid>
      </Container>
    </main>
  );
};

export default PersonsList;
