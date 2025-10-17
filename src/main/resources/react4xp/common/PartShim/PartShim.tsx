import type {ComponentProps} from '@enonic/react-components';
import type {FC} from 'react';

/**
 * Creates a minimalistic Part shim that extracts data from ComponentProps
 * and passes it to the actual component.
 *
 * @template TProps - The props type for the component
 * @template TComponent - The component type
 * @param Component - The React component to render
 * @returns A Part component that conforms to React4xp v6 architecture
 *
 * @example
 * ```tsx
 * import {Event} from '@common/Event/Event';
 * import {createPartShim} from '@common/PartShim/PartShim';
 *
 * export const EventPart = createPartShim(Event);
 * ```
 */
export const createPartShim = <
  TProps extends Record<string, unknown>,
  TComponent extends FC<TProps>
>(
  Component: TComponent
): FC<ComponentProps> => {
  const PartShim: FC<ComponentProps> = ({data}) => {
    const props = data as unknown as TProps;
    return Component({...props});
  };

  PartShim.displayName = `PartShim(${Component.name || 'Component'})`;

  return PartShim;
};
