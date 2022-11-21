import { useContext } from 'react';

// Context
import { CharactersContext } from '../context/CharactersContext';

// Services
import { getCharacters, getPaginationData } from '../services';

export const usePagination = (): ((
  page: string,
  e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLSelectElement>
) => void) => {
  const { setLoading, actualPage, setActualPage, setCharacters, setPrevPage, setNextPage } =
    useContext(CharactersContext);

  function goToPage(
    page: string,
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLSelectElement>
  ): void {
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

    getCharacters(page)
      .then(response => {
        setCharacters(response);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

    getPaginationData(page)
      .then(response => {
        setPrevPage(response.prev);
        setNextPage(response.next);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return goToPage;
};
