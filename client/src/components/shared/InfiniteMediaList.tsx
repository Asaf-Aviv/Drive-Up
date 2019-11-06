import React, { useRef } from 'react';
import styled from 'styled-components';
import { useOnVisibilityTrigger } from '../../hooks/useOnVisibilityTrigger';

interface InfiniteMediaList {
  fetchNextPage: () => void;
  loading: boolean;
  error: boolean;
  isLastPage: boolean;
}

const InfiniteMediaList: React.FC<InfiniteMediaList> = ({
  fetchNextPage,
  loading,
  error,
  isLastPage,
  children,
}) => {
  const fetchNextPageTrigger = useRef<HTMLElement>(null);

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPage);

  return (
    <MediaList>
      {children}
      {!loading && !error && !isLastPage && <span ref={fetchNextPageTrigger} />}
      {loading && <span>Loading...</span>}
      {error && <button type="button" onClick={fetchNextPage}>Retry</button>}
    </MediaList>
  );
};

const MediaList = styled.ul`
  list-style: none;
`;

export default InfiniteMediaList;
