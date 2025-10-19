import * as React from 'react';
import cx from 'classnames';

interface BaseLayoutProps {
  background?: 'standard' | 'white' | 'purple' | 'yellow';
  fullWidth?: boolean;
  paddingBottom?: boolean;
  paddingTop?: boolean;
  children?: React.ReactNode;
}

interface TwoColumnProps extends BaseLayoutProps {
  leftClassName?: string;
  rightClassName?: string;
}

export const TwoColumnWrapper: React.FC<TwoColumnProps> = ({
  background = 'standard',
  fullWidth = false,
  paddingBottom = false,
  paddingTop = false,
  leftClassName = 'one',
  rightClassName = 'one',
  children
}) => {
  const [first, second] = React.Children.toArray(children);

  return (
    <main>
      <div className={cx('content-holder', background, {
        'padding-bottom': paddingBottom,
        'padding-top': paddingTop
      })}>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className="content-item items">
            <div className={`content-child left ${leftClassName}`}>
              {first}
            </div>
            <div className={`content-child right ${rightClassName}`}>
              {second}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

interface ThreeColumnProps extends BaseLayoutProps {
  leftClassName?: string;
  middleClassName?: string;
  rightClassName?: string;
}

export const ThreeColumnWrapper: React.FC<ThreeColumnProps> = ({
  background = 'standard',
  fullWidth = false,
  paddingBottom = false,
  paddingTop = false,
  leftClassName = 'one-33',
  middleClassName = 'one-33',
  rightClassName = 'one-33',
  children
}) => {
  const [first, second, third] = React.Children.toArray(children);

  return (
    <main>
      <div className={cx('content-holder', background, {
        'padding-bottom': paddingBottom,
        'padding-top': paddingTop
      })}>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className="content-item items">
            <div className={`content-child left ${leftClassName}`}>
              {first}
            </div>
            <div className={`content-child middle ${middleClassName}`}>
              {second}
            </div>
            <div className={`content-child right ${rightClassName}`}>
              {third}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

interface FourColumnProps extends BaseLayoutProps {
  leftClassName?: string;
  middleLeftClassName?: string;
  middleRightClassName?: string;
  rightClassName?: string;
}

export const FourColumnWrapper: React.FC<FourColumnProps> = ({
  background = 'standard',
  fullWidth = false,
  paddingBottom = false,
  paddingTop = false,
  leftClassName = 'one-25',
  middleLeftClassName = 'one-25',
  middleRightClassName = 'one-25',
  rightClassName = 'one-25',
  children
}) => {
  const [first, second, third, fourth] = React.Children.toArray(children);

  return (
    <main>
      <div className={cx('content-holder', background, {
        'padding-bottom': paddingBottom,
        'padding-top': paddingTop
      })}>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className="content-item items">
            <div className={`content-child left ${leftClassName}`}>
              {first}
            </div>
            {second && (
              <div className={`content-child middle ${middleLeftClassName}`}>
                {second}
              </div>
            )}
            {third && (
              <div className={`content-child middle ${middleRightClassName}`}>
                {third}
              </div>
            )}
            {fourth && (
              <div className={`content-child right ${rightClassName}`}>
                {fourth}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

interface TwoColumn2RowProps extends TwoColumnProps {
  order?: '' | 'reverse';
}

export const TwoColumn2RowWrapper: React.FC<TwoColumn2RowProps> = ({
  background = 'standard',
  fullWidth = false,
  paddingBottom = false,
  paddingTop = false,
  leftClassName = 'one-20',
  rightClassName = 'four',
  order = '',
  children
}) => {
  const [first, second, third] = React.Children.toArray(children);

  return (
    <main>
      <div className={cx('content-holder', background, {
        'padding-bottom': paddingBottom,
        'padding-top': paddingTop
      })}>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className={`content-item items ${order}`}>
            <div className="content-child full">
              {first}
            </div>
            <div className="content-child full items">
              <div className={`content-child left ${leftClassName}`}>
                {second}
              </div>
              <div className={`content-child right ${rightClassName}`}>
                {third}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const SingleColumnWrapper: React.FC<BaseLayoutProps> = ({
  background = 'standard',
  fullWidth = false,
  paddingBottom = false,
  paddingTop = false,
  children
}) => {
  return (
    <main>
      <div className={cx('content-holder', background, {
        'padding-bottom': paddingBottom,
        'padding-top': paddingTop
      })}>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className="content-item">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
