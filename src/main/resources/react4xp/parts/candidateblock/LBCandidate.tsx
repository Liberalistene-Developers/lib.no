import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';

import {Image, ImageData} from '/react4xp/common/Image/Image';


interface LBCandidateProps {
  email?: string;
  image?: ImageData;
  name?: string;
  phone?: string;
  position?: string;
}

export const LBCandidate: React.FC<LBCandidateProps> = ({
  email,
  image,
  name,
  phone,
  position
}) => {
  return (
    <div className="localbranch-candidate">
      <div className="image-holder">
        <Image image={image} imageClassName={'round'} />
      </div>

      <div className="information">
        <h3 title={name}>{name}</h3>
        <div className="position">{position}</div>
        <div>{((email || phone) && (<hr />)) || ' '}</div>
        <div className="email">{(email && (<>
          <div><FontAwesomeIcon icon={faEnvelope} /></div>
          <div><a href={`mailto:${email}`} title={email}>{email}</a></div>
        </>)) || null}&nbsp;</div>
        <div className="phone">{(phone && (
          <>
            <div><FontAwesomeIcon icon={faPhone} /></div>
            <div><a href={`tel:${phone}`} title={phone}>{phone}</a></div>
          </>
        )) || null}&nbsp;</div>
      </div>
    </div>
  );
};
