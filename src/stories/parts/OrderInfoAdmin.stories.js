import { OrderInfoAdmin } from '../../main/resources/react4xp/libEntries/OrderInfoAdmin'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/OrderInfoAdmin',
  component: OrderInfoAdmin
}

const Template = (args) => (
  <SingleLayout>
    <OrderInfoAdmin {...args} />
  </SingleLayout>
)

const customerInvoice = {
  email: 'ola.nordmann@norge.as',
  name: 'Ola Nordmann',
  address: 'Nord for Sinsenkrysset',
  zip: '0001',
  city: 'Oslo'
}

const customerVIPPS = {
  phone: '99999999',
  ...customerInvoice
}

const createdDate = new Date()
const createdDateBase = createdDate.getTime()

const orderLines = [{
  id: 'xxxxx-xxxxx-xxxxx-xxxxx-xxxxx',
  text: 'VIP medlemskap 2022',
  price: 1000.0
}]

export const EmptyOrder = Template.bind({})
EmptyOrder.args = {
  createdDate: createdDate.toISOString(),
  status: 'new',
  createdDateBase
}

const jsonText = {
  input: {
    customer: customerInvoice
  }
}

const minute = 60 * 1000
const created = { date: new Date(createdDateBase + minute).toISOString(), text: JSON.stringify(jsonText, null, 2), from: 'System' }
const requested = { date: new Date(createdDateBase + (2 * minute)).toISOString(), text: JSON.stringify(jsonText, null, 2), from: 'System' }
const reserved = { date: new Date(createdDateBase + (3 * minute)).toISOString(), text: JSON.stringify(jsonText, null, 2), from: 'VIPPS' }

export const VIPPSOrderRequested = Template.bind({})
VIPPSOrderRequested.args = {
  createdDate: createdDate.toISOString(),
  sentDate: new Date(createdDateBase + minute).toISOString(),
  status: 'requested',
  events: [
    requested,
    created
  ],
  orderLines,
  paymethod: 'vipps',
  total: orderLines
    .reduce((acc, { price }) => acc + price, 0),
  customer: customerVIPPS
}

export const VIPPSOrderReserved = Template.bind({})
VIPPSOrderReserved.args = {
  ...VIPPSOrderRequested.args,
  events: [
    reserved,
    ...VIPPSOrderRequested.args.events
  ],
  status: 'reserved'
}

export const InvoiceOrder = Template.bind({})
InvoiceOrder.args = {
  createdDate: createdDate.toISOString(),
  status: 'invoice',
  paymethod: 'invoice',
  orderLines,
  total: orderLines
    .reduce((acc, { price }) => acc + price, 0),
  customer: customerInvoice
}
