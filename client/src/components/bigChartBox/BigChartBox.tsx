import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";
import { format } from "date-fns";


type Props = {
  bigChartDataTitle: string;
  monthlyTotalFeeding?: [{
    date: string;
    totalFeeding?: {
      dryHerbMixture: number,
      herbSilage: number,
      cornSilage: number,
      barley: number,
      forage: number,
      price: number,
    }
  }];
};

const BigChartBox = (props: Props) => {


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM'); // Tarih formatını istediğiniz şekilde ayarlayabilirsiniz
  };


  return (
    <div className="bigChartBox">
      <h1>{props.bigChartDataTitle}</h1>
      <div className="chart">
        {props.monthlyTotalFeeding &&
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart
              data={props.monthlyTotalFeeding}
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
                dataKey="totalFeeding.dryHerbMixture"
                name="Kuru Ot Karışımı"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="totalFeeding.herbSilage"
                name="Ot Silajı"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="totalFeeding.cornSilage"
                name="Mısır Silajı"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
              <Area
                type="monotone"
                dataKey="totalFeeding.barley"
                name="Arpa"
                stackId="1"
                stroke="#52df5a"
                fill="#52df5a"
              />
              <Area
                type="monotone"
                dataKey="totalFeeding.forage"
                name="Yem"
                stackId="1"
                stroke="#ee56ca"
                fill="#ee56ca"
              />
            </AreaChart>
          </ResponsiveContainer>
        }
      </div>
    </div>
  );
};

export default BigChartBox;
