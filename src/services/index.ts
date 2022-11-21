// Axios
import axios from 'axios';

// Interfaces
import { Character, Pagination } from '../types/types';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = (): Promise<Array<Character>> => {
  const response = axios
    .get(API_URL)
    .then(response => response.data.results)
    .catch(err => console.log(err));
  return response;
};

export const getPaginationData = (): Promise<Pagination> => {
  const response = axios
    .get(API_URL)
    .then(response => response.data.info)
    .catch(err => console.log(err));
  return response;
};
