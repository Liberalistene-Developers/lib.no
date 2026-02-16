import preview from '../../../.storybook/preview'
import { SingleColumnWrapper } from './LayoutWrappers'
import { Button } from '@common/Button/Button'
import { TextBlock } from '@common/TextBlock/TextBlock'

const meta = preview.meta({
  title: 'Layouts/SingleColumn',
  component: SingleColumnWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
})

export const WithButton = meta.story({
  args: {
    background: 'standard',
    fullWidth: false
  },
  render: (args) => (
    <SingleColumnWrapper {...args}>
      <Button
        title="Bli medlem"
        url="https://liberalistene.org"
        className="light"
      />
    </SingleColumnWrapper>
  )
})

export const WithMultipleComponents = meta.story({
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
      <Button
        title="Les mer"
        url="https://liberalistene.org"
        className="dark"
      />
    </SingleColumnWrapper>
  )
})
