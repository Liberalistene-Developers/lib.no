import {type FC} from 'react';

import {ImageBlock} from '/react4xp/common/ImageBlock/ImageBlock';
import {AuthorLink} from '/react4xp/common/AuthorLink/AuthorLink';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';
import type {ImageData} from '/react4xp/common/types';

interface Author {
  authorID?: string;
  person?: string;
  personUrl?: string;
  image?: {
    url?: string;
  };
}

interface ArticleProps {
  headerColor?: string;
  headerPosition?: string;
  title?: string;
  titleInImage?: boolean;
  image?: ImageData;
  authors?: Author[];
  ingress?: string;
  ingressInImage?: boolean;
  text?: string;
  tags?: string[] | string;
  datePublished?: string;
  description?: string;
}

export const Article: FC<ArticleProps> = ({
  headerColor,
  headerPosition,
  title = '',
  titleInImage = true,
  image,
  authors,
  ingress,
  ingressInImage = true,
  text,
  datePublished
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
        <SafeHtml html={ingress} className="font-bold" />
      )}

      {text && (
        <SafeHtml html={text} />
      )}
    </div>
  </div>
);
