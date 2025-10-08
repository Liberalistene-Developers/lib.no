import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Schedule } from '../../main/resources/react4xp/components/parts/organizational-position/Schedule';

const meta = {
  title: 'Parts/Schedule',
  component: Schedule,
  tags: ['autodocs']
} satisfies Meta<typeof Schedule>;

export default meta;
type Story = StoryObj<typeof meta>;

interface TopicItem {
  title?: string;
  start?: string;
  duration?: string;
  description?: string;
  report?: string;
  speakers?: Array<{
    person?: string;
    personUrl?: string;
    image?: { url?: string };
  }>;
}

const createTopics = (items: TopicItem[] = []) =>
  items.map((item) => ({
    title: '',
    start: '',
    duration: '',
    description: '',
    report: '',
    ...item
  }));

export const Empty: Story = {
  args: {
    schedule: {
      name: '',
      date: '',
      topics: []
    }
  }
};

export const WithTitle: Story = {
  args: {
    schedule: {
      name: '',
      date: '',
      topics: createTopics([{ title: 'Registration' }])
    }
  }
};

export const WithStart: Story = {
  args: {
    schedule: {
      name: '',
      date: '',
      topics: createTopics([{ title: 'Registration', start: '09:00' }])
    }
  }
};

export const WithDuration: Story = {
  args: {
    schedule: {
      name: '',
      date: '',
      topics: createTopics([{ title: 'Registration', start: '09:00', duration: '30 min' }])
    }
  }
};

export const WithDescription: Story = {
  args: {
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
};

export const WithReport: Story = {
  args: {
    schedule: {
      name: '',
      date: '',
      topics: createTopics([
        {
          title: 'Registration',
          description: 'Registrering vil være åpen frem til klokken 11:00.',
          report:
            '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
        }
      ])
    }
  }
};

export const FullSchedule: Story = {
  args: {
    schedule: {
      name: 'Lørdag',
      date: '28. april 2021',
      topics: createTopics([
        {
          start: '09:00',
          title: 'Registration',
          description: 'Registrering vil være åpen frem til klokken 11:00.',
          report:
            '<p>Antall som registrerte seg før 11:00 var <strong>160</strong> delegater.<br /><strong>10</strong> delegater registrerte seg etter kl 11:00.'
        },
        {
          start: '09:30',
          title: 'Lederens tale',
          description: 'Lederen ønsker velkommen til årsmøte.',
          report:
            '<p>Lederen ønsket velkommen til øredøvende jubel. Han fortalte om den store økningen i medlemsmassen.</p>',
          speakers: [
            {
              person: 'Ronny Skjæveland',
              personUrl: '',
              image: {
                url: 'https://picsum.photos/200/200'
              }
            }
          ]
        }
      ])
    }
  }
};
