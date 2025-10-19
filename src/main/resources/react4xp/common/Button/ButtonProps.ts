/**
 * Props for the Button component
 */
export interface ButtonProps extends Record<string, unknown> {
  /** Button text label */
  title?: string;
  /** Link target attribute (e.g., '_blank', '_self') */
  target?: string;
  /** URL for link button. If provided, renders an anchor element instead of button */
  url?: string;
  /** Additional CSS classes. Use 'light' class for light variant */
  className?: string;
  /** Click handler function. If provided without URL, renders a button element */
  onClick?: () => void;
}
