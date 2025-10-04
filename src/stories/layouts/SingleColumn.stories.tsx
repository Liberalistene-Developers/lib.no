import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SingleColumnWrapper } from './LayoutWrappers';
import { Button } from '../../main/resources/react4xp/components/parts/button/Button';
import { TextBlock } from '../../main/resources/react4xp/components/parts/textblock/TextBlock';

const meta = {
  title: 'Layouts/SingleColumn',
  component: SingleColumnWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof SingleColumnWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithButton: Story = {
  args: {
    background: 'standard',
    fullWidth: false
  },
  render: (args) => (
    <SingleColumnWrapper {...args}>
      <Button title="Bli medlem" url="https://liberalistene.org" className="light" />
    </SingleColumnWrapper>
  )
};

export const WithMultipleComponents: Story = {
  args: {
    background: 'standard',
    fullWidth: false
  },
  render: (args) => (
    <SingleColumnWrapper {...args}>
      <TextBlock
        title="Velkommen til Liberalistene"
        text="<p>Vi kjemper for individuell frihet og ansvar.</p>"
        centered={true}
      />
      <Button title="Les mer" url="https://liberalistene.org" className="dark" />
    </SingleColumnWrapper>
  )
};
