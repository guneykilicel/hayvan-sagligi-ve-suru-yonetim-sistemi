import { GridColDef } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./shipment.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Shipment = (props: Props) => {

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
          breed: formValues?.breed,
          gender: formValues?.gender,
          motherEarTagNumber: formValues?.motherEarTagNumber,
          fatherEarTagNumber: formValues?.fatherEarTagNumber,
          birthDate: formValues?.birthDate,
          weight: formValues?.weight,
          group: formValues?.group,
          dailyMilkYieldLt: formValues?.dailyMilkYieldLt,
          pregnancyStatus: formValues?.pregnancyStatus,
          lastInseminationDate: formValues?.lastInseminationDate,
          numberOfInsemination: formValues?.numberOfInsemination,
          dryShippingDate: formValues?.dryShippingDate,
          transitionToTheDeliveryRoomDate: formValues?.transitionToTheDeliveryRoomDate,
          lastBirthDate: formValues?.lastBirthDate,
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
    // console.log('Form Values:', formValues);
    props.setOpen(false)
  };
  return (
    <div className="shipment">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Shipment {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) =>
              item.field !== 'profitAndLoss' &&
              item.field !== 'vaccinationSchedule' &&
              item.field !== 'status' &&
              item.field !== 'offspring' &&
              item.field !== 'ownerTC' 
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
                ) : (
                  <input
                    type={column.type}
                    // placeholder={column.field}
                    // name={column.field}
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  />
                )}
              </div>
            ))}

            {/* <div className="item">
                <label>Hayvan Kulak No</label>
                  <input
                    type="tel"
                    // placeholder=
                    // name={column.field}
                    // onChange={(e) => handleInputChange(column.field, e.target.value)}
                  />
              </div> */}


          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Shipment;
