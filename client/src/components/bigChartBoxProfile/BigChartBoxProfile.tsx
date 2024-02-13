import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

type Props = {
  bigChartDataTitle: string;
  monthlyTotalFeeding?: {
    date: string;
    totalFeeding?: {
      dryHerbMixture: number;
      herbSilage: number;
      cornSilage: number;
      barley: number;
      forage: number;
      price: number;
    };
  }[];

  feeding?: {
    date: string;
    milch: {
      dryHerbMixture: number;
      herbSilage: number;
      cornSilage: number;
      barley: number;
      forage: number;
      price: number;
    };
    others: {
      dryHerbMixture: number;
      herbSilage: number;
      cornSilage: number;
      barley: number;
      forage: number;
      price: number;
    };
  }[];

  chartType: "total" | "milch" | "others";
};

const BigChartBox = (props: Props) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM');
  };

  const getDataKey = (chartType: string, category: string) => {
    switch (chartType) {
      case "total":
        return `totalFeeding.${category}`;
      case "milch":
        return `milch.${category}`;
      case "others":
        return `others.${category}`;
      default:
        return "";
    }
  };

  const getData = () => {
    if (props.chartType === "total") {
      return props.monthlyTotalFeeding || [];
    } else {
      return props.feeding || [];
    }
  };

  return (
    <div className="bigChartBox">
      <h2>{props.bigChartDataTitle}</h2>
      <div className="chart">
        {getData().length > 0 && (
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart
              data={getData()}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="date" tickFormatter={(date) => formatDate(date)} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={getDataKey(props.chartType, "dryHerbMixture")}
                name="Kuru Ot Karışımı"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey={getDataKey(props.chartType, "herbSilage")}
                name="Ot Silajı"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey={getDataKey(props.chartType, "cornSilage")}
                name="Mısır Silajı"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
              <Area
                type="monotone"
                dataKey={getDataKey(props.chartType, "barley")}
                name="Arpa"
                stackId="1"
                stroke="#52df5a"
                fill="#52df5a"
              />
              <Area
                type="monotone"
                dataKey={getDataKey(props.chartType, "forage")}
                name="Yem"
                stackId="1"
                stroke="#ee56ca"
                fill="#ee56ca"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BigChartBox;
