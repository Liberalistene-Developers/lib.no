
import { Topic } from '../../main/resources/react4xp/libEntries/Schedule'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/Event/Topic',

  component: Topic
}

const Template = (args) => (
  <SingleLayout>
    <div className="schedule-list">
      <div className="schedule">
        <div className="topic-list">
          <Topic {...args} />
        </div>
      </div>
    </div>
  </SingleLayout>
)

export const Default = Template.bind({})
Default.args = {
  topic: {
    title: 'Registration',
    start: '',
    duration: '',
    description: '',
    report: ''
  }
}

export const WithStart = Template.bind({})
WithStart.args = {
  topic: {
    ...Default.args.topic,
    start: '09:00'
  }
}

export const WithDuration = Template.bind({})
WithDuration.args = {
  topic: {
    ...WithStart.args.topic,
    duration: '30 min'
  }
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  topic: {
    ...WithStart.args.topic,
    description: 'Registrering vil være åpen frem til klokken 11:00.'
  }
}

export const WithReport = Template.bind({})
WithReport.args = {
  topic: {
    ...WithDescription.args.topic,
    report: '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
  }
}
