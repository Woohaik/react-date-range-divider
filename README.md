# react-date-range-divider


## Props

- divisions (number): Number of division wanted of the given period (If this number is higher than the number of days available in the period will take 1 as default)

- startDate (string): string date of the start date

- endDate (string): string date of the end date

- onChange (intervals: IMiddleDateInterval[]) => void: function with intervals as arg

### Types

IMiddleDateInterval : { start: Date, end: Date }

