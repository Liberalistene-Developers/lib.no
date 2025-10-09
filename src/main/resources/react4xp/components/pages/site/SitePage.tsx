import { BaseComponent } from '@enonic/react-components';

export const SitePage = (props) => {

  console.info('So far so good - SitePage rendering');

  return (
    <BaseComponent
      {...props.page}
    />
  );
};
