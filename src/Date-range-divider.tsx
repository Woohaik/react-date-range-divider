import React, { FC, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import {
    converDateToEndOfDay,
    countDaysInBetween,
    showFormattedDate,
    calcLeft,
    calcRegularIntervals,
    IMiddleDateInterval,
    isMoreInTheFuture,
    convertDateToBeginnigOfDate,
} from "./utils/Date";

const cssStyles = {
    datebar: {
        border: "1px solid black",
        height: "30px",
        width: "100%",
        position: "relative" as const,
    },
    singleDate: {
        position: "absolute" as const,
        height: "36px",
        width: "10px",
        top: "-3px",
        boxSizing: "border-box" as const,
        border: "2px solid #8282824a",
        borderRadius: "5px",
        boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.1)",
    },
    dateRange: {
        zIndex: 1,
        position: "absolute" as const,
        height: "30px",
        backgroundImage: "linear-gradient(to right, rgb(120,120,120) , rgb(200,200,200))",
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

interface DataRangeDividerProps {
    startDate: Date;
    endDate: Date;
    divisions: number;
    onChange: (intervals: IMiddleDateInterval[]) => void;
}

export const DateRangeDivider: FC<DataRangeDividerProps> = (props: DataRangeDividerProps) => {
    const [intervals, setIntervals] = useState<IMiddleDateInterval[]>([]);
    const errorOnArgs = () => {
        const today = convertDateToBeginnigOfDate(new Date());
        const todayLater = converDateToEndOfDay(today);
        setIntervals(() => calcRegularIntervals(today, todayLater, 1));
    };

    useEffect(() => {
        calcIntervals();
        props.onChange(intervals);
    }, [props]);

    const calcIntervals = () => {
        const start = new Date(props.startDate);
        const end = converDateToEndOfDay(new Date(props.endDate));
        if (props.divisions > 0 && isMoreInTheFuture(start, end)) {
            setIntervals(() => calcRegularIntervals(start, end, props.divisions ?? 1));
        } else {
            errorOnArgs();
        }
    };

    const drawMiddleRange = ({ start, end }: IMiddleDateInterval) => {
        const startDate = intervals[0].start;
        const endDate = intervals[intervals.length - 1].end;
        const daysBetweenOfStart = countDaysInBetween(startDate, start);
        const daysBetweenOfEnd = countDaysInBetween(startDate, end);
        const leftStart = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfStart);
        const leftEnd = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfEnd);
        return (
            <div key={`${start}- ${end}`}>
                <ReactTooltip />
                <div
                    data-tip={`${showFormattedDate(start)}`}
                    style={{ ...cssStyles.singleDate, ...cssStyles.middleStart, left: `calc(${leftStart}% )` }}
                />
                <div
                    data-tip={`${showFormattedDate(start)} - ${showFormattedDate(end)} `}
                    style={{
                        ...cssStyles.dateRange,
                        left: `calc(${leftStart}% )`,
                        width: `${leftEnd - leftStart}%`,
                    }}
                />
                <div
                    data-tip={`${showFormattedDate(end)}`}
                    style={{ ...cssStyles.singleDate, ...cssStyles.middleEnd, left: `calc(${leftEnd}% - 5px) ` }}
                />
            </div>
        );
    };

    return <div style={{ ...cssStyles.datebar }}>{intervals.map(drawMiddleRange)}</div>;
};
