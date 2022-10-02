// Dependencies
import { createContext, useState, useEffect } from 'react';

// Interface
import { Character } from '../types/types';

interface CharactersContextProps {
  characters: Array<Character>;
  totalResults: number;
  pages: number;
  actualPage: number;
  prevPage: string | null;
  nextPage: string | null;
  goToPage: (
    page: string,
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export const CharactersContext = createContext({} as CharactersContextProps);

interface CharactersProviderProps {
  children: React.ReactNode;
}

export const CharactersProvider: React.FC<CharactersProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<null | string>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData(): Promise<void> {
    try {
      const getResponse = await fetch('https://rickandmortyapi.com/api/character');
      const getJson = await getResponse.json();
      const { info, results } = getJson;
      // console.log(info);
      setCharacters(results);
      setTotalResults(info.count);
      setPages(info.pages);
      setPrevPage(info.prev);
      setNextPage(info.next);
    } catch (err) {
      console.log(err);
    }
  }

  async function goToPage(
    page: string,
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    // el dataset.type es para obtener el data-type
    const type = (e.target as HTMLButtonElement).dataset.type;
    let number = 0;

    switch (type) {
      case 'prev':
        setActualPage(actualPage - 1);
        break;
      case 'next':
        setActualPage(actualPage + 1);
        break;
      case 'goTo':
        number = Number((e.target as HTMLSelectElement).value);
        page = `https://rickandmortyapi.com/api/character?page=${number}`;
        setActualPage(number);
        break;
      default:
        return;
    }

    try {
      const getResponse = await fetch(page);
      const getJson = await getResponse.json();
      const { info, results } = getJson;
      setCharacters(results);
      setPrevPage(info.prev);
      setNextPage(info.next);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CharactersContext.Provider
      value={{ characters, totalResults, pages, actualPage, prevPage, nextPage, goToPage }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
