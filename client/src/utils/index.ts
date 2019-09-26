import genres from '../data/genres';

export const minutesConverter = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursPhrase = hours > 1 ? `${hours} hours` : '1 hour';

  if (!mins) return hoursPhrase;

  return `${hoursPhrase} and ${mins > 1 ? `${mins} minutes` : '1 minute'}`;
};

export const genreIdToString = (genreId: number) => genres[genreId];
