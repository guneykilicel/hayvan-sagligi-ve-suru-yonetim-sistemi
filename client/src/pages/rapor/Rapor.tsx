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

import { IconButton } from "@mui/material";
import PieChartShape from "../../components/pieChartShape/PieChartShape";
import SettingsIcon from '@mui/icons-material/Settings';
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import PieChartBoxLaktasyon from "../../components/pieCartBoxLaktasyon/PieChartBoxLaktasyon";

import "./rapor.scss";
import BarChartYield from "../../components/barChartYield/BarChartYield";

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


const kuruSagmalData = [
    { name: "Kuru", value: 5 },
    { name: "Sağmal", value: 47 },
];
const kuruSagmalColors = ["#a98467", "#adc178"];
const kuruSagmalNames = ["Kuru", "Sağmal"];
const kuruSagmalTitle = "Kuru ve Sağmal";


const dusukYuksekData = [
    { name: "Düşük", value: 18 },
    { name: "Yüksek", value: 29 },
];
const dusukYuksekColors = ["#591f0a", "#f09d51"];
const dusukYuksekNames = ["Düşük", "Yüksek"];
const dusukYuksekTitle = "Grup Dağılımları";

const toplamSutData = [
    { name: "Düşüklerden", value: 230 },
    { name: "Yükseklerde", value: 620 },
];
const toplamSutColors = ["#084c61", "#177e89"];
const toplamSutNames = ["Düşüklerden", "Yükseklerden"];
const toplamSutTitle = "Toplam Süt Verimi";



const Rapor = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="rapor">
            <div className="view">
                <div className="info-and-pie">
                    <div className="info">
                        <div className="topInfo">
                            <h1>Rapor</h1>
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
                        <h1>Laktasyon</h1>
                    </div>
                    <div className="chart-content">
                        <div className="chart">
                            <PieChartBoxLaktasyon data={kuruSagmalData} colors={kuruSagmalColors} names={kuruSagmalNames} title={kuruSagmalTitle} />
                        </div>
                        <div className="chart">
                            <PieChartBoxLaktasyon data={dusukYuksekData} colors={dusukYuksekColors} names={dusukYuksekNames} title={dusukYuksekTitle} />
                        </div>
                        <div className="chart">
                            <PieChartBoxLaktasyon data={toplamSutData} colors={toplamSutColors} names={toplamSutNames} title={toplamSutTitle} />
                        </div>
                    </div>
                </div>

                <div className="charts">
                    <div className="chart-header">
                        <h1>Hayvan Dağılımlarım</h1>
                    </div>
                    <div className="chart-content">
                        <div className="chart">
                            <h2>Dişi Hayvan Dağılımım</h2>
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
                                    <Bar dataKey="pe" fill="#95d5b2" name="Dişi (0-90gün)" />
                                    <Bar dataKey="pw" fill="#74c69d" name="Dişi (91-271gün)" />
                                    <Bar dataKey="pq" fill="#52b788" name="Dişi (271-365gün)" />
                                    <Bar dataKey="uv" fill="#40916c" name="Dişi (366-450gün)" />
                                    <Bar dataKey="pv" fill="#2d6a4f" name="Dişi (>450gün)" />

                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart">
                            <h2>Erkek Hayvan Dağılımım</h2>
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
                                    <Bar dataKey="pe" fill="#95d5b2" name="Erkek (0-90gün)" />
                                    <Bar dataKey="pw" fill="#74c69d" name="Erkek (91-271gün)" />
                                    <Bar dataKey="pq" fill="#52b788" name="Erkek (271-365gün)" />
                                    <Bar dataKey="uv" fill="#40916c" name="Erkek (366-450gün)" />
                                    <Bar dataKey="pv" fill="#2d6a4f" name="Erkek (>450gün)" />

                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="charts">
                    <div className="chart-header">
                        <h1>İneklerin Verim Dağılımı</h1>
                    </div>
                    <div className="chart-content">
                        <div className="chart">
                            <h2>Laktasyon Dağılımı (lt)</h2>
                            <BarChartYield />
                        </div>
                        <div className="chart">
                            <h2>Kilo Dağılımı (kg)</h2>
                            <BarChartYield />
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
                        <h1>Üreme Durumları</h1>
                        <h2>Atılan Tohum: 85</h2>
                    </div>
                    <div className="chart-content">
                        <div className="chart">
                            <h2>Anaçlar</h2>
                            <PieChartShape data={dataPieChartShapeAnac} />
                        </div>
                        <div className="chart">
                            <h2>Genç Dişiler</h2>
                            <PieChartShape data={dataPieChartShapeGenc} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Rapor;
