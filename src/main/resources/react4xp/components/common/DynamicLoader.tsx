import * as React from 'react';
import { useState, useEffect } from 'react';

import doGuillotineRequest from '../../../headless/guillotineRequest';

import {Button} from '../parts/button/Button';

let nextOffset = 0;

export interface ListItem {
  id?: string;
  [key: string]: unknown;
}

interface DynamicLoaderProps {
  apiUrl?: string;
  buildQueryList?: () => string;
  children?: (args: { items: ListItem[]; children: React.ReactNode }) => React.ReactNode;
  count?: number;
  extractList?: (data: unknown) => ListItem[];
  items?: ListItem[];
  loadMoreEnabled?: boolean;
  loadMore?: string;
  parentPathQuery?: string;
  sortExpression?: string;
}

export const DynamicLoader: React.FC<DynamicLoaderProps> = ({
  apiUrl = '',
  buildQueryList,
  children,
  count = 10,
  extractList,
  items = [],
  loadMoreEnabled = false,
  loadMore = 'Load more',
  parentPathQuery = '',
  sortExpression = ''
}) => {
  const [list, setList] = useState<ListItem[]>(items);
  const [more, setMore] = useState(loadMoreEnabled && !!apiUrl && items.length === count);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nextOffset = list.length;
  }, [list]);

  const updateItems = (data: ListItem[]): void => {
    if (data.length > 0) {
      nextOffset += data.length;

      setList([
        ...list,
        ...data
      ]);

      if (data.length < count) {
        setMore(false);
      }
    } else {
      setMore(false);
    }

    setLoading(false);
  };

  const readMoreClick = (): void => {
    setLoading(true);

    if (!buildQueryList || !extractList) {
      return;
    }

    doGuillotineRequest({
      url: apiUrl,
      query: buildQueryList(),
      variables: {
        first: count,
        offset: nextOffset,
        sort: sortExpression,
        parentPathQuery
      },
      extractDataFunc: extractList,
      handleDataFunc: updateItems
    });
  };

  const button = more && (
    <div className="more-button">
      <Button title={loadMore} onClick={!loading ? readMoreClick : undefined} />
    </div>
  );

  if (!children) {
    return null;
  }

  return (
    <>
      {children({ items: list, children: button })}
    </>
  );
};
