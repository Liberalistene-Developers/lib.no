
import { CandidatePage } from '../../main/resources/react4xp/libEntries/CandidatePage'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/CandidatePage',
  component: CandidatePage
}

const Template = (args) => (
  <SingleLayout>
    <CandidatePage {...args} />
  </SingleLayout>
)

const image = {
  url: 'candidate-image.jpg'
}

const artImage = {
  url: 'backdrop-art.svg'
}

export const Normal = Template.bind({})
Normal.args = {
  fancyImage: true,
  artImage,
  image,
  title: 'Ronny Skjæveland',
  position: '1 kandidat, Rogaland',
  ingress: `
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nascetur donec non cras quis nibh sed enim vitae. Ornare ut ultrices venenatis turpis mollis quam posuere ullamcorper et. A id tempus et, amet egestas dignissim tellus. Penatibus at dolor facilisis vulputate. At sapien interdum porttitor dignissim purus pellentesque aliquam. Fringilla gravida tristique volutpat euismod mauris.
</p>
<p>
Ultrices pellentesque id augue est, cursus nibh pretium in egestas. Rhoncus quis maecenas maecenas libero eu nisi convallis. Parturient eget ultrices sem ut nibh. Viverra molestie consequat urna, scelerisque bibendum in at. Risus velit etiam vulputate id ut. Cursus diam integer ut faucibus. Et convallis in ante adipiscing.
</p>
<p>
Nisi, bibendum vel risus enim netus in suspendisse pulvinar. Semper elementum sed turpis arcu scelerisque sit lectus. Viverra leo tincidunt at pharetra nec suspendisse aenean. Massa risus, dui arcu nisi mi sagittis. Ut eget duis dolor ornare dictum tortor commodo pulvinar. Morbi elit, sit mattis quis elementum. Nisi, eu mi nulla elementum pretium interdum purus nulla. Nunc vel, donec erat mattis et dictum. Tellus massa orci laoreet lacus mattis purus.
</p>
`,
  description: `
  <h2>Om Ronny</h2>
  <p>
  <ul>
    <li>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nascetur donec non cras quis nibh sed enim vitae <strong>1996-1998</strong>.
    </li>
    <li>
Ornare ut ultrices venenatis turpis mollis quam posuere ullamcorper et. A id tempus et, amet egestas dignissim tellus. <strong>1999-2003</strong>
</li>
<li>
Penatibus at dolor facilisis vulputate. At sapien interdum porttitor dignissim purus pellentesque aliquam. Fringilla gravida tristique volutpat euismod mauris. <strong>2003-2005</strong>
</li>
<li>
Ultrices pellentesque id augue est, cursus nibh pretium in egestas. <strong>2009</strong> Rhoncus quis maecenas maecenas libero eu nisi convallis.
</li>
<li>
Parturient eget ultrices sem ut nibh. Viverra molestie consequat urna, scelerisque bibendum in <strong>2015</strong>.
</li>
<li>
Risus velit etiam vulputate id ut. Cursus diam integer ut faucibus. Et convallis in ante adipiscing.
</li>
<li>
Nisi, bibendum vel risus enim netus in suspendisse pulvinar. Semper elementum sed turpis arcu scelerisque sit lectus.
</li>
</ul>
</p>
  `
}
