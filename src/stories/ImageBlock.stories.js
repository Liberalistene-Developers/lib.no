import React from 'react';

import { ImageBlock } from '../main/resources/site/parts/imageblock/imageblock.jsx';

export default {
  title: 'Parts/ImageBlock',
  
  component: ImageBlock,
};

const Template = (args) => (
  <main>
    <div className="content">
      <div className="content-item">
        <ImageBlock {...args} />
      </div>
    </div>
  </main>
);

export const NoHeader = Template.bind({});
NoHeader.args = {
  image: {
    url: 'imageblockimage.png',
  },    
};

export const H1RightLight = Template.bind({});
H1RightLight.storyName = 'H1 Right Light';
H1RightLight.args = {
  ...NoHeader.args,
  title: 'H1 Header',
  Tag: 'h1',
  text: 'light',
};

export const H1LeftLight = Template.bind({});
H1LeftLight.storyName = 'H1 Left Light';
H1LeftLight.args = {
  ...H1RightLight.args,
  position: 'left',
};

export const H1CenterLight = Template.bind({});
H1CenterLight.storyName = 'H1 Center Light';
H1CenterLight.args = {
  ...H1RightLight.args,
  position: 'center',
};

export const H2RightLight = Template.bind({});
H2RightLight.storyName = 'H2 Right Light';
H2RightLight.args = {
  ...NoHeader.args,
  title: 'H2 Header',
  Tag: 'h2',
  text: 'light',
};

export const H2LeftLight = Template.bind({});
H2LeftLight.storyName = 'H2 Left Light';
H2LeftLight.args = {
  ...H2RightLight.args,
  position: 'left',
};

export const H2CenterLight = Template.bind({});
H2CenterLight.storyName = 'H2 Center Light';
H2CenterLight.args = {
  ...H2RightLight.args,
  position: 'center',
};

export const H3RightLight = Template.bind({});
H3RightLight.storyName = 'H3 Right Light';
H3RightLight.args = {
  ...NoHeader.args,
  title: 'H3 Header',
  Tag: 'h3',
  text: 'light',
};

export const H3LeftLight = Template.bind({});
H3LeftLight.storyName = 'H3 Left Light';
H3LeftLight.args = {
  ...H3RightLight.args,
  position: 'left',
};

export const H3CenterLight = Template.bind({});
H3CenterLight.storyName = 'H3 Center Light';
H3CenterLight.args = {
  ...H3RightLight.args,
  position: 'center',
};
