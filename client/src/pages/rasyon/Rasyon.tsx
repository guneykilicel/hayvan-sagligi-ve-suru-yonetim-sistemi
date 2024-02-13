import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { singleUser } from "../../data";
import BigChartBoxProfile from "../../components/bigChartBoxProfile/BigChartBoxProfile";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Button, IconButton, Stepper } from "@mui/material";
import PieChartShape from "../../components/pieChartShape/PieChartShape";
import SettingsIcon from '@mui/icons-material/Settings';
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import "./rasyon.scss";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import LinearStepper from "../../components/stepper/Stepper";

const data = [
    {
        name: 'Page A',
        uv: 5,
        pv: 8,
        pq: 13,
        pw: 12,
        pe: 17,
        amt: 24,
    }
];


const dataPieChartShapeAnac = [
    { name: 'Gebe', value: 23 },
    { name: 'Tohumlandı', value: 10 },
    { name: 'Boş', value: 7 },
    { name: 'Taze', value: 6 },
    { name: 'Tohumlamada', value: 4 },
];

const dataPieChartShapeGenc = [
    { name: 'Gebe', value: 12 },
    { name: 'Tohumlandı', value: 8 },
    { name: 'Boş', value: 10 },
    { name: 'Taze', value: 2 },
    { name: 'Tohumlamada', value: 3 },
];


  
const Rasyon = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="rasyon">
            <div className="view">
                <div className="info-and-pie">
                    <div className="info">
                        <div className="topInfo">
                            <h1 style={{marginBottom:'10px'}}>Rasyon</h1>
                            <div className="topContent">
                            <span >Aylık sarfiyatını aldın mı? </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* {singleUser.chart && (
              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={singleUser.chart.data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {singleUser.chart.dataKeys.map((dataKey) => (
                      <Line
                        type="monotone"
                        dataKey={dataKey.name}
                        stroke={dataKey.color}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )} */}
                <div className="charts">
                    <div className="chart-header">
                        <h1>Gruplara Göre Yem Sarfiyatım</h1>
                    </div>
                    <div className="chart-content">
                        <div className="chart">
                            <BigChartBoxProfile feeding={user.feeding} bigChartDataTitle="Yüksek Grup Yem Sarfiyatım" chartType="milch" />
                        </div>
                        <div className="chart">
                            <BigChartBoxProfile feeding={user.feeding} bigChartDataTitle="Düşük Grup Yem Sarfiyatım" chartType="others" />
                        </div>
                    </div>
                </div>
                <div className="charts">
                    <div className="big-chart-content">
                        <div className="chart">
                        <BigChartBox monthlyTotalFeeding={user.monthlyTotalFeeding} bigChartDataTitle="Aylık Yem Sarfiyatım"/>
                        </div>
                    </div>
                </div>

                {/* <div className="barChart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
                  labelStyle={{ display: "none" }}
                  cursor={{ fill: "none" }} />
                <Legend />
                <Bar dataKey="pv" fill="#005912" name="Dişi (>450gün)" />
                <Bar dataKey="uv" fill="#00941e" name="Dişi (366-450gün)" />
                <Bar dataKey="pq" fill="#00db2c" name="Dişi (271-365gün)" />
                <Bar dataKey="pw" fill="#6edb00" name="Dişi (91-271gün)" />
                <Bar dataKey="pe" fill="#9adb00" name="Dişi (0-90gün)" />
  
              </BarChart>
            </ResponsiveContainer>
          </div> */}
            </div>
            <div className="activities">
                <div className="charts">
                    <div className="chart-header">
                        <h2>Aylık Sarfiyat Girişi</h2>
                    </div>
                    <div className="chart-content">
                      <LinearStepper />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rasyon;
