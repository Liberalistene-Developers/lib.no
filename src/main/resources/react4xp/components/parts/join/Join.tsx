import * as React from 'react';
import cx from 'classnames';

import {Button} from '../button/Button';
import {Image} from '../../common/Image';

interface ImageType {
  url?: string;
}

interface JoinProps {
  message?: string;
  backMessage?: string;
  image?: ImageType | null;
  url?: string;
  buttonText?: string;
  className?: string;
  frontPlacement?: string;
}

export const Join: React.FC<JoinProps> = ({
  message,
  backMessage,
  image = null,
  url,
  buttonText,
  className,
  frontPlacement
}) => (
  <div className="relative h-[300px] w-full my-[60px]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[600px] max-w-full h-[300px] mobile:w-full group">
      <div className="w-full h-full overflow-hidden [backface-visibility:hidden] absolute transition-transform duration-[600ms] linear rounded-[3px] [transform:perspective(600px)_rotateX(0deg)] group-hover:[transform:perspective(600px)_rotateX(180deg)] text-white">
        <div className={cx(
          'bg-primary-700 h-full w-full flex justify-center items-center',
          frontPlacement === 'row' && 'flex-row gap-x-10',
          frontPlacement === 'column' && 'flex-col gap-y-5'
        )}>
          {image && (
            <div className={cx(
              'flex items-center justify-center',
              frontPlacement === 'row' && 'h-full max-w-[50%]',
              frontPlacement === 'column' && 'mt-5 h-[70%]'
            )}>
              <Image
                image={image}
                imageClassName={cx(
                  frontPlacement === 'row' && 'h-[calc(100%-50px)]',
                  frontPlacement === 'column' && 'h-full'
                )}
              />
            </div>
          )}
          {message && (
            <div
              className={cx(
                'flex items-center',
                frontPlacement === 'row' && 'h-full justify-center max-w-[50%]',
                frontPlacement === 'column' && image ? 'items-start h-1/3 -mt-5' : 'h-full'
              )}
              dangerouslySetInnerHTML={{__html: message}}
            />
          )}
        </div>
      </div>
      <div className="bg-primary-700 w-full h-full overflow-hidden [backface-visibility:hidden] absolute transition-transform duration-[600ms] linear rounded-[3px] [transform:perspective(600px)_rotateX(-180deg)] group-hover:[transform:perspective(600px)_rotateX(0deg)]">
        <div className="text-[#2c3e50] text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {backMessage && (
            <div className="text-button-100" dangerouslySetInnerHTML={{__html: backMessage}} />
          )}
          <Button
            className="light"
            title={buttonText}
            url={url}
          />
        </div>
      </div>
    </div>
  </div>
);
