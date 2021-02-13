import React from 'react';

import { TwoColumn2rowLayout } from './Layout';;

export default {
  title: 'Layouts/TwoColumnLayout + 1/20-80',
  
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
  order: '',
};

export const StandardBackgroundReverse = Template.bind({});
StandardBackgroundReverse.args = {
  ...StandardBackground.args,
  order: 'reverse',
};


export const StandardBackgroundFullWidth = Template.bind({});
StandardBackgroundFullWidth.args = {
  ...StandardBackground.args,
  fullWidth: true,
};

export const StandardBackgroundFullWidthReverse = Template.bind({});
StandardBackgroundFullWidthReverse.args = {
  ...StandardBackgroundFullWidth.args,
  order: 'reverse',
}

export const PurpleBackground = Template.bind({});
PurpleBackground.args = {
  ...StandardBackground.args,
  background: 'purple',
};

export const PurpleBackgroundReverse= Template.bind({});
PurpleBackgroundReverse.args = {
  ...PurpleBackground.args,
  order: 'reverse',
};

export const PurpleBackgroundFullWidth = Template.bind({});
PurpleBackgroundFullWidth.args = {
  ...PurpleBackground.args,
  fullWidth: true,
};

export const PurpleBackgroundFullWidthReverse = Template.bind({});
PurpleBackgroundFullWidthReverse.args = {
  ...PurpleBackgroundFullWidth.args,
  order: 'reverse',
};

export const PurpleBackgroundPaddingTop = Template.bind({});
PurpleBackgroundPaddingTop.args = {
  ...PurpleBackground.args,
  paddingTop: true,
};

export const PurpleBackgroundPaddingTopReverse = Template.bind({});
PurpleBackgroundPaddingTopReverse.args = {
  ...PurpleBackgroundPaddingTop.args,
  order: 'reverse',
};

export const PurpleBackgroundPaddingBottom = Template.bind({});
PurpleBackgroundPaddingBottom.args = {
  ...PurpleBackground.args,
  paddingBottom: true,
};

export const PurpleBackgroundPaddingBottomReverse = Template.bind({});
PurpleBackgroundPaddingBottomReverse.args = {
  ...PurpleBackgroundPaddingBottom.args,
  order: 'reverse',
};

export const PurpleBackgroundPaddingTopAndBottom = Template.bind({});
PurpleBackgroundPaddingTopAndBottom.args = {
  ...PurpleBackground.args,
  paddingBottom: true,
  paddingTop: true,
};

export const PurpleBackgroundPaddingTopAndBottomReverse = Template.bind({});
PurpleBackgroundPaddingTopAndBottomReverse.args = {
  ...PurpleBackgroundPaddingTopAndBottom.args,
  order: 'reverse',
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

export const WhiteBackgroundFullWidthReverse = Template.bind({});
WhiteBackgroundFullWidthReverse.args = {
  ...WhiteBackgroundFullWidth.args,
  order: 'reverse',
};

export const YellowBackground = Template.bind({});
YellowBackground.args = {
  ...StandardBackground.args,
  background: 'yellow',
};

export const YellowBackgroundReverse = Template.bind({});
YellowBackgroundReverse.args = {
  ...YellowBackground.args,
  order: 'reverse',
};

export const YellowBackgroundFullWidth = Template.bind({});
YellowBackgroundFullWidth.args = {
  ...YellowBackground.args,
  fullWidth: true,
};

export const YellowBackgroundFullWidthReverse = Template.bind({});
YellowBackgroundFullWidthReverse.args = {
  ...YellowBackgroundFullWidth.args,
  order: 'reverse',
};