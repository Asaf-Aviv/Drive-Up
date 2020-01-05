import { ShortMedia } from 'store/types'

const siteVideoUrls = {
  YouTube: (videoId: string) => `https://www.youtube.com/embed/${videoId}`,
  Vimeo: (videoId: string) => `https://player.vimeo.com/video/${videoId}`,
}

const getMovieUrl = (site: string, videoId: string) =>
  siteVideoUrls[site]?.(videoId)

export const formatRuntime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} mins`
  }

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  const hoursPhrase = hours > 1 ? `${hours} hrs` : '1 hr'

  return mins ? `${hoursPhrase} ${mins} mins` : hoursPhrase
}

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const formatDate = (date: any) =>
  new Date(date).toLocaleDateString('en-US', dateOptions)

const formatImage = image => ({
  aspectRatio: image.aspect_ratio,
  url: image.file_path,
})

const formatCrew = person => ({
  id: person.id,
  name: person.name,
  poster: person.profile_path,
  ...'character' in person && {
    character: person.character,
    order: person.order,
  },
  ...'department' in person && {
    department: person.department,
    job: person.job,
  },
})

export const formatPersomSummary = ({
  id,
  name,
  profile_path,
  known_for,
  known_for_department,
}) => ({
  id,
  name,
  poster: profile_path,
  knownFor: known_for,
  department: known_for_department,
})

const formatCompany = company => ({
  id: company.id,
  name: company.name,
  backdrop: company.logo_path,
})

export const formatShortMedia = (media): ShortMedia => ({
  id: media.id,
  name: media.title || media.name,
  genres: media.genre_ids,
  poster: media.poster_path,
  backdrop: media.backdrop_path,
  originalLanguage: media.original_language,
  overview: media.overview,
  voteAverage: media.vote_average,
  date: formatDate(media.release_date || media.first_air_date),
})

const formatRelatedMedia = media => ({
  results: media.results.map(formatShortMedia),
  page: media.page,
  totalPages: media.total_pages,
  totalResults: media.total_results,
  isLastPage: !media.total_pages || media.page === media.total_pages,
  loading: false,
  error: false,
})

export const formatPerson = person => ({
  id: person.id,
  birthday: formatDate(person.birthday),
  department: person.known_for_department,
  homepage: person.homepage,
  poster: person.profile_path,
  name: person.name,
  alsoKnownAs: person.also_known_as,
  biography: person.biography,
  placeOfBirth: person.place_of_birth,
  videos: person.videos.map(video => ({
    name: video.name,
    src: getMovieUrl(video.site, video.key),
  })),
  images: person.images.profiles.map(formatImage),
  movies: person.movie_credits.cast.map(formatShortMedia),
  shows: person.tv_credits.cast.map(formatShortMedia),
})

const formatEpisode = seasonName => episode => ({
  date: episode.air_date,
  episodeNumber: episode.episode_number,
  name: episode.name,
  overview: episode.overview,
  seasonNumber: episode.season_number,
  showId: episode.show_id,
  backdrop: episode.still_path,
  voteAverage: episode.vote_average,
  voteCount: episode.vote_count,
  crew: episode.crew.map(formatCrew),
  guestStars: episode.guest_stars.map(formatCrew),
  seasonName,
})


export const formatSeason = (season, showName, showId) => ({
  showId,
  showName,
  name: season.name,
  overview: season.overview,
  date: formatDate(season.air_date),
  poster: season.poster_path,
  seasonNumber: season.season_number,
  ...season.episode_count && {
    episodesCount: season.episode_count,
  },
  ...season.episodes && {
    episodes: season.episodes.map(formatEpisode(season.name)),
  },
})

export const formatFullMedia = (media: any) => {
  const movieFields: any = {}
  const showFields: any = {}

  if ('seasons' in media) {
    const lastEpisode = media.last_episode_to_air
    const [country] = media.origin_country

    showFields.type = media.type
    showFields.date = formatDate(media.first_air_date)
    showFields.networks = media.networks.map(formatCompany)
    showFields.country = country
    showFields.runtime = formatRuntime(media.episode_run_time[0])
    showFields.seasonsCount = media.number_of_seasons
    showFields.episodesCount = media.number_of_episodes
    showFields.nextEpisodeDate = formatDate(media.next_episode_to_air?.air_date)
    showFields.lastEpisode = lastEpisode
      ? {
        id: lastEpisode.id,
        date: formatDate(lastEpisode.air_date),
        seasonNumber: lastEpisode.season_number,
        episodeNumber: lastEpisode.episode_number,
        name: lastEpisode.name,
        overview: lastEpisode.overview,
        showId: lastEpisode.show_id,
        backdrop: lastEpisode.still_path,
      }
      : null
    showFields.seasons = media.seasons.map(formatSeason)
  } else {
    movieFields.collection = media.belongs_to_collection ? {
      id: media.belongs_to_collection.id,
      name: media.belongs_to_collection.name,
      backdrop: media.belongs_to_collection.backdrop_path,
    } : null
    movieFields.countries = media.production_countries.map(({ iso_3166_1 }) => iso_3166_1)
    movieFields.adult = media.adult
    movieFields.budget = media.budget
    movieFields.runtime = formatRuntime(media.runtime)
    movieFields.languages = media.spoken_languages.map(({ name }) => name)
    movieFields.date = formatDate(media.release_date)
    movieFields.tagline = media.tagline
    movieFields.pg = media.release_dates.results.find(
      (d: any) => d.iso_3166_1 === 'US',
    )?.release_dates[0].cetrification
    movieFields.revenue = media.revenue
  }

  const { crew, cast } = media.credits
  const { videos } = media
  const trailer = videos.results.find(({ type }) => type === 'Trailer')
  const director = crew.find(({ department }) => department === 'Directing')

  return {
    id: media.id,
    name: media.title || media.name,
    genres: media.genres.map(genre => genre.id),
    homepage: media.homepage,
    overview: media.overview,
    companies: media.production_companies.map(formatCompany),
    originalLanguage: media.original_language.toUpperCase(),
    similar: formatRelatedMedia(media.similar),
    recommendations: formatRelatedMedia(media.recommendations),
    videos: videos.results.map(video => ({
      name: video.name,
      src: getMovieUrl(video.site, video.key),
    })),
    posters: media.images.posters.map(formatImage),
    backdrops: media.images.backdrops.map(formatImage),
    cast: cast.map(formatCrew),
    crew: crew.map(formatCrew),
    backdrop: media.backdrop_path,
    poster: media.poster_path,
    voteAverage: media.vote_average,
    voteCount: media.vote_count,
    status: media.status,
    trailer: trailer
      ? {
        name: trailer.name,
        src: getMovieUrl(trailer.site, trailer.key),
      }
      : null,
    director: director
      ? {
        id: director.id,
        name: director.name,
        poster: director.profile_path,
        department: director.department,
        job: director.job,
      }
      : null,
    writers: crew
      .filter(({ department }) => department === 'Writing')
      .map(formatCrew),
    ...movieFields,
    ...showFields,
  }
}
