import React, { useRef } from 'react';
import {
  List,
  ListItem,
} from '@material-ui/core';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';
import ShowShowcase from '../ShowShowcase';
import { ShowShowcase as IShowShowcase } from '../../store/shows/interfaces';
import RetryButton from '../RetryButton';

interface ShowsListProps {
  shows: IShowShowcase[];
  fetchNextPage: () => void;
  loading: boolean;
  error: boolean;
  isLastPage: boolean;
}

const ShowsList: React.FC<ShowsListProps> = ({
  shows,
  fetchNextPage,
  loading,
  error,
  isLastPage = false,
}) => {
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPage);

  const renderMovieShowcase = (show: IShowShowcase) => (
    <ListItem disableGutters key={show.id}>
      <ShowShowcase {...show} />
    </ListItem>
  );

  return (
    <List>
      {shows.map(renderMovieShowcase)}
      {!loading && !error && !isLastPage && <span ref={fetchNextPageTrigger} />}
      {loading && <span>Loading...</span>}
      {error && <RetryButton onClick={fetchNextPage} />}
    </List>
  );
};

export default ShowsList;
