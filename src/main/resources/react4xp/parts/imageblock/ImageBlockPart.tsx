import * as React from 'react';
import type {ComponentProps} from '@enonic/react-components';

import {ImageBlock} from '/react4xp/common/ImageBlock/ImageBlock';

export const ImageBlockPart = ({data}: ComponentProps) => {
  return <ImageBlock {...data} />;
};
