import { useQuery } from "@tanstack/react-query";
import "./topBox.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";

const TopBox = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, data, error } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch(`http://localhost:5000/farmer/${user.farmerTC}/topMilkProducingAnimals`).then(
        (res) => res.json()
      ),
  });

  if (isLoading) {
    return <div className="topBox">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="topBox">Hata: Veriler alınamıyor.</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <div className="topBox">Veri bulunamadı.</div>;
  }

  return (
    <div className="topBox">
      <h1>En Verimli Hayvanlarım</h1>
      <div className="list">
        {data.map((animal: any) => (
          <div className="listItem" key={animal._id}>
            <div className="user">
              <img src="cow.jpeg" alt="" />
              <div className="userTexts">
                <span className="username">{animal.farmNumber || "İnek"}</span>
                <span className="email">{animal.earTagNumber}</span>
              </div>
            </div>
            <span className="amount">{animal.weight}kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
