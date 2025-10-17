import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { JoinFlipCard } from '@common/JoinFlipCard/JoinFlipCard';

const meta = {
  title: 'Parts/JoinFlipCard',
  component: JoinFlipCard,
  tags: ['autodocs']
} satisfies Meta<typeof JoinFlipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    backTitle: 'Bli medlem',
    backText: '<p>Meld deg inn i Liberalistene og bli en del av kampen for frihet!</p>',
    backUrl: 'https://liberalistene.org/bli-medlem',
    frontTitle: 'Støtt oss',
    frontText: '<p>Bidra til vår viktige kamp for individuell frihet.</p>'
  }
};

export const WithLongText: Story = {
  args: {
    backTitle: 'Vårt parti',
    backText: '<p>Liberalistene er et politisk parti som kjemper for individuell frihet, eiendomsrett og fri konkurranse. Vi mener at hvert menneske har rett til å leve sitt eget liv uten unødvendig innblanding fra staten.</p>',
    backUrl: 'https://liberalistene.org/om-oss',
    frontTitle: 'Våre verdier',
    frontText: '<p>Frihet, ansvar og respekt for den enkeltes valg.</p>'
  }
};
