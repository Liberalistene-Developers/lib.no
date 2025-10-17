import * as React from 'react';

import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';

interface OrganizationalPositionProps {
  title?: string;
  description?: string;
  shortDescription?: string;
  tags?: string[];
}

export const OrganizationalPosition: React.FC<OrganizationalPositionProps> = ({
  title = '',
  description = '',
  shortDescription = ''
}) => {
  return (
    <div>
      <h1 title={title}>{title}</h1>
      {shortDescription && <SafeHtml html={shortDescription} />}
      {description && <SafeHtml html={description} />}
    </div>
  );
};
