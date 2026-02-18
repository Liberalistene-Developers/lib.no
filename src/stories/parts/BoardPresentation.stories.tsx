import preview from '../../../.storybook/preview'
import { BoardPresentation } from '@common/BoardPresentation/BoardPresentation'

const meta = preview.meta({
  title: 'Parts/BoardPresentation',
  component: BoardPresentation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <main>
        <div className="content-holder normal padding-bottom">
          <div className="content">
            <div className="content-item">
              <Story />
            </div>
          </div>
        </div>
      </main>
    )
  ]
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

const longNameMembers = [
  {
    itemId: 1,
    name: 'Kristoffer Aleksander Johannessen-Haugen',
    email: 'kristoffer@liberalistene.no',
    role: 'Partileder',
    image: {url: 'https://picsum.photos/200/200?random=10'}
  },
  {
    itemId: 2,
    name: 'Åsgård Ottervig',
    email: 'asgard@liberalistene.no',
    role: 'Webredaktør',
    image: {url: 'https://picsum.photos/200/200?random=11'}
  },
  {
    itemId: 3,
    name: 'Sondre Thorvaldsen-Brekke',
    email: 'sondre@liberalistene.no',
    role: 'Organisatorisk Nestleder',
    image: {url: 'https://picsum.photos/200/200?random=12'}
  },
  {
    itemId: 4,
    name: 'Li',
    email: 'li@liberalistene.no',
    role: 'Sekretær',
    image: {url: 'https://picsum.photos/200/200?random=13'}
  }
]

export const LongNamesHighlighted = meta.story({
  args: {
    title: 'Edge Case: Long Names',
    boardTitle: 'Styre',
    showEmail: 'no',
    board: longNameMembers,
    imagesize: 'medium',
    imagetype: 'round'
  }
})

export const LongNamesNoHighlighting = meta.story({
  args: {
    ...LongNamesHighlighted.input.args,
    noHighlighting: true
  }
})

export const LongNamesEmailAll = meta.story({
  args: {
    ...LongNamesHighlighted.input.args,
    showEmail: 'all'
  }
})
