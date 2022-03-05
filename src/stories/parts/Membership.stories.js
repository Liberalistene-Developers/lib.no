
import { Membership } from '../../main/resources/react4xp/libEntries/Membership'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Membership',
  component: Membership
}

const membership = (gold = false) => ({
  items: [
    {
      id: '2d6750c8-a21d-4d28-a843-61635cabcc7e',
      name: 'LibUng',
      url: '/admin/site/preview/default/draft/liberalistene-hovedside/bli-medlem/liberalistene-ungdom',
      price: 50,
      active: true,
      shortDescription: 'Liberalistene Ungdom 2022',
      invoiceText: 'LibUng medlem hos Liberalistene 2022.',
      image: {
        url: 'http://localhost:8080/admin/site/preview/default/draft/liber…fe971d0f9e5789f24e878787de436505d/block-50-50/Handlekurv.png'
      }
    },
    {
      id: '4aa309cb-e19f-4de3-8fd1-db8dee80c4de',
      name: 'Støttemedlem',
      url: '/admin/site/preview/default/draft/liberalistene-hovedside/bli-medlem/stottemedlem',
      price: 300,
      active: true,
      shortDescription: 'Støttemedlem (2022)',
      invoiceText: 'Støttemedlemskap hos Liberalistene 2022.',
      image: {
        url: 'http://localhost:8080/admin/site/preview/default/draft/liber…fe971d0f9e5789f24e878787de436505d/block-50-50/Handlekurv.png',
        alternativeText: null
      }
    },
    {
      id: 'a279b71d-d6fa-467d-81fc-18c309deefb0',
      name: 'Medlem',
      url: '/admin/site/preview/default/draft/liberalistene-hovedside/bli-medlem/medlem',
      price: 300,
      active: true,
      shortDescription: 'Medlem (2022)',
      invoiceText: 'Medlemskap hos Liberalistene 2022.',
      image: {
        url: 'http://localhost:8080/admin/site/preview/default/draft/liber…fe971d0f9e5789f24e878787de436505d/block-50-50/Handlekurv.png',
        alternativeText: null
      }
    },
    {
      id: 'eac6d4f5-064c-4fe7-a9e5-f0f975cf9209',
      name: 'VIP',
      url: '/admin/site/preview/default/draft/liberalistene-hovedside/bli-medlem/vip',
      price: 1000,
      active: true,
      shortDescription: 'VIP (2022)',
      invoiceText: 'VIP medlemskap hos Liberalistene 2022.',
      image: {
        url: 'http://localhost:8080/admin/site/preview/default/draft/liber…fe971d0f9e5789f24e878787de436505d/block-50-50/Handlekurv.png',
        alternativeText: null
      },
      className: gold ? 'gold' : ''
    }
  ]
})

const Template = (args) => (
  <SingleLayout fullWidth>
    <div>
      <Membership {...args} />
    </div>
  </SingleLayout>
)

export const List = Template.bind({})
List.args = {
  ...membership()
}

export const ListGold = Template.bind({})
ListGold.args = {
  ...membership(true)
}
