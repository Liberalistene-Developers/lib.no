import {type FC} from 'react';

import {type ImageData} from '/react4xp/common/Image/Image';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';


interface AuthorType {
  name?: string;
  url?: string;
}

interface BuyType {
  url?: string;
  store?: string;
  topic?: string;
}

interface BookCardProps {
  author?: AuthorType;
  image?: ImageData | null;
  buy?: BuyType | null;
  buyFromText?: string;
  title?: string;
  text?: string;
  url?: string;
}

export const BookCard: FC<BookCardProps> = ({
  url = '',
  image = null,
  author,
  title = '',
  text = '',
  buy = null,
  buyFromText = ''
}) => {
  const imageItem = image && (
    <img
      src={image.url}
      alt={image.alternativeText || image.displayName || title || (image.url && image.url.split('?')[0].split('/').pop()) || ''}
      className="w-[157px] h-[239px]"
    />
  );
  const buyAtStoreText = (buy && (buy.store || buy.topic)) ? `${buyFromText} ${buy.store || buy.topic}` : buyFromText;
  const imageContainer = image && ((buy && buy.url) || url)
    ? (
      <a href={(buy && buy.url) || url} title={buyAtStoreText}>
        {imageItem}
      </a>
    )
    : imageItem;

  const titleItem = <h3 className="text-primary-700 font-bold text-[24px] leading-[29px] flex-[0.3_0_0%]">{title}</h3>;
  const titleContainer = url
    ? (
      <a href={(buy && buy.url) || url}>
        {titleItem}
      </a>
    )
    : titleItem;

  return (
    <div className="flex flex-row gap-x-5 h-[239px]">
      {image && (
        <div>
          {imageContainer}
        </div>
      )}
      <div className="flex flex-col w-[201px] gap-y-[6px]">
        <div>
          {titleContainer}
        </div>

        <div className="flex-[0_0_0%] text-primary-300 font-bold text-[18px] leading-[22px]">
          {author && author.name}
        </div>

        {text && (
          <SafeHtml html={text} className="w-full flex-[0.7_0_0%] font-bold text-[14px] leading-[17px] text-ellipsis overflow-hidden text-primary-100" />
        )}

        {buy && (
          <div className="flex-[0_0_0%] [&_a]:font-bold [&_a]:text-[18px] [&_a]:leading-[22px] [&_a]:underline [&_a]:text-primary-700">
            <a href={buy.url} rel="noreferrer">{buyAtStoreText}</a>
          </div>
        )}
      </div>
    </div>
  );
};
