
import { Group } from '../../main/resources/react4xp/libEntries/Group'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Group',
  component: Group
}

const image = {
  url: 'imageblockimage.png'
}

const Template = (args) => (
  <SingleLayout fullWidth="true">
    <Group {...args} />
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  headerColor: 'light',
  headerPosition: 'right',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.',
  image,
  title: 'GroupName',
  titleInImage: true,
  location: {
    address: 'Markensgate 39, Kristiansand'
  },
  informationLabel: 'Informasjon'
}
