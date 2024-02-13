
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

import "./barChartYield.scss";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const colors = ['#01497c', '#014f86', '#2a6f97', '#2c7da0', '#468faf', '#61a5c2'];

interface DataItem {
    name: string;
    uv: number;
}

const data: DataItem[] = [
    {
        name: '<10',
        uv: 3
    },
    {
        name: '10-15',
        uv: 12,
    },
    {
        name: '15-20',
        uv: 17,
    },
    {
        name: '20-25',
        uv: 11,
    },
    {
        name: '25-30',
        uv: 3,
    },
    {
        name: '>30',
        uv: 1,
    },
];

const getPath = (x: number, y: number, width: number, height: number): string => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

interface TriangleBarProps {
    fill: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const TriangleBar: React.FC<TriangleBarProps> = ({ fill, x, y, width, height }) => {
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const BarChartYield = () => {

    return (
        <div className="barChartYield">
            <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartYield;
