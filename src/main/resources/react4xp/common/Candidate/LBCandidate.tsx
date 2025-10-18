import {type FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';

import {Image, ImageData} from '@common/Image/Image';

/**
 * Props for the LBCandidate component (Local Branch Candidate)
 */
interface LBCandidateProps {
  /** Candidate's email address */
  email?: string;
  /** Candidate's profile image data */
  image?: ImageData;
  /** Candidate's name */
  name?: string;
  /** Candidate's phone number */
  phone?: string;
  /** Candidate's position/role */
  position?: string;
}

/**
 * LBCandidate component displays a local branch candidate's contact information.
 *
 * Shows a candidate card with their profile image, name, position, and contact
 * details (email and phone) with clickable links. Used in local branch listings
 * to present candidate information in a consistent format.
 *
 * @example
 * ```tsx
 * <LBCandidate
 *   name="Jane Smith"
 *   position="Local Branch Leader"
 *   image={{url: '/candidates/jane.jpg', alternativeText: 'Jane Smith'}}
 *   email="jane@example.com"
 *   phone="+47 123 45 678"
 * />
 * ```
 */
export const LBCandidate: FC<LBCandidateProps> = ({
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
