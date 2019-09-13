export interface Show {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {} | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
