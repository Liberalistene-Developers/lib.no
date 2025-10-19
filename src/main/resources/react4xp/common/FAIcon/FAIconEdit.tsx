import {type FC} from 'react';
import type { FAIconProps } from './FAIcon';

export const FAIconEdit: FC<FAIconProps> = ({ iconType }) => (
  <i className={`fa ${iconType}`}></i>
);
