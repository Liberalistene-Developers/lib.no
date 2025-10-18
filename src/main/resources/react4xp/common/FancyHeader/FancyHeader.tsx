import {type FC} from 'react';

import {Image, type ImageData} from '@common/Image/Image';

/**
 * Props for the FancyHeader component
 */
interface FancyHeaderProps {
  /** Header title text */
  title?: string;
  /** Decorative effect image (shown floating on desktop) */
  effect?: ImageData | null;
  /** Main header image */
  image?: ImageData | null;
}

/**
 * FancyHeader component displays a stylized page header with title and images.
 *
 * Creates a two-column layout with a prominently styled title on the left
 * (with optional decorative effect image) and a main image on the right.
 * The title has a purple background with shadow effects. On mobile, the
 * layout switches to a single column with the image first.
 *
 * @example
 * ```tsx
 * <FancyHeader
 *   title="Welcome to Our Party"
 *   effect={{url: '/images/effect.png', alternativeText: 'Decoration'}}
 *   image={{url: '/images/header.jpg', alternativeText: 'Header'}}
 * />
 * ```
 */
export const FancyHeader: FC<FancyHeaderProps> = ({
  title = '',
  effect = null,
  image = null
}) => (
  <div className="grid grid-cols-[30%_70%] justify-evenly w-full mobile:grid-cols-1 [&_.org-header-grid-item_img]:object-cover [&_.org-header-grid-item_img]:w-full [&_.org-header-grid-item_img]:h-full">
    <div>
      <div className="relative flow-root top-1/2 -translate-y-1/2 max-[834px]:[&_img]:mt-[5%] max-[834px]:[&_img]:mr-[5%]">
        <div className="relative block float-left bg-primary-700 shadow-[1px_1px_20px_0_rgba(74,16,74,0.47)] max-[834px]:p-[1vw_15px] mobile:float-none mobile:bg-transparent mobile:shadow-none mobile:text-center">
          <h1 className="mt-0 mb-0 p-[15px_70px] bg-transparent text-button-100 leading-[1.2] text-[5vw] font-black mobile:text-[9vw] mobile:p-0 mobile:text-primary-700">{title}</h1>
        </div>
        {effect && (
          <Image image={effect} className="relative w-[30%] float-right mt-5 mr-5 mobile:hidden" />
        )}
      </div>
    </div>
    {image && (
      <div className="mobile:order-[-1]">
        <Image image={image} />
      </div>
    )}
  </div>
);
