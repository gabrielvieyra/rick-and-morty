import { FC, useContext } from 'react';

// Context
import { CharactersContext } from '../../context/CharactersContext';

// Components
import Button from '../Button';

// Custom hooks
import { usePagination } from '../../hooks/usePagination';

// Styles
import './styles.scss';

const Pagination: FC = () => {
  const { totalResults, pages, actualPage, prevPage, nextPage, characters } =
    useContext(CharactersContext);

  const goToPage = usePagination();

  return (
    <>
      {characters && (
        <div className='pagination'>
          <div className='pagination__item'>
            <span className='pagination__item-data'>Total results:</span>
            <span>{totalResults}</span>
          </div>
          <div className='pagination__item'>
            <span className='pagination__item-data'>Page:</span>
            <span>
              {actualPage} of {pages}
            </span>
          </div>
          <div className='pagination__item'>
            <span className='pagination__item-data'>Go to page:</span>
            <select
              name='goTo'
              className='pagination__item-select'
              value={actualPage}
              data-type='goTo'
              onChange={e => goToPage('', e)}
            >
              {Array.from(Array(pages).keys()).map(page => {
                return (
                  <option key={page + 1} value={page + 1}>
                    {page + 1}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='pagination__buttons'>
            {/* con el data-type lo que hacemos es saber a que boton le di click */}
            <Button
              ariaLabel='button'
              dataType='prev'
              isDisabled={prevPage ? false : true}
              handlePage={e => goToPage(prevPage as string, e)}
            >
              Previous
            </Button>
            <Button
              ariaLabel='button'
              dataType='next'
              isDisabled={nextPage ? false : true}
              handlePage={e => goToPage(nextPage as string, e)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
