import React, { FC, useState, Fragment } from "react";
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

import "./Date-range-divider.css";

export const DateRangeDivider: FC = () => {
    const [count, setCount] = useState(1);

    const [startDate, setStartDate] = useState(new Date("2020/05/01"));
    const [endDate, setEndDate] = useState(converDateToEndOfDay(new Date("2020/05/11")));

    const [middleStartDate, setMiddleStartDate] = useState(new Date("2020/05/02"));
    const [middleEndDate, setMiddleEndDate] = useState(converDateToEndOfDay(new Date("2020/05/02")));

    const initialDateRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const initialDate = convertDateToBeginnigOfDate(new Date(event.currentTarget.value));
        setStartDate(() => initialDate);
    };

    const endDateRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const finishDate = converDateToEndOfDay(new Date(event.currentTarget.value));
        setEndDate(() => finishDate);
    };

    const middleStartDateRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const finishDate = convertDateToBeginnigOfDate(new Date(event.currentTarget.value));
        setMiddleStartDate(() => finishDate);
    };

    const middleEndDateRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const finishDate = converDateToEndOfDay(new Date(event.currentTarget.value));
        setMiddleEndDate(() => finishDate);
    };

    const drawMiddleRange = ({ middleStart, middleEnd }: IDateMiddleInterval) => {
        const daysBetweenOfStart = countDaysInBetween(startDate, middleStart);
        const daysBetweenOfEnd = countDaysInBetween(startDate, middleEnd);
        const leftStart = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfStart);
        const leftEnd = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfEnd);
        return (
            <>
                <div className="singleDate middleStart" style={{ left: `calc(${leftStart}% )` }} />
                <div className="dateRange" style={{ left: `calc(${leftStart}% )`, width: `${leftEnd - leftStart}%` }}></div>
                <div className="singleDate middleEnd" style={{ left: `calc(${leftEnd}% - 5px) ` }} />
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
            <br />
            <br />
            Date in betewwn
            <input
                type="date"
                value={toHTMLInputDate(addDaysToDate(middleStartDate))}
                min={toHTMLInputDate(addDaysToDate(startDate))}
                max={toHTMLInputDate(endDate)}
                onChange={middleStartDateRangeHandler}
            />
            <input
                type="date"
                value={toHTMLInputDate(middleEndDate)}
                min={toHTMLInputDate(addDaysToDate(startDate))}
                max={toHTMLInputDate(endDate)}
                onChange={middleEndDateRangeHandler}
            />
            <div style={{ width: "50%" }}>
                <div className="dateBar">
                    <div className="singleDate" style={{ left: "calc(0% - 5px)" }}></div>
                    <div className="singleDate" style={{ left: "calc(100% - 5px)" }}></div>
                    {calcRegularIntervals(startDate, endDate, count).map(drawMiddleRange)}
                </div>
            </div>
            {calcLeft(countDaysInBetween(startDate, endDate), countDaysInBetween(startDate, middleEndDate))}
            {calcLeft(countDaysInBetween(startDate, endDate), countDaysInBetween(startDate, middleStartDate))}
            Hay una diferencia de: {countDaysInBetween(startDate, endDate)} dias
            <br />
            <br />
            {calcRegularIntervals(startDate, endDate, count).map((ob) => (
                <div key={`yes${ob}`}>
                    Inicio: <div>{showFormattedDate(ob.middleStart)}</div>
                    Fin: <div>{showFormattedDate(ob.middleEnd)}</div>
                    <hr />
                </div>
            ))}
        </Fragment>
    );
};
