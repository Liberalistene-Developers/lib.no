import * as React from 'react';
import type {ComponentProps} from '@enonic/react-components';

import {TextBlock} from '/react4xp/common/TextBlock/TextBlock';

export const TextBlockPart = ({data}: ComponentProps) => {
  return (
    <TextBlock {...data} />
  );
};
