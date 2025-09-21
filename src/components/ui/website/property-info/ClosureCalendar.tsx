"use client";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { DatePicker } from "antd";
const ClosureCalendar = ({
    unavailableDay,
    setDate,
    selectedDate = []
}: {
    unavailableDay: string[];
    setDate: (dates: string[]) => void;
    selectedDate?: string[];
}) => {

    const [value, setValue] = useState<Dayjs[]>([dayjs()]);

    const disabledDate = (date: Dayjs): boolean => {
        return unavailableDay?.some((d: string) =>
            dayjs(date).isSame(dayjs(d), "day")
        );
    };

    useEffect(() => {
        if (selectedDate.length > 0) {
            const dates = selectedDate.map(date => dayjs(date));
            setValue(dates);
        }
    }, [selectedDate]);

    return (
            <div>
              <DatePicker
                value={value}
                multiple={true}
                disabledDate={disabledDate}
                onChange={(dates) => {
                  if (Array.isArray(dates)) {
                   const formattedDates = dates.map((date) => {
                      return dayjs(date).format("YYYY-MM-DD");
                    })
                    setDate(formattedDates);
                    setValue(dates);
                  } else {
                    console.log(dayjs(dates).format("YYYY-MM-DD"));
                  }
                }}
              />
            </div>
    );
};

export default ClosureCalendar;