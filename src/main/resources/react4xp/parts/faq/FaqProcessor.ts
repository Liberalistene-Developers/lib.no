import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {processHtml} from '/react4xp/utils/html';

/**
 * Configuration for the Faq part.
 */
interface FaqConfig {
  /** Whether the FAQ should be expandable/collapsible */
  expandable?: boolean;
  /** Whether the FAQ should be initially expanded */
  expanded?: boolean;
}

/**
 * Content data for FAQ content type.
 */
interface FaqData {
  /** The answer text (HTML content) */
  answer?: string;
  /** Comma-separated tags for categorization */
  tags?: string;
}

/**
 * Processor for the Faq part component.
 *
 * Transforms FAQ content into props for the Faq React component.
 * Uses the content's displayName as the question text and processes the answer HTML
 * for safe rendering. Supports expandable/collapsible mode with initial state control.
 *
 * @param component - The part component containing configuration
 * @param content - The FAQ content item
 * @returns Props object with processed FAQ data
 *
 * @example
 * ```typescript
 * // Returns:
 * {
 *   expandable: true,
 *   expanded: false,
 *   question: 'What is Liberalistene?',
 *   answer: '<p>Liberalistene is a Norwegian political party...</p>',
 *   tags: 'politics,norway,liberalism'
 * }
 * ```
 */
export const faqProcessor: ComponentProcessor<'lib.no:faq'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as FaqConfig;


  const data = content.data as FaqData;

  return {
    expandable: config?.expandable,
    expanded: config?.expanded,
    question: content.displayName,
    answer: processHtml(data.answer || ''),
    tags: data.tags
  };
};
