// Axios
import axios from 'axios';

// Interfaces
import { Character, Pagination } from '../types/types';

export const getCharacters = (api: string): Promise<Array<Character>> => {
  const response = axios
    .get(api)
    .then(response => response.data.results)
    .catch(err => console.log(err));
  return response;
};

export const getPaginationData = (api: string): Promise<Pagination> => {
  const response = axios
    .get(api)
    .then(response => response.data.info)
    .catch(err => console.log(err));
  return response;
};
