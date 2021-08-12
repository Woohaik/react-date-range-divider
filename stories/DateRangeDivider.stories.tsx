import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DateRangeDivider } from '../src';

const meta: Meta = {
  title: 'Date Range Divider',
  component: DateRangeDivider,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => <DateRangeDivider {...args} />;

export const Default = Template.bind({});

Default.args = {};
