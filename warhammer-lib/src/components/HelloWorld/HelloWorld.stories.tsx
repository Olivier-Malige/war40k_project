import React, { FC } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import HelloWorld from './HelloWorld';

export default {
  title: 'Components/helloWorlds',
  component: HelloWorld,
} as Meta;

export const HelloWorldStory: FC = () => <HelloWorld name={'pierre'} />;
