import type { MenuTree } from '/lib/menu';

import { Menu } from "/react4xp/common/Menu/Menu";

interface HeaderProps {
  image?: {
    url?: string;
  };
  title?: string;
  menu?: MenuTree;
}

export const Header = ({image, title, menu }: HeaderProps) => (
    <header className="bg-background-700 flex min-h-[60px] items-center justify-between">
      {image && (
        <a href="/" title="Hjem" className="mr-5">
          <img
            alt={title || 'Liberalistene Logo'}
            src={image.url}
          />
        </a>
      )}
      <Menu menu={menu} />
    </header>
);
