import { useContext } from 'react';

// Context
import { CharactersContext } from '../context/CharactersContext';

// Services
import { getCharacters, getPaginationData } from '../services';

export const usePagination = (): ((
  page: string,
  e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLSelectElement>
) => void) => {
  const {
    setLoading,
    actualPage,
    setActualPage,
    setCharacters,
    setPrevPage,
    setNextPage,
    setError,
  } = useContext(CharactersContext);

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
      const response = await getPaginationData(page);
      if (response) {
        setPrevPage(response.prev);
        setNextPage(response.next);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await getCharacters(page);
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

  return goToPage;
};
