import genres from '../data/genres';

export const minutesConverter = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} mins`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursPhrase = hours > 1 ? `${hours} hrs` : '1 hr';

  if (!mins) return hoursPhrase;

  return `${hoursPhrase} ${mins} ${mins > 1 ? 'mins' : 'min'}`;
};

export const genreIdToString = (genreId: number) => genres[genreId];

const dateOptions = {
  year: 'numeric', month: 'long', day: 'numeric',
};

export const formatDate = (date: any) => new Date(date).toLocaleDateString('en-US', dateOptions);

export const getImgUrl = (imgPath: string, width = 185) => `
https://image.tmdb.org/t/p/w${width}/${imgPath}
`;
