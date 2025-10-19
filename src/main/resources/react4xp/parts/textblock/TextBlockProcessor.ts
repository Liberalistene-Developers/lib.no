import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {processHtml} from '/react4xp/utils/html';

/**
 * Text block part configuration from textblock.xml schema.
 */
interface TextBlockConfig {
  /** Text block title */
  title?: string;
  /** Color for the title text */
  titleColor?: string;
  /** Main text content (HTML) */
  text?: string;
}

/**
 * Processes text block configuration for the TextBlock component.
 *
 * A simple processor that extracts title, title color, and HTML text content
 * from the part configuration. The text is processed for safe HTML rendering.
 *
 * Used for displaying formatted text sections with optional colored titles.
 *
 * **Data Flow:**
 * 1. Extracts text block configuration from part component
 * 2. Retrieves title, title color, and text fields
 * 3. Processes HTML text content via processHtml for safe rendering
 * 4. Returns TextBlock props with all fields
 *
 * @param component - The textblock part component from Enonic XP
 * @returns TextBlock props including title, titleColor, and processed text
 *
 * @example
 * ```ts
 * // Configuration
 * {
 *   title: "About Our Mission",
 *   titleColor: "primary-700",
 *   text: "<p>We believe in individual liberty and free markets...</p>"
 * }
 *
 * // Returns:
 * {
 *   title: "About Our Mission",
 *   titleColor: "primary-700",
 *   text: "<p>We believe in individual liberty and free markets...</p>"
 * }
 * ```
 *
 * @remarks
 * - All fields default to empty string if not provided
 * - Text content is processed via processHtml for safe rendering
 * - Title color can be any valid Tailwind color class
 * - Simple pass-through processor with minimal transformation
 */
export const textBlockProcessor: ComponentProcessor<'lib.no:textblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as TextBlockConfig;


  return {
    title: config?.title || '',
    titleColor: config?.titleColor || '',
    text: processHtml(config?.text || '')
  };
};
