import * as React from 'react';
import {Image} from '/react4xp/common/Image/Image';

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
}

export const PersonPart: React.FC<PersonProps> = ({
  title,
  image,
  description,
  shortDescription,
  email,
  emailPrefix
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
