import * as React from 'react';
import type {ComponentProps} from '@enonic/react-components';

interface OrganizationalPositionData {
  title?: string;
  description?: string;
  shortDescription?: string;
  tags?: string[];
}

export const OrganizationalPositionPart = ({data}: ComponentProps) => {
  const {
    title = '',
    description = '',
    shortDescription = ''
  } = data as OrganizationalPositionData;

  return (
    <div>
      <h1 title={title}>{title}</h1>
      {shortDescription && <div dangerouslySetInnerHTML={{__html: shortDescription}} />}
      {description && <div dangerouslySetInnerHTML={{__html: description}} />}
    </div>
  );
};
