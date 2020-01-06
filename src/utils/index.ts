import genres from '../data/genres'

export const genreIdToString = (genreId: number) => genres[genreId]

export const getImgUrl = (imgPath: string | null, width: number | string = 185) =>
  typeof width === 'string'
    ? `https://image.tmdb.org/t/p/${width}${imgPath}`
    : `https://image.tmdb.org/t/p/w${width}${imgPath}`
