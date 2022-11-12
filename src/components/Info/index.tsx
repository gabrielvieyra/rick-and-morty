import { FC } from 'react';

// Styles
import './styles.scss';

interface InfoProps {
  sectionName: string;
  sectionData: string | number;
}

const Info: FC<InfoProps> = ({ sectionName, sectionData }) => {
  return (
    <div className='info'>
      <h4 className='info__location'>{sectionName}</h4>
      <h3 className='info__location-name'>{sectionData}</h3>
    </div>
  );
};

export default Info;
