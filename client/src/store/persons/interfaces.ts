export interface Person {
  birthday: string | null;
  known_for_department: string;
  deathday: string | null;
  id: number;
  name: string;
  also_known_as: string[];
  gender: 0 | 1 | 2;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: string | null;
}

export interface PersonSummary {
  profile_path: string;
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
}
