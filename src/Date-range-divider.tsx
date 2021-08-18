import React, { FC, useEffect } from "react";
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
    onDivisionsChange: (intervals: IMiddleDateInterval[]) => void;
}

export const DateRangeDivider: FC<DataRangeDividerProps> = (props: DataRangeDividerProps) => {
    const errorOnArgs = () => {
        const today = convertDateToBeginnigOfDate(new Date());
        const todayLater = converDateToEndOfDay(today);
        return calcRegularIntervals(today, todayLater, 1);
    };

    useEffect(() => {
        const intervals = calcIntervals();
        props.onDivisionsChange(intervals);
    }, [props.divisions]);

    const calcIntervals = () => {
        let intervals = [];
        try {
            const start = convertDateToBeginnigOfDate(new Date(props.startDate));
            const end = converDateToEndOfDay(new Date(props.endDate));
            if (props.divisions > 0 && isMoreInTheFuture(start, end)) {
                intervals = calcRegularIntervals(start, end, props.divisions);
            } else {
                intervals = errorOnArgs();
            }
        } catch (error) {
            console.warn(error);
            intervals = errorOnArgs();
        }

        return intervals;
    };

    const drawMiddleRange = ({ start, end }: IMiddleDateInterval) => {
        const startDate = convertDateToBeginnigOfDate(props.startDate);
        const endDate = converDateToEndOfDay(props.endDate);
        const daysBetweenOfStart = countDaysInBetween(startDate, start);
        const daysBetweenOfEnd = countDaysInBetween(startDate, end);
        const leftStart = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfStart);
        const leftEnd = calcLeft(countDaysInBetween(startDate, endDate), daysBetweenOfEnd);
        return (
            <div key={`${start}- ${end}`}>
                <ReactTooltip />
                <div
                    data-tip={`${showFormattedDate(start)}`}
                    style={{ ...cssStyles.singleDate, ...cssStyles.middleStart, left: `${leftStart}%` }}
                />
                <div
                    data-tip={`${showFormattedDate(start)} - ${showFormattedDate(end)} `}
                    style={{
                        ...cssStyles.dateRange,
                        left: `${leftStart}% `,
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

    return <div style={{ ...cssStyles.datebar }}>{calcIntervals().map(drawMiddleRange)}</div>;
};
