import {type FC} from 'react';

import {SafeHtml} from '@common/SafeHtml/SafeHtml';

export interface TextBlockProps {
  text?: string;
  title?: string;
  titleColor?: string;
}

export const TextBlock: FC<TextBlockProps> = ({
  text = '',
  title = '',
  titleColor = ''
}) => {
  return (
    <>
      {(title || text) && (
        <div className="flex flex-col justify-center items-center gap-y-5">
          {title && (
            <div className={`flex flex-col justify-center items-center ${titleColor}`}>
              <h2 className="font-bold text-[50px] leading-[60px]">{title}</h2>
            </div>
          )}
          {text && (
            <div>
              <SafeHtml html={text} className="page-content" />
            </div>
          )}
        </div>
      )}
    </>
  );
};
