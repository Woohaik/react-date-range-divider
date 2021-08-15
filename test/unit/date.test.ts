import {
    addDaysToDate,
    calcRegularIntervals,
    converDateToEndOfDay,
    convertDateToBeginnigOfDate,
    countDaysInBetween,
    getDateElements,
    isMoreInTheFuture,
    setAlwaysZeroBeforeDate,
    toHTMLInputDate,
} from "../../src/utils/Date";

describe("All Date Test", () => {
    describe("Function with comparations between other dates", () => {
        describe("isMoreInTheFuture", () => {
            it("Should return false for a date that is past but past", () => {
                const isFutureButNotReally = new Date("2020-05-01");
                const isPastButNotReally = new Date("2020-06-01");
                const isMoreFuture = isMoreInTheFuture(isPastButNotReally, isFutureButNotReally);
                expect(isMoreFuture).toBe(false);
            });
            it("Should return true for a date that is actually more in the future than other", () => {
                const imReallyFuture = new Date("2021-05-01");
                const imReallyPast = new Date("2020-06-01");
                const isMoreFuture = isMoreInTheFuture(imReallyPast, imReallyFuture);
                expect(isMoreFuture).toBe(true);
            });
            it("Should return false for same date", () => {
                const oneDatelol = new Date();
                const isMoreFuture = isMoreInTheFuture(oneDatelol, oneDatelol);
                expect(isMoreFuture).toBe(false);
            });
        });
    });

    describe("Functions with some calc", () => {
        describe("countDaysInBetween", () => {
            it("Should count 1 to days in same day (beggining - end pattern)", () => {
                const begging = convertDateToBeginnigOfDate(new Date("1/5/2020 10:14:05"));
                const end = converDateToEndOfDay(new Date("1/5/2020 10:14:05"));
                const days = countDaysInBetween(begging, end);
                expect(days).toBe(1);
            });

            it("Should count n + 1to rest of days diference (beggining - end pattern)", () => {
                const begging = convertDateToBeginnigOfDate(new Date("1/5/2020 10:14:05"));
                const end = converDateToEndOfDay(new Date("1/6/2020 10:14:05"));
                const days = countDaysInBetween(begging, end);
                expect(days).toBe(2);
            });

            it("Should count n + 1to rest of days diference (beggining - end pattern) 2 ", () => {
                const begging = convertDateToBeginnigOfDate(new Date("1/1/2020 10:14:05"));
                const end = converDateToEndOfDay(new Date("1/8/2020 10:14:05"));
                const days = countDaysInBetween(begging, end);
                expect(days).toBe(8);
            });
        });

        describe("convertDateToBeginnigOfDate", () => {
            it("Should remove all hours and minutos from a given date", () => {
                const theDate = convertDateToBeginnigOfDate(new Date("1/5/2020 10:14:05"));
                const { day, hour, minutes, month, seconds, year } = getDateElements(theDate);
                expect(seconds).toBe("00");
                expect(minutes).toBe("00");
                expect(hour).toBe("00");
                expect(day).toBe("05");
                expect(month).toBe("01");
                expect(year).toBe("2020");
            });

            it("Should do nothing with a day already having 0 0 0 0", () => {
                const theDate = convertDateToBeginnigOfDate(new Date("1/5/2020 00:00:00:00"));
                const { day, hour, minutes, month, seconds, year } = getDateElements(theDate);
                expect(seconds).toBe("00");
                expect(minutes).toBe("00");
                expect(hour).toBe("00");
                expect(day).toBe("05");
                expect(month).toBe("01");
                expect(year).toBe("2020");
            });
        });

        describe("converDateToEndOfDay", () => {
            it("Should do nothing with a day already having 23 59 59", () => {
                const theDate = converDateToEndOfDay(new Date("1/5/2020 23:59:59:00"));
                const { day, hour, minutes, month, seconds, year } = getDateElements(theDate);
                expect(seconds).toBe("59");
                expect(minutes).toBe("59");
                expect(hour).toBe("23");
                expect(day).toBe("05");
                expect(month).toBe("01");
                expect(year).toBe("2020");
            });

            it("Should add to a imcomplite day", () => {
                const theDate = converDateToEndOfDay(new Date("1/5/2020 10:14:00:00"));
                const { day, hour, minutes, month, seconds, year } = getDateElements(theDate);
                expect(seconds).toBe("59");
                expect(minutes).toBe("59");
                expect(hour).toBe("23");
                expect(day).toBe("05");
                expect(month).toBe("01");
                expect(year).toBe("2020");
            });

            it("Should add to a imcomplite day converted before to biggining", () => {
                const theDate = converDateToEndOfDay(convertDateToBeginnigOfDate(new Date("1/5/2020 10:14:00:00")));
                const { day, hour, minutes, month, seconds, year } = getDateElements(theDate);
                expect(seconds).toBe("59");
                expect(minutes).toBe("59");
                expect(hour).toBe("23");
                expect(day).toBe("05");
                expect(month).toBe("01");
                expect(year).toBe("2020");
            });
        });

        describe("calcRegularIntervals", () => {
            const startDate = new Date("1/5/2020 00:00:00");
            const dates = {
                sameDay: {
                    end: new Date("1/5/2020 23:59:59.999"),
                },
                oneDay: {
                    end: new Date("1/6/2020 23:59:59.999"),
                },
                moreDays: {
                    end: new Date("1/8/2020 23:59:59.999"),
                },
            };
            it("If the numbers of days is lower than periods wanted return just one", () => {
                const intervalsSameDay = calcRegularIntervals(startDate, dates.sameDay.end, 10);
                const intervalsOneDay = calcRegularIntervals(startDate, dates.oneDay.end, 10);
                const intervalsMoreDays = calcRegularIntervals(startDate, dates.moreDays.end, 10);
                expect(intervalsOneDay.length).toBe(1);
                expect(intervalsSameDay.length).toBe(1);
                expect(intervalsMoreDays.length).toBe(1);
                expect(intervalsSameDay[0].start).toEqual(startDate);
                expect(intervalsOneDay[0].start).toEqual(startDate);
                expect(intervalsMoreDays[0].start).toEqual(startDate);
                expect(intervalsSameDay[0].end).toEqual(dates.sameDay.end);
                expect(intervalsOneDay[0].end).toEqual(dates.oneDay.end);
                expect(intervalsMoreDays[0].end).toEqual(dates.moreDays.end);
            });

            it("The periods can be divided and do it two equals in lenght", () => {
                const intervalsOneDay = calcRegularIntervals(startDate, dates.oneDay.end, 2);
                expect(intervalsOneDay.length).toBe(2);
                expect(intervalsOneDay[0].start).toEqual(startDate);
                expect(intervalsOneDay[0].end).toEqual(converDateToEndOfDay(startDate));

                expect(intervalsOneDay[1].start).toEqual(addDaysToDate(startDate));
                expect(intervalsOneDay[1].end).toEqual(dates.oneDay.end);
            });
        });
    });

    describe("Printable Functions", () => {
        describe("getDateElements", () => {
            it("Get the printable values of a date with exact day 0,0,0,0", () => {
                const theDate = new Date("1/5/2020 00:00:00");
                const { day, hour, minutes, month, seconds, year } = getDateElements(theDate);
                expect(seconds).toBe("00");
                expect(minutes).toBe("00");
                expect(hour).toBe("00");
                expect(day).toBe("05");
                expect(month).toBe("01");
                expect(year).toBe("2020");
            });

            it("Get the printable values of a date with some hours", () => {
                const theDate = new Date("2/7/2021 11:07:14");
                const { day, hour, minutes, month, seconds, year } = getDateElements(theDate);
                expect(seconds).toBe("14");
                expect(minutes).toBe("07");
                expect(hour).toBe("11");
                expect(day).toBe("07");
                expect(month).toBe("02");
                expect(year).toBe("2021");
            });
        });
        describe("setAlwaysZeroBeforeDate", () => {
            it("Should set a 0 before the number if is lower than 10", () => {
                const s9 = setAlwaysZeroBeforeDate(9);
                const s2 = setAlwaysZeroBeforeDate(2);
                expect(s9).toBe("09");
                expect(s2).toBe("02");
            });

            it("Should stay the same if higher than 9", () => {
                const s10 = setAlwaysZeroBeforeDate(10);
                const s15 = setAlwaysZeroBeforeDate(15);
                expect(s10).toBe("10");
                expect(s15).toBe("15");
            });
        });

        describe("toHTMLInputDate", () => {
            it("Should return a string date the HTML input element can understand", () => {
                const htmlDate = toHTMLInputDate(new Date("2020-05-01"));
                expect(htmlDate).toBe("2020-05-01");
            });
        });
    });
});
