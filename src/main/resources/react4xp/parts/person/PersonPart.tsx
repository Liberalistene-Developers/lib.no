import { FC } from 'react';

import { Image } from '/react4xp/common/Image/Image';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';
import type { ImageData } from '/react4xp/common/types';

interface PersonProps {
  title?: string;
  image?: ImageData;
  description?: string;
  shortDescription?: string;
  email?: string;
  emailPrefix?: string;
}

export const PersonPart: FC<PersonProps> = ({
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
      <SafeHtml html={shortDescription} className="ingress" />
    )}

    {description && (
      <SafeHtml html={description} className="description" as="div" />
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
