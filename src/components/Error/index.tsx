import { FC } from 'react';

// Assets
import rickAndMorty from '../../assets/rick-and-morty.png';

// Styles
import './styles.scss';

const Error: FC = () => {
  return (
    <div className='error'>
      <img src={rickAndMorty} alt='error' height='350px' />
      <h3>Hubo un error y no se pudieron cargar los personajes</h3>
    </div>
  );
};

export default Error;
