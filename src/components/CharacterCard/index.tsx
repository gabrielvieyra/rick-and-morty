// Components
import Info from '../Info';

// Styles
import './styles.scss';

interface CharacterCardProps {
  name: string;
  src: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  lastKnownLocation: string;
  totalEpisodes: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  src,
  status,
  species,
  lastKnownLocation,
  totalEpisodes,
}) => {
  return (
    <div data-cy='character' className={`characterCard characterCard--${status}`}>
      <div className='characterCard__imageContainer'>
        <img src={src} alt={name} className='characterCard__imageContainer-image' />
      </div>
      <div className='characterCard__contentContainer'>
        <div className='characterCard__contentContainer-section'>
          <h2 className='characterCard__contentContainer-section-name'>{name}</h2>
          <div className='characterCard__contentContainer-section-wrapper'>
            <span
              className={`characterCard__contentContainer-section-wrapper-status-indicator characterCard__contentContainer-section-wrapper-status-indicator--${status}`}
            ></span>
            <h4 className='characterCard__contentContainer-section-wrapper-status-and-species'>
              {status} - {species}
            </h4>
          </div>
        </div>
        <Info sectionName='Last known location:' sectionData={lastKnownLocation} />
        <Info sectionName='Total episodes:' sectionData={totalEpisodes} />
      </div>
    </div>
  );
};

export default CharacterCard;
