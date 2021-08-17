# react-date-range-divider

[![npm version](https://badge.fury.io/js/react-date-range-divider.svg)](https://badge.fury.io/js/react-date-range-divider)

A react component for divide a date interval into equally distributited intervals at a day level.

## Installation

```sh
npm i react-date-range-divider --save
```

## Usage
### Quick Examples

```tsx
import { DateRangeDivider, IMiddleDateInterval } from 'react-date-range-divider';
const FooComponent = () => {
    const [intervals, setIntervals] = useState<IMiddleDateInterval[]>([]);
    const numOfDivisios = 2;
    const startDate = new Date("2020/05/11"); // YYYY/MM/DD 
    const endDate = new Date("2020/05/15");  // YYYY/MM/DD 
    return (
        <DateRangeDivider
            divisions={numOfDivisios}
            startDate={startDate}
            endDate={endDate}
            onChange={(resultIntervals: IMiddleDateInterval[]) => {
                // Do what you need with intervals
                setIntervals(() => resultIntervals);
            }}
        />
    )
};
```
#### Warning
Since it divides in entire days a non possible Int division (with no decimals in result) will aproximate the first interval to the next day.
In this case the result will be:
- 11/05/2020 - 00:00:00 => 13/05/2020 - 23:59:59 *(3 days including start and end)*
- 14/05/2020 - 00:00:00 => 14/05/2020 - 23:59:59 *(2 days including start and end)*

5 days in total from 11/05/2020 - 15/05/2020. (DD/MM/YYYY)


### calcRegularIntervals Function
If only need to divide intervals without the component, the function can be imported alone.

```tsx
import { calcRegularIntervals, IMiddleDateInterval } from 'react-date-range-divider';

const startDate = new Date("2020/05/11"); // YYYY/MM/DD 
const endDate = new Date("2020/05/15");  // YYYY/MM/DD 
const numOfDivisios = 2;

const intervals: IMiddleDateInterval[] = calcRegularIntervals(startDate, endDate, numOfDivisios); // number to divide is 1 by default

```






## Documentation

### Import

```typescript
import { DateRangeDivider } from 'react-date-range-divider';
```

### Error Handler
By passing a endDate lower than the startDate or giving a divisionNumber higher than the number of days in between parent interval, the component will use the current day divided in one


### Props

| Name        |        Type                                |              Description              |
| :---------: | :----------------------------------------: | :-----------------------------------: |
| divisions   | number                                     | Number of division desired of the given period (If this number is higher than the number of days available in the period will take 1 as default) |
| startDate   | Date                                       | Start date of the parent interval (will convert to the beggining of the passes day. ex: 2020/05/14:12:14:00 => 2020/05/14-00:00:00)              |                                                                                                |
| endDate     | Date                                       | Finish Date of the parent interval (will convert to the beggining of the passes day. ex: 2020/05/14:12:14:00 => 2020/05/14-23:59:59)             |                                                                                                         |
| onChange    | (intervals: IMiddleDateInterval[]) => void | callback that passes the resultant intervals as argument                                                                                         |


### Types

| Name                    |              Type               |              Description              |
| :---------------------: | :-----------------------------: | :-----------------------------------: |
| IMiddleDateInterval     | {start: Date, end: Date}        | Dates resultant of division calculus  |
