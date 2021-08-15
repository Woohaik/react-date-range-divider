const DAY_IN_MS = 86400000;

export const setAlwaysZeroBeforeDate = (target: number): string => `${target < 10 ? "0" : ""}${target}`;

export const getDateElements = (date: Date) => {
    return {
        day: setAlwaysZeroBeforeDate(date.getDate()),
        month: setAlwaysZeroBeforeDate(date.getMonth() + 1),
        year: date.getFullYear() + "",
        hour: setAlwaysZeroBeforeDate(date.getHours()),
        seconds: setAlwaysZeroBeforeDate(date.getSeconds()),
        minutes: setAlwaysZeroBeforeDate(date.getMinutes()),
    };
};

export const isMoreInTheFuture = (shouldBePast: Date, shouldBeFuture: Date) => shouldBeFuture > shouldBePast;

export const convertDateToBeginnigOfDate = (date: Date) => {
    const newD = new Date(date);
    // IF is already at 0- 0 - 0 -0 do nothing
    newD.setHours(0, 0, 0, 0);
    return newD;
};

export const countDaysInBetween = (pastDate: Date, futureDate: Date) => {
    const msBetween = futureDate.valueOf() - pastDate.valueOf();
    const days = Math.ceil(msBetween / DAY_IN_MS);
    return days;
};

export const converDateToEndOfDay = (date: Date) => {
    // Firt be sure is in the beggining of the day
    const finishOfDay = convertDateToBeginnigOfDate(date);
    // Add 24 hours then substract a ms
    finishOfDay.setDate(finishOfDay.getDate() + 1);
    return new Date(finishOfDay.valueOf() - 1);
};

export const addDaysToDate = (date: Date, daysNums = 1) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysNums);
    return newDate;
};

export const showFormattedDate = (date: Date): string => {
    const { day, month, year, hour, seconds, minutes } = getDateElements(date);
    return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
};

export const toHTMLInputDate = (date: Date): string => date.toISOString().substr(0, 10);

export const calcLeft = (totalDays: number, daysoffset: number) => (daysoffset / totalDays) * 100;

export interface IMiddleDateInterval {
    start: Date;
    end: Date;
}

const removeOneMs = (date: Date) => {
    return new Date(date.valueOf() - 1);
};

export const calcRegularIntervals = (pastDate: Date, futureDate: Date, numbersToDivide: number = 1) => {
    const dayDiference = countDaysInBetween(pastDate, futureDate);
    const rawIntervalDiference = dayDiference / numbersToDivide;
    const oddInterval = Math.ceil(rawIntervalDiference);
    const evenInterval = Math.floor(rawIntervalDiference);

    let intervals: IMiddleDateInterval[] = [];
    const lastDaysLeft = dayDiference % numbersToDivide;

    if (numbersToDivide <= dayDiference) {
        let lastReference = pastDate;
        intervals = [];
        let daysForBeStable = lastDaysLeft;
        let willWork = numbersToDivide > daysForBeStable * 2;
        for (let index = 0; index < numbersToDivide; index++) {
            const middleStart = lastReference;
            let daysToAdd = evenInterval;
            if (lastDaysLeft > 0) {
                if (daysForBeStable > 0) {
                    if (willWork) {
                        if (index % 2 === 0) {
                            daysToAdd = oddInterval;
                            daysForBeStable--;
                        }
                    } else {
                        daysToAdd = oddInterval;
                        daysForBeStable--;
                    }
                }
            }
            const middleEnd = addDaysToDate(lastReference, daysToAdd);
            lastReference = middleEnd;
            const singleIntervalData: IMiddleDateInterval = { start: middleStart, end: removeOneMs(middleEnd) };
            intervals.push(singleIntervalData);
        }
    } else {
        intervals.push({ end: futureDate, start: pastDate });
    }
    return intervals;
};
