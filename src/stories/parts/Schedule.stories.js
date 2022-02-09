
import { Schedule } from '../../main/resources/react4xp/libEntries/Schedule'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/Event/Schedule',

  component: Schedule
}

const Template = (args) => (
  <SingleLayout>
    <div className="schedule-list">
      <Schedule {...args} />
    </div>
  </SingleLayout>
)

const createTopics = (items = []) => items.map((item) => ({
  title: '',
  start: '',
  duration: '',
  description: '',
  report: '',
  ...item
}))

export const Empty = Template.bind({})
Empty.args = {
  schedule: {
    name: '',
    date: '',
    topics: []
  }
}

export const noNameDefault = Template.bind({})
noNameDefault.args = {
  schedule: {
    name: '',
    date: '',
    topics: createTopics([{ title: 'Registration' }])
  }
}

export const noNameWithStart = Template.bind({})
noNameWithStart.args = {
  schedule: {
    name: '',
    date: '',
    topics: createTopics([{ title: 'Registration', start: '09:00' }])
  }
}

export const noNameWithDuration = Template.bind({})
noNameWithDuration.args = {
  schedule: {
    name: '',
    date: '',
    topics: createTopics([{ title: 'Registration', start: '09:00', duration: '30 min' }])
  }
}

export const noNameWithStartAndDescription = Template.bind({})
noNameWithStartAndDescription.args = {
  schedule: {
    name: '',
    date: '',
    topics: createTopics([
      {
        title: 'Registration',
        start: '09:00',
        description: 'Registrering vil være åpen frem til klokken 11:00.'
      }
    ])
  }
}

export const noNameWithDescription = Template.bind({})
noNameWithDescription.args = {
  schedule: {
    name: '',
    date: '',
    topics: createTopics([
      {
        title: 'Registration',
        description: 'Registrering vil være åpen frem til klokken 11:00.'
      }
    ])
  }
}

export const noNameWithDescriptionAndReport = Template.bind({})
noNameWithDescriptionAndReport.args = {
  schedule: {
    name: '',
    date: '',
    topics: createTopics([
      {
        title: 'Registration',
        description: 'Registrering vil være åpen frem til klokken 11:00.',
        report: '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
      }
    ])
  }
}

export const nameWithDescriptionAndReport = Template.bind({})
nameWithDescriptionAndReport.args = {
  schedule: {
    name: 'Sunday',
    date: '',
    topics: createTopics([
      {
        title: 'Registration',
        description: 'Registrering vil være åpen frem til klokken 11:00.',
        report: '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
      }
    ])
  }
}

export const nameAndDateWithDescriptionAndReport = Template.bind({})
nameAndDateWithDescriptionAndReport.args = {
  schedule: {
    name: 'Lørdag',
    date: '28. april 2021',
    topics: createTopics([
      {
        title: 'Registration',
        description: 'Registrering vil være åpen frem til klokken 11:00.',
        report: '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
      }
    ])
  }
}

export const nameAndDateWithDescriptionAndSpeaker = Template.bind({})
nameAndDateWithDescriptionAndSpeaker.args = {
  schedule: {
    name: 'Lørdag',
    date: '28. april 2021',
    topics: createTopics([
      {
        title: 'Registration',
        description: 'Registrering vil være åpen frem til klokken 11:00.'
      },
      {
        title: 'Lederens tale',
        description: 'Lederen ønsker velkommen til årsmøte.',
        speakers: [
          {
            person: 'Ronny Skjæveland',
            personUrl: '',
            image: {
              url: 'partyleader.jpg'
            }
          }
        ]
      }
    ])
  }
}

export const nameAndDateWithDescriptionAndReportAndSpeaker = Template.bind({})
nameAndDateWithDescriptionAndReportAndSpeaker.args = {
  schedule: {
    name: 'Lørdag',
    date: '28. april 2021',
    topics: createTopics([
      {
        title: 'Registration',
        description: 'Registrering vil være åpen frem til klokken 11:00.',
        report: '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
      },
      {
        title: 'Lederens tale',
        description: 'Lederen ønsker velkommen til årsmøte.',
        report: '<p>Lederen ønsket velkommen til øredøvende jubel. Han fortalte om den store økningen i medlemsmassen.</p>',
        speakers: [
          {
            person: 'Ronny Skjæveland',
            personUrl: '',
            image: {
              url: 'partyleader.jpg'
            }
          }
        ]
      }
    ])
  }
}

export const nameAndDateWithDateWithDescriptionAndReportAndSpeaker = Template.bind({})
nameAndDateWithDateWithDescriptionAndReportAndSpeaker.args = {
  schedule: {
    name: 'Lørdag',
    date: '28. april 2021',
    topics: createTopics([
      {
        start: '09:00',
        title: 'Registration',
        description: 'Registrering vil være åpen frem til klokken 11:00.',
        report: '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
      },
      {
        start: '09:30',
        title: 'Lederens tale',
        description: 'Lederen ønsker velkommen til årsmøte.',
        report: '<p>Lederen ønsket velkommen til øredøvende jubel. Han fortalte om den store økningen i medlemsmassen.</p>',
        speakers: [
          {
            person: 'Ronny Skjæveland',
            personUrl: '',
            image: {
              url: 'partyleader.jpg'
            }
          }
        ]
      }
    ])
  }
}
/*

export const WithDescription = Template.bind({});
WithDescription.args = {
  topic: {
    ...WithStart.args.topic,
    description: 'Registrering vil være åpen frem til klokken 11:00.'
  },
};

export const WithReport = Template.bind({});
WithReport.args = {
  topic: {
    ...WithDescription.args.topic,
    report: '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
  },
};
*/
