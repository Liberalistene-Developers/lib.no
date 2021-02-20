import React from 'react';

import { ListItem } from './ListItem';
import { AuthorLink } from './AuthorLink';

const ArticleListItem = ({
  className,
  showImage,
  imageSize,
  imageType,
  item,
  item: {
    authors = [],
    datePublished,
  } = {},
  fields,
}) => (
  <ListItem className={className} imageSize={imageSize} imageType={imageType} showImage={showImage} item={item} childrenLast={true}>
    <div className="article-creds">
      { authors && authors.length > 0 && (
        <ul className="authors">
          { authors.slice(0, 1).map(({ authorID, person, personUrl, image }) => (
            <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
          ))}
        </ul>
      )}
      { datePublished && (
        <div className="article-date">
          {datePublished}
        </div>        
      )}
    </div>
  </ListItem>
);

export default ArticleListItem;

export {
  ArticleListItem,
};
