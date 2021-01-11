import React from 'react';

import { SingleLayout } from './Layout';;

export default {
  title: 'Layouts/SingleLayout',
  
  component: SingleLayout,
};

const Template = (args) => (
  <SingleLayout {...args}>
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <h1>Lorem ipsum</h1>
      
      <p className="rich-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
      </p>
      <p>
        In commodo et urna eget rhoncus. Mauris dictum dignissim ipsum, et tincidunt diam imperdiet sit amet. Vestibulum imperdiet sapien quis quam condimentum, id facilisis nisl feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ipsum ipsum, aliquet eu velit vel, egestas mattis purus. Nam mauris eros, sagittis id sagittis in, condimentum ut leo. Donec laoreet facilisis lacus ac dignissim. Donec cursus risus in lacus tincidunt ultrices. Sed a lacinia mi.
      </p>
      <p>
        Morbi et congue leo. Aenean faucibus dui vitae placerat cursus. Sed arcu urna, sollicitudin vel tincidunt eu, ornare non turpis. Cras consectetur tortor sed purus blandit convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus libero est, facilisis eget malesuada ac, cursus nec orci. Mauris velit augue, hendrerit vel metus id, luctus pretium mauris.
      </p>
      <p>
        Duis non consectetur orci. Nullam placerat, nisl sit amet posuere faucibus, neque lorem pulvinar metus, at accumsan felis odio nec leo. Proin at varius quam. In consectetur vestibulum risus, convallis lobortis tortor maximus at. Sed lacinia libero sit amet fringilla sollicitudin. Phasellus at purus mi. Sed sed elementum justo. Donec tempor venenatis velit at accumsan. Integer bibendum enim non blandit sodales. Donec non porttitor arcu. Nam feugiat justo justo, vel gravida lorem congue nec. Aliquam elementum magna sit amet rutrum volutpat. Donec non maximus leo.
      </p>
      <p>
        Fusce eget tempor lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vel metus egestas, egestas arcu vitae, hendrerit ligula. Maecenas a tempus risus, et ullamcorper magna. Aenean tortor ligula, semper a varius at, pretium vitae ligula. Donec quis nulla velit. Morbi eleifend libero magna, ut lobortis turpis tempor eu. Ut vel cursus arcu, a porta ligula. Proin efficitur tempus mi, finibus scelerisque ipsum elementum nec. Ut quis nunc magna. Etiam vel ultrices ex. Aliquam volutpat magna id erat bibendum sodales.
      </p>
    </div>
  </SingleLayout>
);

export const StandardBackground = Template.bind({});
StandardBackground.args = {
  background: 'standard',
};

export const StandardBackgroundFullWidth = Template.bind({});
StandardBackgroundFullWidth.args = {
  ...StandardBackground.args,
  fullWidth: true,
};

export const PurpleBackground = Template.bind({});
PurpleBackground.args = {
  background: 'purple',
};

export const PurpleBackgroundFullWidth = Template.bind({});
PurpleBackgroundFullWidth.args = {
  ...PurpleBackground.args,
  fullWidth: true,
};

export const WhiteBackground = Template.bind({});
WhiteBackground.args = {
  background: 'white',
};

export const WhiteBackgroundFullWidth = Template.bind({});
WhiteBackgroundFullWidth.args = {
  ...WhiteBackground.args,
  fullWidth: true,
};

export const YellowBackground = Template.bind({});
YellowBackground.args = {
  background: 'yellow',
};

export const YellowBackgroundFullWidth = Template.bind({});
YellowBackgroundFullWidth.args = {
  ...YellowBackground.args,
  fullWidth: true,
};