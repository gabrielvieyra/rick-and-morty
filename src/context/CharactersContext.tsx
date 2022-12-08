import { FC, ReactNode, createContext, useState, useEffect } from 'react';

// Services
import { getCharacters, getPaginationData } from '../services';

// Interface
import { Character } from '../types/types';

interface CharactersContextProps {
  characters: Array<Character>;
  setCharacters: (characters: Array<Character>) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: boolean;
  setError: (value: boolean) => void;
  totalResults: number;
  pages: number;
  actualPage: number;
  setActualPage: (actualPage: number) => void;
  prevPage: string | null;
  setPrevPage: (value: string | null) => void;
  nextPage: string | null;
  setNextPage: (value: string | null) => void;
}

export const CharactersContext = createContext({} as CharactersContextProps);

interface CharactersProviderProps {
  children: ReactNode;
}

export const CharactersProvider: FC<CharactersProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<null | string>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData(): Promise<void> {
    const api = 'https://rickandmortyapi.com/api/character';

    try {
      const response = await getPaginationData(api);
      if (response) {
        setTotalResults(response.count);
        setPages(response.pages);
        setPrevPage(response.prev);
        setNextPage(response.next);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await getCharacters(api);
      if (response) {
        setLoading(false);
        setCharacters(response);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
        loading,
        setLoading,
        error,
        setError,
        totalResults,
        pages,
        actualPage,
        setActualPage,
        prevPage,
        setPrevPage,
        nextPage,
        setNextPage,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
