import * as React from 'react';

interface TextBlockProps {
  text?: string;
  title?: string;
  titleColor?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  text = '',
  title = '',
  titleColor = ''
}) => (
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
            <div className="page-content rich-text" dangerouslySetInnerHTML={{__html: text}} />
          </div>
        )}
      </div>
    )}
  </>
);
