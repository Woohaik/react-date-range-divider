import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as DateRangeDivider } from '../stories/DateRangeDivider.stories';

describe('DateRangeDivider', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DateRangeDivider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
