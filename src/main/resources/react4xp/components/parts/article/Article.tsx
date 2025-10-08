import * as React from 'react';

import {ImageBlock} from '../imageblock/ImageBlock';
import {AuthorLink} from '../../common/AuthorLink';

interface Author {
  authorID?: string;
  person?: string;
  personUrl?: string;
  image?: {
    url?: string;
  };
}

interface ImageType {
  url?: string;
}

interface ArticleProps {
  headerColor?: string;
  headerPosition?: string;
  title?: string;
  titleInImage?: boolean;
  image?: ImageType;
  authors?: Author[];
  ingress?: string;
  ingressInImage?: boolean;
  text?: string;
  tags?: string[] | string;
  datePublished?: string;
  description?: string;
}

export const Article: React.FC<ArticleProps> = ({
  headerColor,
  headerPosition,
  title = '',
  titleInImage = true,
  image,
  authors,
  ingress,
  ingressInImage = true,
  text,
  tags,
  datePublished,
  description = ''
}) => (
  <div className="w-full [&_figure]:m-0 [&_figure_img]:max-w-full">
    <ImageBlock
      title={(titleInImage && title && [{title, titleColor: headerColor}]) || []}
      image={image}
      ingress={(ingressInImage && ingress) || ''}
      position={headerPosition as 'left' | 'center' | 'right'}
    />

    <div className="flex items-center justify-center mt-10 mb-10 mobile:mt-5 mobile:mb-5">
      {!titleInImage && title && (
        <h1>{title}</h1>
      )}
    </div>

    <div className="flex items-center justify-between max-w-[600px] mx-auto mb-5 [&_ul.authors]:list-none [&_ul.authors]:m-0 [&_ul.authors]:p-0 [&_ul.authors_a]:flex [&_ul.authors_a]:flex-row [&_ul.authors_a]:items-center [&_ul.authors_a]:justify-center [&_ul.authors_a]:gap-x-[10px] [&_ul.authors_a_img]:w-[30px] [&_ul.authors_a_img]:-mb-[5px] [&_ul.authors_a_img]:mr-[5px]">
      {authors && authors.length > 0 && (
        <ul className="authors">
          {authors.map(({authorID, person, personUrl, image}) => (
            <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
          ))}
        </ul>
      )}
      <div className="h-full self-center ml-auto flex items-center">
        {datePublished}
      </div>
    </div>

    <div className="page-content">
      {!ingressInImage && ingress && (
        <div className="font-bold rich-text" dangerouslySetInnerHTML={{__html: ingress}} />
      )}

      {text && (
        <div dangerouslySetInnerHTML={{__html: text}} />
      )}
    </div>
  </div>
);
