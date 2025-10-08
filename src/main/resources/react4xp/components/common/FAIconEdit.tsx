import * as React from 'react';

interface FAIconProps {
  iconType?: string;
}

export const FAIcon: React.FC<FAIconProps> = ({ iconType }) => (
  <i className={`fa ${iconType}`}></i>
);
