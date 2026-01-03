"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import CalorieIntakePopup from "../../../components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import { usePathname } from "next/navigation";

import {
  Datepicker,
  DatepickerEvent,
} from "@meinefinsternis/react-horizontal-date-picker";
import { enUS } from "date-fns/locale";
import { title } from "process";
// import { title } from "process";

const page = () => {
  const color = "#ffc20e";
  const pathname = usePathname();
  console.log(pathname);

  // const pathname = usePathname();
  // console.log(pathname);

  const chartsParams = {
    height: 400,
    margin: { top: 15, bottom: 50, left: 60, right: 15 },
    sx: {
      "& .MuiChartsAxis-line": {
        stroke: "rgba(255, 194, 14, 0.4)",
      },
      "& .MuiChartsAxis-tick": {
        stroke: "rgba(255, 194, 14, 0.4)",
      },
      "& .MuiChartsAxis-tickLabel": {
        fill: "#ffc20e !important",
        fontWeight: 400,
      },
      "& .MuiChartsAxis-label": {
        fill: "#ffc20e !important",
        fontWeight: 500,
        fontSize: "13px",
      },
      "& .MuiChartsLegend-series text": {
        fill: "#ffc20e !important",
        fontWeight: 500,
      },
      "& .MuiChartsGrid-line": {
        stroke: "rgba(255, 194, 14, 0.08)",
      },
    },
  };

  const [dataS1, setDataS1] = React.useState<any>(null);

  const [showCalorieIntakePopup, setShowCalorieIntakePopup] =
    React.useState<boolean>(false);

  const getDataForS1 = async () => {
    if (pathname == "/report/Calorie%20Intake") {
      fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/calorieintake/getcalorieintakebylimit",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ limit: 10 }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            let temp = data.data.map((item: any) => {
              return {
                date: item.date,
                value: item.calorieIntake,
                unit: "kcal",
              };
            });

            let dataForLineChart = temp.map((item: any) => {
              return parseInt(item.value);
            });
            let dataForXAxis = temp.map((item: any) => {
              let val = new Date(item.date);
              return val;
            });

            setDataS1({
              data: dataForLineChart,
              title: "Calorie Intake (kcal)",
              color: color,
              xAxis: {
                data: dataForXAxis,
                label: "Date",
                scaleType: "point",
              },
            });
          } else {
            setDataS1([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let temp = [
        {
          date: "Thu Sep 28 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 2000,
          unit: "kcal",
        },
        {
          date: "Wed Sep 27 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 2500,
          unit: "kcal",
        },
        {
          date: "Tue Sep 26 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 2700,
          unit: "kcal",
        },
        {
          date: "Mon Sep 25 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 3000,
          unit: "kcal",
        },
        {
          date: "Sun Sep 24 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 2000,
          unit: "kcal",
        },
        {
          date: "Sat Sep 23 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 2300,
          unit: "kcal",
        },
        {
          date: "Fri Sep 22 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 2500,
          unit: "kcal",
        },
        {
          date: "Thu Sep 21 2023 20:30:30 GMT+0530 (India Standard Time)",
          value: 2700,
          unit: "kcal",
        },
      ];
      let dataForLineChart = temp.map((item: any) => {
        return parseInt(item.value);
      });
      let dataForXAxis = temp.map((item: any) => {
        let val = new Date(item.date);
        return val;
      });
      setDataS1({
        data: dataForLineChart,
        title: "Calorie Intake (kcal)",
        color: color,
        xAxis: {
          data: dataForXAxis,
          label: "Date",
          scaleType: "point",
        },
      });
    }
  };

  React.useEffect(() => {
    getDataForS1();
  }, []);

  return (
    <div className="reportpage">
      <div className="chartContainer">
        <h2 className="chartTitle">Calorie Intake</h2>
        {dataS1 && dataS1.data && dataS1.data.length > 0 ? (
          <LineChart
            xAxis={[
              {
                id: "Day",
                data: dataS1.xAxis.data,
                scaleType: dataS1.xAxis.scaleType,
                label: dataS1.xAxis.label,
                valueFormatter: (date: any) => {
                  const d = new Date(date);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                },
              },
            ]}
            series={[
              {
                data: dataS1.data,
                label: dataS1.title,
                color: dataS1.color,
                curve: "monotoneX",
                showMark: true,
                area: true,
              },
            ]}
            grid={{ vertical: false, horizontal: true }}
            {...chartsParams}
          />
        ) : (
          <div className="noData">
            No calorie intake data available. Add your first entry!
          </div>
        )}
      </div>

      <button
        className="editbutton"
        onClick={() => {
          if (pathname == "/report/Calorie%20Intake") {
            setShowCalorieIntakePopup(true);
          } else {
            alert("show popup for other reports");
          }
        }}
      >
        <AiFillEdit />
      </button>
      {showCalorieIntakePopup && (
        <CalorieIntakePopup
          setShowCalorieIntakePopup={setShowCalorieIntakePopup}
        />
      )}
    </div>
  );
};

export default page;
