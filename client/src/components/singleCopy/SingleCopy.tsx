import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from 'date-fns';

import "./singleCopy.scss";

type Props = {
  id: string;
  earTagNumber: string;
  farmNumber: string;
  ownerTC: string;
  breed: string;
  gender: string;
  birthDate: Date;
  status: string;
  weight: number;
  group: string;
  dailyMilkYieldLt: {
    date: Date;
    yieldLt: number;
  }[];
  pregnancyStatus: boolean;
  lastInseminationDate: Date;
  numberOfInsemination: number;
  dryShippingDate: Date;
  transitionToTheDeliveryRoomDate: Date;
  lastBirthDate: Date;
  numberOfBirths: number;
  mayBeSick: boolean;
  profitAndLoss: number;
  offspring: string[];
  vaccinationSchedule: {
    month: number;
    vaccine: string;
    description: string;
  }[];
  dataKeys: {
    name: string;
    color: string;
  }[];
};

const SingleCopy = (props: Props) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MM-dd'); // Tarih formatını istediğiniz şekilde ayarlayabilirsiniz
  };

  const formatDateContent = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR'); // 'tr-TR' Türkçe için locale kodudur, dil kodunu değiştirebilirsiniz
  };


  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{props.earTagNumber}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            <div>
              <p>Küpe Numarası: {props.earTagNumber}</p>
              <p>Çiftlik Numarası: {props.farmNumber}</p>
              <p>Hayvan Sahibi TC: {props.ownerTC}</p>
              <p>Hayvan Irkı: {props.breed}</p>
              <p>Hayvan Cinsiyeti: {props.gender}</p>
              <p>Doğum Tarihi: {props.birthDate ? formatDateContent(props.birthDate) : "Belirtilmemiş"}</p>
              <p>Durumu: {props.status}</p>
              <p>Ağırlık: {props.weight}</p>
              <p>Grup: {props.group}</p>
              <p>Gebelik Durumu: {props.pregnancyStatus ? "Gebeliği var" : "Gebeliği yok"}</p>
              <p>Son Tohumlama Tarihi: {props.lastInseminationDate ? formatDateContent(props.lastInseminationDate) : "Belirtilmemiş"}</p>
              <p>Tohumlama Sayısı: {props.numberOfInsemination}</p>
              <p>Kuruya Alım Tarihi: {props.dryShippingDate ? formatDateContent(props.dryShippingDate) : "Belirtilmemiş"}</p>
              <p>Doğuma Geçiş Tarihi: {props.transitionToTheDeliveryRoomDate ? formatDateContent(props.transitionToTheDeliveryRoomDate) : "Belirtilmemiş"}</p>
              <p>Son Doğum Tarihi: {props.lastBirthDate ? formatDateContent(props.lastBirthDate) : "Belirtilmemiş"}</p>
              <p>Doğum Sayısı: {props.numberOfBirths}</p>
              <p>Hasta Olabilir Mi: {props.mayBeSick ? "Evet" : "Hayır"}</p>
              <p>Gelir/Gider: {props.profitAndLoss}</p>
              <p>Yavrular: {props.offspring ? props.offspring.join(", ") : "Yok"}</p>
              <p>Kurudaki günü: </p>
              <p>Sütteki günü: </p>
              <p>Hayvanınız gebe oldu mu?</p>
              <p>Kuruya almanın zamanı geldi!</p>
              <p>Sağmal sezon zamanı!</p>

              

            </div>
            {/* {Object.entries(props.info).map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))} */}
          </div>
        </div>
        <hr />
        {props.dailyMilkYieldLt && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.dailyMilkYieldLt}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" tickFormatter={(date) => formatDate(date)} />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                    name="Günlük Süt"
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        <p>Aşı Programı:</p>

              {props.vaccinationSchedule && (
                <ul>
                  {props.vaccinationSchedule.map((vaccine, index) => (
                    <li key={index}>
                      <div>
                      <p>Aşı Adı: {vaccine.vaccine}</p>
                      {/* <p>Aşı Durumu: {vaccine.vaccinationStatus ? "Yapıldı" : "Yapılmadı"}</p> */}
                      {/* <p>Aşı Başlangıç Tarihi: {vaccine.vaccinationStartTime ? formatDateContent(vaccine.vaccinationStartTime) : "Belirtilmemiş"}</p> */}
                      <p>Aşı Başlangıç Tarihi: {vaccine.month}</p>

                      <p>Aşı Açıklaması: {vaccine.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
        {/* {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default SingleCopy;
