import React, { FC, useState, Fragment } from "react";
import ReactTooltip from "react-tooltip";
import {
    converDateToEndOfDay,
    countDaysInBetween,
    convertDateToBeginnigOfDate,
    showFormattedDate,
    toHTMLInputDate,
    addDaysToDate,
    calcLeft,
    calcRegularIntervals,
    IDateMiddleInterval,
} from "./utils/Date";

const cssStyles = {
    datebar: {
        border: "1px solid black",
        height: "45px",
        width: "100%",
        position: "relative" as const,
    },
    singleDate: {
        position: "absolute" as const,
        height: "45px",
        width: "10px",
    },
    dateRange: {
        zIndex: 1,
        position: "absolute" as const,
        height: "45px",
        backgroundColor: "blueviolet",
    },
    middleStart: {
        zIndex: 2,
        backgroundColor: "red",
        width: "5px",
    },
    middleEnd: {
        zIndex: 2,
        backgroundColor: "blue",
        width: "5px",
    },
};

export const DateRangeDivider: FC = () => {
    const [count, setCount] = useState(1);

    const [startDate, setStartDate] = useState(new Date("2020/05/01"));
    const [endDate, setEndDate] = useState(converDateToEndOfDay(new Date("2020/05/11")));

    const initialDateRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const initialDate = convertDateToBeginnigOfDate(new Date(event.currentTarget.value));
        setStartDate(() => initialDate);
    };

    const endDateRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const finishDate = converDateToEndOfDay(new Date(event.currentTarget.value));
        setEndDate(() => finishDate);
    };

    const drawMiddleRange = ({ middleStart, middleEnd }: IDateMiddleInterval) => {
        const daysBetweenOfStart = countDaysInBetween(startDate, middleStart);
        const daysBetweenOfEnd = countDaysInBetween(startDate, middleEnd);
        const leftStart = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfStart);
        const leftEnd = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfEnd);
        return (
            <>
                <ReactTooltip />
                <div
                    data-tip={`${showFormattedDate(middleStart)}`}
                    style={{ ...cssStyles.singleDate, ...cssStyles.middleStart, left: `calc(${leftStart}% )` }}
                />
                <div
                    data-tip={`${showFormattedDate(middleStart)} - ${showFormattedDate(middleEnd)} `}
                    style={{
                        ...cssStyles.dateRange,
                        left: `calc(${leftStart}% )`,
                        width: `${leftEnd - leftStart}%`,
                    }}
                />
                <div
                    data-tip={`${showFormattedDate(middleEnd)}`}
                    style={{ ...cssStyles.singleDate, ...cssStyles.middleEnd, left: `calc(${leftEnd}% - 5px) ` }}
                />
            </>
        );
    };

    return (
        <Fragment>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <br />
            <br />
            Init {showFormattedDate(startDate)}
            <br />
            <input
                type="date"
                value={toHTMLInputDate(addDaysToDate(startDate))}
                max={toHTMLInputDate(endDate)}
                onChange={initialDateRangeHandler}
            />
            <br />
            <br />
            Finish {showFormattedDate(endDate)}
            <br />
            <input
                type="date"
                value={toHTMLInputDate(endDate)}
                min={toHTMLInputDate(addDaysToDate(startDate))}
                onChange={endDateRangeHandler}
            />
            <br />
            <hr />
            <br />
            <div style={{ width: "50%" }}>
                <div style={{ ...cssStyles.datebar }}>
                    <div style={{ ...cssStyles.singleDate, left: "calc(0% - 5px)" }}></div>
                    <div style={{ ...cssStyles.singleDate, left: "calc(100% - 5px)" }}></div>
                    {calcRegularIntervals(startDate, endDate, count).map(drawMiddleRange)}
                </div>
            </div>
        </Fragment>
    );
};
