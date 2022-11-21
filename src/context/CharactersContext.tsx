import { FC, ReactNode, createContext, useState, useEffect } from 'react';

// Services
import { getCharacters, getPaginationData } from '../services';

// Interface
import { Character } from '../types/types';

interface CharactersContextProps {
  characters: Array<Character>;
  loading: boolean;
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
  children: ReactNode;
}

export const CharactersProvider: FC<CharactersProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<null | string>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);

  useEffect(() => {
    getData();
  }, []);

  function getData(): void {
    getCharacters()
      .then(response => {
        setCharacters(response);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

    getPaginationData()
      .then(response => {
        setTotalResults(response.count);
        setPages(response.pages);
        setPrevPage(response.prev);
        setNextPage(response.next);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function goToPage(
    page: string,
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    setLoading(true);
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
      setLoading(false);
      setPrevPage(info.prev);
      setNextPage(info.next);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <CharactersContext.Provider
      value={{
        characters,
        loading,
        totalResults,
        pages,
        actualPage,
        prevPage,
        nextPage,
        goToPage,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
