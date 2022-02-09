
import PropTypes from 'prop-types'

import { ArticleCard } from '../../main/resources/react4xp/shared/ArticleCard'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Cards/ArticleCard',
  component: ArticleCard
}

const image = {
  url: 'partyleader.jpg'
}

const Template = ({ fullWidth = false, ...args }) => (
  <SingleLayout fullWidth={fullWidth}>
    <div className="article-list-holder">
      <div className="article-list gridlist">
        <ArticleCard {...args} />
      </div>
    </div>
  </SingleLayout>
)

Template.propTypes = {
  ...ArticleCard.propTypes,
  fullWidth: PropTypes.bool
}

export const Normal = Template.bind({})
Normal.args = {
  item: {
    image: {
      url: 'cardimage.png'
    },
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus',
    name: 'Lorem ipsum dolor sit amet',
    url: '#',
    authors: [
      {
        authorID: 1,
        personUrl: '#',
        person: 'Ronny Skjæveland',
        image
      }
    ],
    datePublished: '2020-12-10'
  }
}

export const Full = Template.bind({})
Full.args = {
  ...Normal.args,
  fullWidth: true
}

export const WideLeft = Template.bind({})
WideLeft.args = {
  ...Normal.args,
  presentation: true,
  direction: 'left'
}

export const WideLeftNoDate = Template.bind({})
WideLeftNoDate.args = {
  ...WideLeft.args,
  showDate: false
}

export const WideRight = Template.bind({})
WideRight.args = {
  ...WideLeft.args,
  direction: 'right'
}

export const WideRightNoDate = Template.bind({})
WideRightNoDate.args = {
  ...WideRight.args,
  showDate: false
}
