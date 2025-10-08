import * as React from 'react';
import {Image} from '../../common/Image';

interface PersonImage {
  url: string;
}

interface PersonProps {
  title?: string;
  image?: PersonImage;
  description?: string;
  shortDescription?: string;
  email?: string;
  emailPrefix?: string;
  tags?: string[];
}

export const Person: React.FC<PersonProps> = ({
  title,
  image,
  description,
  shortDescription,
  email,
  emailPrefix,
  tags
}) => (
  <div className="mt-10">
    <h1 title={title}>{title}</h1>

    <Image image={image} />

    {shortDescription && (
      <div className="ingress rich-text" dangerouslySetInnerHTML={{__html: shortDescription}} />
    )}

    {description && (
      <div className="description" dangerouslySetInnerHTML={{__html: description}} />
    )}

    {email && (
      <div className="mt-[30px]">
        <a className="email" href={`mailto:${email}`}>
          {emailPrefix ? [emailPrefix, title].join(' ') : title}
        </a>
      </div>
    )}
  </div>
);
