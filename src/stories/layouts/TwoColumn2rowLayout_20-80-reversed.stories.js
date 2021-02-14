import React from 'react';

import { TwoColumn2rowLayout } from './Layout';;

export default {
  title: 'Layouts/TwoColumnLayout + 1/Reversed/20-80',
  
  component: TwoColumn2rowLayout,
};

const Template = (args) => (
  <TwoColumn2rowLayout {...args}>
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <h1>Lorem ipsum 1</h1>
      
      <p className="rich-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
      </p>
    </div>
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <h1>Lorem ipsum 2</h1>
      
      <p className="rich-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
      </p>
    </div>
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <h1>Lorem ipsum 3</h1>
      
      <p className="rich-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
      </p>
    </div>
  </TwoColumn2rowLayout>
);

export const StandardBackground = Template.bind({});
StandardBackground.args = {
  background: 'standard',
  fullWidth: false,
  paddingBottom: false,
  paddingTop: false,
  leftClassName: 'one-20',
  rightClassName: 'four',
  order: 'reverse',
};

export const StandardBackgroundFullWidth = Template.bind({});
StandardBackgroundFullWidth.args = {
  ...StandardBackground.args,
  fullWidth: true,
};

export const PurpleBackground = Template.bind({});
PurpleBackground.args = {
  ...StandardBackground.args,
  background: 'purple',
};

export const PurpleBackgroundFullWidth = Template.bind({});
PurpleBackgroundFullWidth.args = {
  ...PurpleBackground.args,
  fullWidth: true,
};

export const PurpleBackgroundPaddingTop = Template.bind({});
PurpleBackgroundPaddingTop.args = {
  ...PurpleBackground.args,
  paddingTop: true,
};

export const PurpleBackgroundPaddingBottom = Template.bind({});
PurpleBackgroundPaddingBottom.args = {
  ...PurpleBackground.args,
  paddingBottom: true,
};

export const PurpleBackgroundPaddingTopAndBottom = Template.bind({});
PurpleBackgroundPaddingTopAndBottom.args = {
  ...PurpleBackground.args,
  paddingBottom: true,
  paddingTop: true,
};

export const WhiteBackground = Template.bind({});
WhiteBackground.args = {
  ...StandardBackground.args,
  background: 'white',
};

export const WhiteBackgroundReverse = Template.bind({});
WhiteBackgroundReverse.args = {
  ...WhiteBackground.args,
  order: 'reverse',
};

export const WhiteBackgroundFullWidth = Template.bind({});
WhiteBackgroundFullWidth.args = {
  ...WhiteBackground.args,
  fullWidth: true,
};

export const YellowBackground = Template.bind({});
YellowBackground.args = {
  ...StandardBackground.args,
  background: 'yellow',
};

export const YellowBackgroundFullWidth = Template.bind({});
YellowBackgroundFullWidth.args = {
  ...YellowBackground.args,
  fullWidth: true,
};











