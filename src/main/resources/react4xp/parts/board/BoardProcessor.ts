import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {mapBoard} from '/react4xp/utils/board';

/**
 * Board part configuration from board.xml schema.
 */
interface BoardConfig {
  /** Content ID of the board to display */
  board?: string;
  /** Image size specification (e.g., 'small', 'medium', 'large') */
  imagesize?: string;
  /** Whether to use round image type */
  imagetype?: boolean;
  /** Email display mode: 'yes', 'no', or 'link' */
  showemail?: string;
  /** Whether to show member descriptions */
  showDescriptions?: boolean;
}

/**
 * Board content data structure.
 */
interface BoardData {
  /** Board member content ID(s) - single ID or array of IDs */
  member?: string | string[];
}

/**
 * Processes board content and configuration for the Board component.
 *
 * Fetches board member data from a selected board content item and transforms
 * it into props for displaying an organizational board with member profiles.
 *
 * **Data Flow:**
 * 1. Extracts board configuration from part component
 * 2. Fetches board content using the board content ID
 * 3. Retrieves member IDs from board data
 * 4. Maps each member ID to full member data via mapBoard utility
 * 5. Returns Board props with members and display settings
 *
 * @param component - The board part component from Enonic XP
 * @returns Board props including members array and display configuration
 *
 * @example
 * ```ts
 * // Configuration
 * {
 *   board: "board-123",
 *   imagesize: "medium",
 *   imagetype: true,
 *   showemail: "link",
 *   showDescriptions: true
 * }
 * // Returns: { board: [mapped members], imagesize: "medium", imagetype: true, ... }
 * ```
 *
 * @remarks
 * - Member IDs are normalized to an array (handles both single ID and array)
 * - Empty board returns empty members array
 * - showemail defaults to 'no' if not specified
 * - mapBoard utility fetches full member data including name, role, image, email, etc.
 */
export const boardProcessor: ComponentProcessor<'lib.no:board'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BoardConfig;


  const boardContent = config?.board ? getContent({key: config.board}) : null;
  const boardData = boardContent?.data as BoardData;
  const members = boardData?.member ? [].concat(boardData.member) : [];

  return {
    imagesize: config?.imagesize || '',
    imagetype: !!config?.imagetype,
    board: members.map(mapBoard),
    showemail: config?.showemail || 'no',
    showDescriptions: config?.showDescriptions
  };
};
