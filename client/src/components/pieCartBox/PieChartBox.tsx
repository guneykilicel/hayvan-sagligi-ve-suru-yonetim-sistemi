import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const backendData = [
  { name: "Dişi Büyükbaş", value: 400 },
  { name: "Erkek Büyükbaş", value: 300 },
  { name: "Dişi Küçükbaş", value: 300 },
  { name: "Erkek Küçükbaş", value: 200 },
];

// Backend tarafından belirlenen renkler
const backendColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const backendNames = ["Dişi Büyükbaş", "Erkek Büyükbaş", "Dişi Küçükbaş", "Erkek Küçükbaş"];


const PieChartBox = () => {

  const { user } = useContext(AuthContext);

  const { isLoading, data } = useQuery({
    queryKey: ["getAnimalPieStatistics"],
    queryFn: () =>
      fetch(`http://localhost:5000/farmer/${user.farmerTC}/getAnimalPieStatistics`).then(
        (res) => res.json()
      ),
  });

  // animalStatistics veri yapısını pie chart veri yapısına dönüştürme
  const transformData = () => {
    const animalStatistics = data;

    if (!animalStatistics) return [];

    const dataKeys = Object.keys(animalStatistics);
    const transformedData = dataKeys.map((key, index) => ({
      name: backendNames[index],
      value: animalStatistics[key],
      color: backendColors[index], // Renkleri backendColors dizisinden alabilirsiniz
    }));

    return transformedData;
  };

  const dataWithColors = transformData();

  return (
    <div className="pieChartBox">
      <h1>Çiftlik Dağılımım</h1>
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

export default PieChartBox;
