import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { BoardPresentation } from '@parts/boardpresentation/BoardPresentation';

const meta = {
  title: 'Parts/BoardPresentation',
  component: BoardPresentation,
  tags: ['autodocs']
} satisfies Meta<typeof BoardPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

const boardMembers = [
  {
    itemId: 1,
    name: 'Ronny Skjæveland',
    email: 'ronny@liberalistene.no',
    role: 'Partileder',
    shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
    image: {
      url: 'https://picsum.photos/200/200?random=1'
    }
  },
  {
    itemId: 2,
    name: 'Roald Ribe',
    email: 'roald@liberalistene.no',
    role: 'Politisk Nestleder',
    shortDescription: 'Roald Ribe er politisk nestleder i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=2'
    }
  },
  {
    itemId: 3,
    name: 'Aleksander Aas',
    email: 'ass@liberalistene.no',
    role: 'Organisatorisk Nestleder',
    shortDescription: 'Aleksander Aas er organisatorisk nestleder i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=3'
    }
  },
  {
    itemId: 4,
    name: 'Jan-Øyvind Lorgen',
    email: 'lorgen@liberalistene.no',
    role: 'Sekretær',
    shortDescription: 'Jan-Øyvind Lorgen er sekretær i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=4'
    }
  },
  {
    itemId: 5,
    name: 'Amund Farberg',
    email: 'amund.farberg@liberalistene.no',
    role: 'Styremedlem',
    shortDescription: 'Amund Farberg er styremedlem i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=5'
    }
  },
  {
    itemId: 6,
    name: 'Nicolay Normann Grundt',
    role: 'Styremedlem',
    shortDescription: 'Nicolay Normann Grundt er styremedlem i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=6'
    }
  },
  {
    itemId: 7,
    name: 'Daisy Sælem Hafstad',
    role: 'Styremedlem',
    shortDescription: 'Daisy Sælem Hafstad er styremedlem i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=7'
    }
  }
];

export const SentralStyret: Story = {
  args: {
    title: 'Liberalistene Sentralstyre',
    boardTitle: 'Styre',
    showEmail: 'no',
    board: boardMembers,
    imagesize: 'medium',
    imagetype: 'round'
  }
};

export const SentralStyretEmailFirst: Story = {
  args: {
    ...SentralStyret.args,
    showEmail: 'first'
  }
};

export const SentralStyretEmailAll: Story = {
  args: {
    ...SentralStyret.args,
    showEmail: 'all'
  }
};

export const SentralStyretNotHighlighted: Story = {
  args: {
    ...SentralStyret.args,
    noHighlighting: true
  }
};

export const SentralStyretHighlightingRight: Story = {
  args: {
    ...SentralStyret.args,
    reverseOrder: true
  }
};
