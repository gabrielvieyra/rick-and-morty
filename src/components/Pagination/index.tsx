import { useContext } from 'react';

// Context
import { CharactersContext } from '../../context/CharactersContext';

// Styles
import './styles.scss';

const Pagination: React.FC = () => {
  const { totalResults, pages, actualPage, prevPage, nextPage, goToPage } =
    useContext(CharactersContext);
  // console.log(pages, 'totalPages');

  return (
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
      <div>
        {prevPage && (
          // con el data-type lo que hacemos es saber a que boton le di click
          <button data-type='prev' onClick={e => goToPage(prevPage, e)}>
            Previous
          </button>
        )}
        {nextPage && (
          <button data-type='next' onClick={e => goToPage(nextPage, e)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
