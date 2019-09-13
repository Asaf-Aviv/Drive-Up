import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import { ShowShowcase as IShowShowcase } from '../../store/shows/interfaces';
import RetryButton from '../RetryButton';
import { requestShows } from '../../store/shows/actions';
import ShowShowcase from '../ShowShowcase';

const ShowShowcaseList: React.FC = () => {
  const {
    page, loading, shows, error,
  } = useShallowEqualSelector(state => state.shows);
  const dispatch = useDispatch();
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  const fetchNextShowsPage = () => {
    if (shows.length) return;

    dispatch(requestShows(page + 1));
  };

  useEffect(fetchNextShowsPage, []);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextShowsPage);

  const renderShowsShowcase = (show: IShowShowcase) => (
    <ListItem key={show.id}>
      <ShowShowcase {...show} />
    </ListItem>
  );

  return (
    <main>
      <List>
        {shows.map(renderShowsShowcase)}
        {!error && !loading && <span ref={fetchNextPageTrigger} />}
        {loading && <span>Loading...</span>}
        {error && <RetryButton onClick={fetchNextShowsPage} />}
      </List>
    </main>
  );
};

export default ShowShowcaseList;
