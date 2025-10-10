export interface ButtonProps extends Record<string, unknown> {
  title?: string;
  target?: string;
  url?: string;
  className?: string;
  onClick?: () => void;
}
