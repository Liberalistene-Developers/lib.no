import * as React from 'react';

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
      {shortDescription && <div dangerouslySetInnerHTML={{__html: shortDescription}} />}
      {description && <div dangerouslySetInnerHTML={{__html: description}} />}
    </div>
  );
};
