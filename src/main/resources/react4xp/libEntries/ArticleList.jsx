import React, { useState, useEffect } from 'react';

import doGuillotineRequest from "../../headless/guillotineRequest";
import { buildQueryArticleList, extractArticleList } from "../../headless/helpers/articleListRequests";

import Image from '../shared/Image';

import ListItem from '../shared/ArticleListItem';
import GridItem from '../shared/ArticleCard';

import Button from './Button';

let nextOffset = 0;

export const ArticleList = ({
  description,
  displaytype,
  fields,
  image,
  shortDescription,
  items,
  tags,
  title,
  showImage,
  imageType,
  imageSize,
  readMore = '',
  readMoreEnabled = false,
  loadMoreEnabled = false,
  loadMore = 'Load more',
  apiUrl = '',
  count = 10,
  sortExpression = '',
  parentPathQuery = '',
  noIngress = false,
}) => {
  const [list, setList] = useState(items);
  const [more, setMore] = useState(loadMoreEnabled && apiUrl && items.length === count);
  const [loading, setLoading] = useState(false);
  
  const Item = displaytype === 'list' ? ListItem : GridItem;
  
  useEffect(() => {
    nextOffset = list.length;
  }, [list])
  
  const updateArticles = (articles) => {
    if (articles.length > 0) {
      nextOffset += articles.length
      
      setList([
        ...list,
        ...articles,
      ]);
      
      if (articles.length < count) {
        setMore(false);
      }
    } else {
      setMore(false);
    }
    
    setLoading(false);
  };
  
  const readMoreClick = () => {
    setLoading(loading);
    
    doGuillotineRequest({
      url: apiUrl,

      query: buildQueryArticleList(),

      variables: {
        first: count,
        offset: nextOffset,
        sort: sortExpression,
        parentPathQuery,
      },

      extractDataFunc: extractArticleList,

      handleDataFunc: updateArticles,
    });
  };

  return (
    <div className="article-list-holder">
      { title && (
        <h2 title={title}>{title}</h2>
      )}

      <Image image={image} />

      { shortDescription && (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )}

      { description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}

      { list && list.length > 0 && (
        <div className={`article-list ${displaytype}`}>
          { list.map((item) => (
            <Item
              key={item.id}
              item={item}
              fields={fields}
              showImage={showImage}
              imageSize={imageSize}
              imageType={imageType}
              className="article"
              readMore={readMore}
              readMoreEnabled={readMoreEnabled}
              noIngress={noIngress}
            />
          ))}
        </div>
      )}
      { more && (
        <div className="more-button">
          <Button title={loadMore} onClick={!loading && readMoreClick} />
        </div>
      )}
    </div>
  );
};

export default (props) => <ArticleList {...props} />;