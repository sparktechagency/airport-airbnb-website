"use client";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { DatePicker } from "antd";

const Calender = ({
  unavailableDay,
  setDate,
  selectedDate = []
}: {
  unavailableDay: string[];
  setDate: any;
  selectedDate?: string[];
}) => {
  const [value, setValue] = useState<Dayjs[]>([dayjs()]); 

  const disabledDate = (date: Dayjs): boolean => {
    return unavailableDay?.some((d: string) =>
      dayjs(date).isSame(dayjs(d), "day")
    );
  };

  // const changeMonth = (direction: "prev" | "next") => {
  //   const newValue =
  //     direction === "prev" ? value.subtract(1, "month") : value.add(1, "month");
  //   setValue(newValue);
  // };

  // const changeYear = (direction: "prev" | "next") => {
  //   const newValue =
  //     direction === "prev" ? value.subtract(1, "year") : value.add(1, "year");
  //   setValue(newValue);
  // };

  useEffect(() => {
    if(selectedDate.length > 0){
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

export default Calender;

//  <Calendar
//         value={value}
//         onPanelChange={(date) => setValue(date)}
//         fullscreen={false}
//         disabledDate={disabledDate}
//         onChange={(date) => {
//           setDate(dayjs(date).format(""));
//           setValue(date);
//         }}

//         headerRender={() => {
//           return (
//             <div className="flex items-center justify-between py-3 px-4 ">
//               {/* Month Controls */}
//               <div className="flex items-center space-x-4">
//                 <LeftOutlined
//                   className="cursor-pointer"
//                   onClick={() => changeMonth("prev")}
//                 />
//                 <p className="text-[#333333] text-[16px] leading-6 font-semibold">
//                   {dayjs(value).format("MMMM")} {/* Only month name */}
//                 </p>
//                 <RightOutlined
//                   className="cursor-pointer"
//                   onClick={() => changeMonth("next")}
//                 />
//               </div>
//               {/* Year Controls */}
//               <div className="flex items-center space-x-4">
//                 <LeftOutlined
//                   className="cursor-pointer"
//                   onClick={() => changeYear("prev")}
//                 />
//                 <p className="text-[#333333] text-[16px] leading-6 font-semibold">
//                   {dayjs(value).format("YYYY")} {/* Only year */}
//                 </p>
//                 <RightOutlined
//                   className="cursor-pointer"
//                   onClick={() => changeYear("next")}
//                 />
//               </div>
//             </div>
//           );
//         }}
//       />
