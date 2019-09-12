import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import { PersonSummary as IPersonSummary } from '../../store/persons/interfaces';
import RetryButton from '../RetryButton';
import { requestPersons } from '../../store/persons/actions';
import PersonShowcase from '../PersonShowcase';

const PersonsList: React.FC = () => {
  const {
    page, loading, persons, error,
  } = useShallowEqualSelector(state => state.persons);
  const dispatch = useDispatch();
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  const fetchNextPersonsPage = () => {
    dispatch(requestPersons(page + 1));
  };

  useEffect(fetchNextPersonsPage, []);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPersonsPage);

  const renderPersonSummary = (person: IPersonSummary) => (
    <ListItem key={person.id}>
      <PersonShowcase {...person} />
    </ListItem>
  );

  return (
    <main>
      <List>
        {persons.map(renderPersonSummary)}
        {!error && !loading && <span ref={fetchNextPageTrigger} />}
        {loading && <span>Loading...</span>}
        {error && <RetryButton onClick={fetchNextPersonsPage} />}
      </List>
    </main>
  );
};

export default PersonsList;
