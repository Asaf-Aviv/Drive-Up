export type Category = 'multi' | 'movie' | 'tv' | 'person'

export type Company = {
  name: string
  id: number
  backdrop: string | null
}

export type CollectionSummary = {
  id: string
  name: string
  backdrop: string | null
}

export type Collection<T = ShortMedia> = {
  overview: string
  poster: string | null
  parts: T[]
} & CollectionSummary

export type CollectionInStore = Collection<string>

export type SearchResults = {
  movies: ShortMedia[]
  shows: ShortMedia[]
  persons: PersonByQuery[]
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

export type ResultsPayload<T = string> = {
  results: T[]
  page: number
  totalPages: number
  totalResults: number
}

export type Results<T> = {
  results: T
  page: number
  totalPages: number
  totalResults: number
  isLastPage: boolean
}

export type Video = {
  name: string
  src: string
}

export type LoadingStates = {
  loading: boolean
  error: boolean
}

export type PersonByQuery = {
  id: string
  name: string
  poster: string
  department: string
  knownFor: ShortMedia & { mediaType: 'movie' | 'tv' }[]
}

export type Episode = {
  date: string
  name: string
  overview: string
  backdrop: string
  seasonName: string
  showId: string
  episodeNumber: number
  seasonNumber: number
  voteAverage: number
  voteCount: number
  crew: CrewMember[]
  guestStars: CastMember[]
}

export type SeasonSummary = {
  name: string
  overview: string
  date: string
  episodesCount: number
  poster: string
  seasonNumber: number
}

export type SeasonWithEpisodes = Omit<SeasonSummary, 'episodeCount'> & {
  showId: string
  showName: string
  episodes: Episode[]
}

export type FullShow<T = ShortMedia> = {
  type: string
  networks: Company[]
  country: string
  seasonsCount: number
  episodesCount: number
  nextEpisodeDate: string
  similar: Results<T[]> & LoadingStates
  recommendations: Results<T[]> & LoadingStates
  lastEpisode: {
    id: string
    date: string
    seasonNumber: number
    episodeNumber: number
    name: string
    overview: string
    showId: string
    backdrop: string
  } | null
  season: {
    name: string
    overview: string
    date: string
    episodesCount: number
    poster: string
    seasonNumber: number
  }[]
  homepage: string
  runtime: string
  seasons: {
    name: string
    overview: string
    date: string
    episodesCount: number
    poster: string
    seasonNumber: number
  }[]
  companies: Company[]
  status: string
  videos: Video[]
  posters: Image[]
  backdrops: Image[]
  cast: CastMember[]
  crew: CrewMember[]
  voteCount: number
  trailer: Video
} & ShortMedia

export type FullShowInStore = FullShow<string>

export type SelectedFullShow= FullShow<ShortMedia>

export type FullMovie<T = ShortMedia> = {
  budget: number
  revenue: number
  adult: boolean
  runtime: string
  homepage: string
  collection: CollectionSummary
  companies: Company[]
  languages: string[]
  similar: Results<T[]> & LoadingStates
  recommendations: Results<T[]> & LoadingStates
  videos: Video[]
  posters: Image[]
  backdrops: Image[]
  countries: string[]
  cast: CastMember[]
  crew: CrewMember[]
  tagline: string
  voteCount: number
  status: string
  trailer: Video
  director: CrewMember | null
  writers: CrewMember[]
  pg: string
} & ShortMedia

export type FullMovieInStore = FullMovie<string>

export type SelectedFullMovie = FullMovie<ShortMedia>

export type Person<T = ShortMedia> = {
  id: string
  birthday: string
  department: string
  homepage: string
  poster: string
  name: string
  biography: string
  alsoKnownAs: string[]
  placeOfBirth: string
  videos: Video[]
  images: Image[]
  movies: T[]
  shows: T[]
}

export type SelectedPerson = Person<ShortMedia>

export type PersonInStore = Person<string>

export type Image = {
  aspectRatio: number
  url: string
}

export type CrewMember = {
  id: string
  name: string
  poster: string
  department: string
  job: string
}

export type CastMember = {
  id: string
  name: string
  poster: string
  character: string
  order: number
}

export type ShortMedia = {
  id: string
  name: string
  genres: number[]
  poster: string | null
  backdrop: string | null
  originalLanguage: string
  overview: string
  voteAverage: number
  date: string
}
