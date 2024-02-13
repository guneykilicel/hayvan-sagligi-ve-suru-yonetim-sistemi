import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

import "./pieChartBoxLaktasyon.scss";

interface PieChartBoxProps {
  data: { name: string; value: number }[];
  colors: string[];
  names: string[];
  title: string
}

const PieChartBoxLaktasyon: React.FC<PieChartBoxProps> = ({ data, colors, names, title }) => {
  const transformData = () => {
    if (!data) return [];

    const transformedData = names.map((name, index) => ({
      name: name,
      value: data[index].value,
      color: colors[index],
    }));

    return transformedData;
  };

  const dataWithColors = transformData();

  return (
    <div className="pieChartBox">
      <h2>{title}</h2>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
            <Pie
              data={dataWithColors}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {dataWithColors.map((item, index) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {dataWithColors.map((item, index) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBoxLaktasyon;
