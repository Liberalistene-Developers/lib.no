import preview from '../../../.storybook/preview'
import { BoardPresentation } from '@common/BoardPresentation/BoardPresentation'

const meta = preview.meta({
  title: 'Parts/BoardPresentation',
  component: BoardPresentation,
  tags: ['autodocs']
})

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
    shortDescription:
      'Aleksander Aas er organisatorisk nestleder i Liberalistene.',
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
]

export const SentralStyret = meta.story({
  args: {
    title: 'Liberalistene Sentralstyre',
    boardTitle: 'Styre',
    showEmail: 'no',
    board: boardMembers,
    imagesize: 'medium',
    imagetype: 'round'
  }
})

export const SentralStyretEmailFirst = meta.story({
  args: {
    ...SentralStyret.input.args,
    showEmail: 'first'
  }
})

export const SentralStyretEmailAll = meta.story({
  args: {
    ...SentralStyret.input.args,
    showEmail: 'all'
  }
})

export const SentralStyretNotHighlighted = meta.story({
  args: {
    ...SentralStyret.input.args,
    noHighlighting: true
  }
})

export const SentralStyretHighlightingRight = meta.story({
  args: {
    ...SentralStyret.input.args,
    reverseOrder: true
  }
})
