import * as React from 'react';
import type { FAIconProps } from './FAIcon';

export const FAIconEdit: React.FC<FAIconProps> = ({ iconType }) => (
  <i className={`fa ${iconType}`}></i>
);
