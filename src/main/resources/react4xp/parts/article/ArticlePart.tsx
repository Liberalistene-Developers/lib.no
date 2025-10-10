import * as React from 'react';
import type {ComponentProps} from '@enonic/react-components';

import {Article} from '/react4xp/common/Article/Article';

export const ArticlePart = ({data}: ComponentProps) => {
  return <Article {...data} />;
};
