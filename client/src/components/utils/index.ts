import genres from '../../data/genres';

export const genreIdToString = (genreIds: number[]) =>
  genreIds.map(id => genres[id]);
