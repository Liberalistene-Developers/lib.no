import * as React from 'react';
import { useState, useEffect } from 'react';

import doGuillotineRequest from '/headless/guillotineRequest';

import {Button} from '../Button/Button';

export interface DynamicLoaderItem {
  id?: string;
  [key: string]: unknown;
}

interface DynamicLoaderProps {
  apiUrl?: string;
  buildQueryList?: () => string;
  children?: (args: { items: DynamicLoaderItem[]; children: React.ReactNode }) => React.ReactNode;
  count?: number;
  extractList?: (data: unknown) => DynamicLoaderItem[];
  items?: DynamicLoaderItem[];
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
  const [list, setList] = useState<DynamicLoaderItem[]>(items);
  const [more, setMore] = useState(loadMoreEnabled && !!apiUrl && items.length === count);
  const [loading, setLoading] = useState(false);
  const [nextOffset, setNextOffset] = useState(items.length);

  useEffect(() => {
    setNextOffset(list.length);
  }, [list]);

  const updateItems = (data: DynamicLoaderItem[]): void => {
    if (data.length > 0) {
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
