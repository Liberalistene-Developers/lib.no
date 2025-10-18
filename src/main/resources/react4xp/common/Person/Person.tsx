import {type FC} from 'react';

import {Image} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import type {ImageData} from '@common/types';

/**
 * Props for the Person component
 */
interface PersonProps {
  /** Person's name (displayed as H1) */
  title?: string;
  /** Person's profile image data */
  image?: ImageData;
  /** Full description/biography (HTML) */
  description?: string;
  /** Brief introduction (HTML) */
  shortDescription?: string;
  /** Person's email address */
  email?: string;
  /** Text to prefix before the person's name in email link */
  emailPrefix?: string;
}

/**
 * Person component displays detailed information about a person.
 *
 * Shows the person's name, profile image, introduction, full description,
 * and an optional email contact link. The email link can be customized with
 * a prefix (e.g., "Contact" or "Email").
 *
 * @example
 * ```tsx
 * <Person
 *   title="John Doe"
 *   image={{url: '/images/john.jpg', alternativeText: 'John Doe'}}
 *   shortDescription="<p>Introduction to John...</p>"
 *   description="<p>Full biography...</p>"
 *   email="john@example.com"
 *   emailPrefix="Contact"
 * />
 * ```
 */
export const Person: FC<PersonProps> = ({
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
