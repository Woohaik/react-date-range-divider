import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DateRangeDivider } from '../src';
import { IMiddleDateInterval } from '../src/utils/Date';

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

const Template: Story = args => <DateRangeDivider
  onChange={(_: IMiddleDateInterval[]) => { }}
  divisions={2}
  startDate={new Date("2020/05/11")}
  endDate={new Date("2020/05/15")}
  {...args}
/>;

export const Default = Template.bind({});

Default.args = {};
