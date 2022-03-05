import { OrderSearch } from '../../main/resources/react4xp/libEntries/OrderSearch'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/OrderSearch',
  component: OrderSearch
}

const Template = (args) => (
  <SingleLayout>
    <OrderSearch {...args} />
  </SingleLayout>
)

export const EmptySearch = Template.bind({})
EmptySearch.args = {}

const date = new Date()
const dateBase = date.getTime()

const minute = 60 * 1000
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day

export const searchWithGivenFromDate = Template.bind({})
searchWithGivenFromDate.args = {
  dateFrom: new Date(dateBase - week).toISOString()
}

export const searchWithGivenFromDateWithItems = Template.bind({})
searchWithGivenFromDateWithItems.args = {
  ...searchWithGivenFromDate.args,
  items: [
    {
      id: '1',
      path: '/order/1',
      status: 'new',
      orderlineText: 'VIP-medlemskap for 2022',
      name: 'Ole Nordmann'
    },
    {
      id: '2',
      path: '/order/2',
      status: 'invoice',
      orderlineText: 'Medlemskap for 2022',
      name: 'Ole Nordmann'
    },
    {
      id: '3',
      path: '/order/3',
      status: 'requested',
      orderlineText: 'Støttemedlemskap for 2022',
      name: 'Ole Nordmann'
    }
  ]
}
