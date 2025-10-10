import type {ComponentProps, PartData} from '@enonic/react-components';

import {Button} from '/react4xp/common/Button/Button';
import type {ButtonProps} from '/react4xp/common/Button/ButtonProps';

export const ButtonPart = ({data}: ComponentProps<PartData>) => {
  const props = data as ButtonProps

  return (
    <Button {...props} />
  );
};
