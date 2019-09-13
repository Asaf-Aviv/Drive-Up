export interface PersonSummary {
  profile_path: string;
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
  known_for_department: string;
  gender: 0 | 1 | 2;
}
