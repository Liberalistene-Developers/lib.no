import {type FC} from 'react';

interface MenuItemProps {
  title?: string;
  url?: string;
  onClick?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
  title = '',
  url,
  onClick
}) => (
  <a
    href={url}
    className="flex items-center justify-center bg-primary-700 border border-background-700 text-button-100 text-[25px] font-medium h-[66px] w-[278px] leading-[30px] skew-x-[20deg]"
    role="button"
    onClick={onClick}
  >
    <span className="-skew-x-[20deg] z-10">{title}</span>
  </a>
);
