import {type FC} from 'react';
import cx from 'classnames';

import {Image} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Represents a member of the board
 */
interface BoardMember {
  /** Unique identifier for the board member */
  itemId?: string;
  /** Board member's image data */
  image?: {
    /** Image URL */
    url?: string;
  };
  /** Board member's role/position */
  role?: string;
  /** Board member's name */
  name?: string;
  /** Board member's email address */
  email?: string;
}

/**
 * Props for the BoardPresentation component
 */
export interface BoardPresentationProps {
  /** Array of board members to display */
  board?: BoardMember[];
  /** Title for the board members list */
  boardTitle?: string;
  /** HTML description text */
  description?: string;
  /** Size of member images - 'small', 'medium', or 'large' */
  imagesize?: string;
  /** Image style type - 'round' for circular images */
  imagetype?: string;
  /** Whether to highlight the first member - 'no', 'yes', or 'noimage' */
  memberHighlighted?: 'no' | 'yes' | 'noimage';
  /** If true, disables member highlighting */
  noHighlighting?: boolean;
  /** If true, reverses the layout order */
  reverseOrder?: boolean;
  /** Email visibility setting - 'no', 'first', or 'all' */
  showEmail?: 'no' | 'first' | 'all';
  /** Main title for the board presentation */
  title?: string;
}

/**
 * BoardPresentation component displays board members with flexible layout options.
 *
 * Provides a two-column layout with an optional highlighted member on one side
 * and a list of all members on the other. Supports various display options including
 * image styles, email visibility, and layout reversal.
 *
 * @example
 * ```tsx
 * <BoardPresentation
 *   title="Our Board"
 *   boardTitle="Board Members"
 *   board={boardMembers}
 *   memberHighlighted="yes"
 *   imagesize="medium"
 *   showEmail="first"
 * />
 * ```
 */
export const BoardPresentation: FC<BoardPresentationProps> = ({
  board = [],
  boardTitle,
  description = '',
  imagesize = 'medium',
  imagetype = '',
  memberHighlighted = 'yes',
  noHighlighting = false,
  reverseOrder = false,
  showEmail = 'no',
  title
}) => (
  <div className="flex flex-col gap-y-10 w-full justify-center items-center mobile:[&_.board-presentation-content]:flex-col mobile:[&_.board-presentation-content]:gap-y-10 mobile:[&_.board-presentation-content>*]:w-full mobile:[&_.members_.members-inner_.member-item]:text-[4.5vw] mobile:[&_.members_.members-inner_.role]:w-[45%] mobile:[&_.members_.members-inner_.name]:w-[55%]">
    <div className="text-center">
      <h2 title={title}>{title}</h2>
    </div>

    {board && board.length > 0
      ? (
        <div className={cx('w-full flex flex-row justify-center items-center', {
          '[&>*]:w-1/2': !noHighlighting, // Only apply 50% width when highlighting is enabled
          'flex-row-reverse gap-x-[10px] [&_.members]:flex-[0_0_content]': reverseOrder
        })}>
          {!noHighlighting && (
            <div className="flex justify-center mx-auto [&>.ingress]:mx-auto [&>.ingress]:p-10">
              {memberHighlighted !== 'no' && board.slice(0, 1).map(({itemId, image, role, email, name}) => (
                <div key={itemId} className="flex justify-center items-center flex-col">
                  {memberHighlighted === 'yes' && (
                    <Image image={image} className={imagesize} imageClassName={(imagetype && 'round') || ''} />
                  )}

                  <div className="font-bold text-[24px] leading-[29px] text-primary-700">
                    {name}
                  </div>
                  <div className="font-bold text-[22px] leading-[26px] text-primary-300">
                    {role}
                  </div>
                  {showEmail !== 'no' && email && (
                    <div>
                      <a href={`mailto:${email}`} rel="noreferrer">
                        {email}
                      </a>
                    </div>
                  )}
                </div>
              ))}
              {description && (
                <SafeHtml html={description} className="ingress" />
              )}
            </div>
          )}

          <div className="flex pl-[10px]">
            <div className="flex flex-col gap-y-[6px] w-full">
              <div className="font-bold text-[22px] leading-[26px] text-primary-300">
                {boardTitle}
              </div>
              {board.map(({itemId, role, name, email}) => (
                <div key={itemId} className="flex flex-col text-[18px] leading-[22px] text-primary-300 w-full">
                  <div className="flex w-full">
                    <span className="font-medium w-[40%] after:content-[':_']">{role}</span><span className="w-[60%]">{name}</span>
                  </div>
                  {showEmail === 'all' && email && (
                    <div className="member-item-email mb-5">
                      <a href={`mailto:${email}`} rel="noreferrer">
                        {email}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
      : null
    }
  </div>
);
