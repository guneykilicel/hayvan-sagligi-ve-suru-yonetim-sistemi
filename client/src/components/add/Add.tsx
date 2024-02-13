import { GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import LinearStepper from "../stepper/Stepper";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {

  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`http://localhost:5000/animal/register`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          earTagNumber: formValues?.earTagNumber,
          ownerTC: user.farmerTC,
          animalType: formValues?.animalType,
          breed: formValues?.breed,
          gender: formValues?.gender,
          motherEarTagNumber: formValues?.motherEarTagNumber,
          fatherEarTagNumber: formValues?.fatherEarTagNumber,
          birthDate: formValues?.birthDate,
          weight: formValues?.weight,
          group: formValues?.group,
          dailyMilkYieldLt: formValues?.dailyMilkYieldLt,
          // pregnancyStatus: formValues?.pregnancyStatus,
          // lastInseminationDate: formValues?.lastInseminationDate,
          numberOfInsemination: formValues?.numberOfInsemination,
          // dryShippingDate: formValues?.dryShippingDate,
          // transitionToTheDeliveryRoomDate: formValues?.transitionToTheDeliveryRoomDate,
          // lastBirthDate: formValues?.lastBirthDate,
          numberOfBirths: formValues?.numberOfBirths,
          mayBeSick: formValues?.mayBeSick,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  // Input değerleri değiştikçe state'i güncelle
  const handleInputChange = (field: any, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item
    mutation.mutate();
    toast.success("Kayıt Başarılı!");
    // console.log('Form Values:', formValues);
    props.setOpen(false)
  };

    // Bugünkü tarihi al
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getFullYear()}`;
  
    // Input alanında gösterilecek bugünkü tarih placeholder'ı
    const birthDatePlaceholder = formattedDate;

  return (
    <div className="add">
      <div className="modal">
      <IconButton
          aria-label="close"
          color="inherit"
          className="close"
          onClick={() => props.setOpen(false)}
        >
          <GridCloseIcon />
        </IconButton>
        <h1>Yeni Hayvan Ekle</h1>
        {/* <LinearStepper /> */}
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) =>
              item.field !== 'profitAndLoss' &&
              item.field !== 'vaccinationSchedule' &&
              item.field !== 'status' &&
              item.field !== 'offspring' &&
              item.field !== 'ownerTC' &&
              item.field !== 'lastInseminationDate' &&
              item.field !== 'dryShippingDate' &&
              item.field !== 'transitionToTheDeliveryRoomDate' &&
              item.field !== 'lastBirthDate'
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.field === 'gender' ? (
                  <select
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  >
                    <option value="true">Dişi</option>
                    <option value="false">Erkek</option>
                  </select>
                ) : column.field === 'birthDate' ? (
                  // 'birthDate' durumu için input alanı
                  <input
                    type="date"
                    name={column.field}
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                    placeholder={birthDatePlaceholder}
                  />
                ) : column.field === 'animalType' ? (
                  // 'breed' durumu için dropdown
                  <select
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  >
                    <option value="true">Büyükbaş</option>
                    <option value="false">Küçükbaş</option>
                    {/* Diğer breed seçenekleri buraya eklenebilir */}
                  </select>
                ) : column.field === 'breed' ? (
                  // 'breed' durumu için dropdown
                  <select
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  >
                    <option value="breed1">Irk 1</option>
                    <option value="breed2">Irk 2</option>
                    {/* Diğer breed seçenekleri buraya eklenebilir */}
                  </select>
                ) : column.field == 'group' ? (
                  // 'breed' durumu için dropdown
                  <select
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  >
                    <option value="false">Düşük</option>
                    <option value="true">Yüksek</option>
                    {/* Diğer breed seçenekleri buraya eklenebilir */}
                  </select>
                ) : column.field == 'pregnancyStatus' ? (
                  // 'breed' durumu için dropdown
                  <select
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  >
                    <option value="false">Gebe Değil</option>
                    <option value="true">Gebe</option>
                    {/* Diğer breed seçenekleri buraya eklenebilir */}
                  </select>
                ) : column.field == 'mayBeSick' ? (
                  // 'breed' durumu için dropdown
                  <select
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  >
                    <option value="false">Hasta Değil</option>
                    <option value="true">Hasta</option>
                    {/* Diğer breed seçenekleri buraya eklenebilir */}
                  </select>
                ) : (
                  <input
                    type={column.type}
                    // placeholder={column.field}
                    name={column.field}
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  />
                )}
              </div>
            ))}



          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
