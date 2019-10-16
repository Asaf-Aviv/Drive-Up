interface Episode {
  air_date: string;
  episode_number: number;
  guest_stars: {
    character: string;
    credit_id: string;
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  name: string;
  overview: string;
  id: number;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  show_id: number;
  crew: {
    id: number;
    credit_id: string;
    name: string;
    department: string;
    job: string;
    profile_path: string | null;
  }[];
}

export interface Season {
  _id: string;
  id: string;
  air_date: string;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episodes: Episode[];
}
