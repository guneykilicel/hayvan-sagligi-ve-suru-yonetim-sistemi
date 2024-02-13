import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { useContext, useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Shipment from "../../components/shipment/Shipment";
import "./Users.scss";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'earTagNumber', headerName: 'Kulak Numarası', width: 120, type: 'string' },
  { field: 'farmNumber', headerName: 'Çiftlik Numarası', width: 120, type: 'string' },
  // { field: 'ownerTC', headerName: 'Hayvan Sahibi TC', width: 200, type: 'string' },
  {
    field: 'animalType',
    headerName: 'Büyükbaş/Küçükbaş',
    width: 150,
    type: 'string',
    valueGetter: (params) => (params.row.animalType ? 'Büyükbaş' : 'Küçükbaş'),
  },
  { field: 'breed', headerName: 'Irk', width: 90, type: 'string' },
  { field: 'gender', headerName: 'Cinsiyet', width: 90, type: 'string', valueGetter: (params) => (params.row.gender ? 'Dişi' : 'Erkek')},
  { field: 'motherEarTagNumber', headerName: 'Anne Kulak No', width: 120, type: 'string' },
  { field: 'fatherEarTagNumber', headerName: 'Baba Kulak No', width: 120, type: 'string' },
  { field: 'birthDate', headerName: 'Doğum Tarihi', width: 100, type: 'date', valueGetter: (params) => new Date(params.row.birthDate) },

  // { field: 'status', headerName: 'Durum', width: 200, type: 'string' },
  { field: 'weight', headerName: 'Ağırlık', width: 90, type: 'number' },
  { field: 'group', headerName: 'Grup', width: 90, type: 'string', valueGetter: (params) => params.row.group == 'true' ? 'Yüksek' : 'Düşük' },
  { field: 'dailyMilkYieldLt.yieldLTt', headerName: 'Günlük Süt(Lt)', width: 110, type: 'number' },
  { field: 'pregnancyStatus', headerName: 'Gebe', width: 50, type: 'boolean' },
  {
    field: 'lastInseminationDate',
    headerName: 'Son Tohumlama Tarihi',
    width: 160,
    type: 'date',
    valueGetter: (params) => {
      // lastInseminationDate değeri bir tarih formatında ise bu değeri döndür
      // Aksi halde değeri boş bir tarih nesnesi olarak döndür
      return params.row.lastInseminationDate ? new Date(params.row.lastInseminationDate) : new Date(0);
    },
  },
  { field: 'numberOfInsemination', headerName: 'Tohumlama Sayısı', width: 130, type: 'number' },
  { field: 'dryShippingDate', headerName: 'Kuruya Alım Tarihi', width: 140, type: 'date' },
  { field: 'transitionToTheDeliveryRoomDate', headerName: 'Doğum Haneye Geçiş Tarihi', width: 200, type: 'date' },
  {
    field: 'lastBirthDate',
    headerName: 'Son Doğum Tarihi',
    width: 140,
    type: 'date',
    valueGetter: (params) => {
      // lastBirthDate değeri bir tarih formatında ise bu değeri döndür
      // Aksi halde değeri boş bir tarih nesnesi olarak döndür
      return params.row.lastBirthDate ? new Date(params.row.lastBirthDate) : new Date(0);
    },
  },
  { field: 'numberOfBirths', headerName: 'Doğurma Sayısı', width: 120, type: 'number' },
  { field: 'mayBeSick', headerName: 'Hasta Olabilir Mi?', width: 120, type: 'boolean' },
  // { field: 'profitAndLoss', headerName: 'Gelir Gider', width: 200, type: 'number' },
  { field: 'offspring', headerName: 'Yavrular', width: 200, type: 'array' },
  { field: 'vaccinationSchedule', headerName: 'Aşı Programı', width: 200, type: 'array' },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  const [openShipment, setOpenShipment] = useState(false);

  const { user } = useContext(AuthContext);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch(`http://localhost:5000/farmer/${user.farmerTC}/animals`).then(
        (res) => res.json()
      ),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Hayvanlarım</h1> 
        <button onClick={() => setOpen(true)}>Yeni Hayvan Ekle</button>
        <button onClick={() => setOpenShipment(true)}>Sevkiyat/Ölüm/Çalınma</button>
      </div>
      {/* <DataTable slug="users" columns={columns} rows={userRows} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="animal" columns={columns} rows={data} />
      )}
      {open && <Add slug="hayvan" columns={columns} setOpen={setOpen} />}
      {openShipment && <Shipment slug="hayvan" columns={columns} setOpen={setOpenShipment} />}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <>
          {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
          {openShipment && <Shipment slug="user" columns={columns} setOpen={setOpenShipment} />}
          {!open && !openShipment && <DataTable slug="users" columns={columns} rows={data} />}
        </>
      )} */}
    </div>
  );
};

export default Users;
