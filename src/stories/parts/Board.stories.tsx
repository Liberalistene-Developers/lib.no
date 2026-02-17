import preview from '../../../.storybook/preview'
import { Board } from '@common/Board/Board'

const meta = preview.meta({
  title: 'Parts/Board',
  component: Board,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <main>
        <div className="content-holder normal">
          <div className="content">
            <div className="content-item">
              <div className="xp-region" data-portal-region="content">
                <section>
                  <h1 style={ { textAlign: 'center' } }>Sentralstyret</h1>
                </section>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        </div>
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
    name: 'Ronny Skjæveland',
    role: 'Partileder',
    shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
    image: {
      url: 'https://picsum.photos/200/200?random=1'
    }
  },
  {
    name: 'Roald Ribe',
    role: 'Politisk Nestleder',
    shortDescription: 'Roald Ribe er politisk nestleder i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=2'
    }
  },
  {
    name: 'Aleksander Aas',
    role: 'Organisatorisk Nestleder',
    shortDescription:
      'Aleksander Aas er organisatorisk nestleder i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=3'
    }
  },
  {
    name: 'Jan-Øyvind Lorgen',
    role: 'Sekretær',
    shortDescription: 'Jan-Øyvind Lorgen er sekretær i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=4'
    }
  },
  {
    name: 'Amund Farberg',
    role: 'Styremedlem',
    shortDescription: 'Amund Farberg er styremedlem i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=5'
    }
  },
  {
    name: 'Nicolay Normann Grundt',
    role: 'Styremedlem',
    shortDescription: 'Nicolay Normann Grundt er styremedlem i Liberalistene.',
    image: {
      url: 'https://picsum.photos/200/200?random=6'
    }
  },
  {
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
    board: boardMembers,
    imagesize: 'medium',
    imagetype: 'round'
  }
})
