import React from 'react';

import { Group } from '../../main/resources/react4xp/libEntries/Group';

import { SingleLayout } from '../layouts';

import '../../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Group',
  component: Group,
};

const image = {
  url: 'imageblockimage.png',
};

const Template = (args) => (
  <SingleLayout fullWidth="true">
    <Group {...args} />
  </SingleLayout>
);

export const Normal = Template.bind({});
Normal.args = {
  headerColor: 'light',
  headerPosition: 'right',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.',
  image,
  title: 'GroupName',
  titleInImage: true,
  location: {
    address: 'Markensgate 39, Kristiansand'
  },
  informationLabel: 'Informasjon',
};

export const SentralStyret = Template.bind({});
SentralStyret.args = {
  title: 'Sentralstyret',
  board: [
    {
      name: 'Ronny Skjæveland',
      role: 'Partileder',
      shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
      image: {
        url: 'partyleader.jpg',
      },
    },
    {
      name: 'Roald Ribe',
      role: 'Politisk Nestleder',
      shortDescription: 'Roald Ribe er politisk nestleder i Liberalistene.',
      image: {
        url: 'politicalnestleader.jpg',
      },
    },
    {
      name: 'Aleksander Aas',
      role: 'Organisatorisk Nestleder',
      shortDescription: 'Aleksander Aas er organisatorisk nestleder i Liberalistene.',
      image: {
        url: 'orgnestleader.jpg',
      },
    },
    {
      name: 'Jan-Øyvind Lorgen',
      role: 'Sekretær',
      shortDescription: 'Jan-Øyvind Lorgen er sekretær i Liberalistene.',
      image: {
        url: 'secretary.jpg',
      },
    },
    {
      name: 'Amund Farberg',
      role: 'Styremedlem',
      shortDescription: 'Amund Farberg er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember1.jpg',
      },
    },
    {
      name: 'Nicolay Normann Grundt',
      role: 'Styremedlem',
      shortDescription: 'Nicolay Normann Grundt er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember2.jpg',
      },
    },
    {
      name: 'Daisy Sælem Hafstad',
      role: 'Styremedlem',
      shortDescription: 'Daisy Sælem Hafstad er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember3.jpg',
      },
    },
  ]
};
