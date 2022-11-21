export interface Character {
  name: string;
  image: string;
  id: number;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  location: Location;
  episode: Array<string>;
}

interface Location {
  name: string;
}

export interface Pagination {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}
