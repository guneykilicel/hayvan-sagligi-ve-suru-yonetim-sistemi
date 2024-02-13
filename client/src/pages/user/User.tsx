import { useParams } from "react-router-dom";
// import Single from "../../components/single/Single"
import { singleUser } from "../../data"
import "./user.scss"
import SingleCopy from "../../components/singleCopy/SingleCopy";
import { useQuery } from "@tanstack/react-query";

const User = () => {

  //Fetch data and send to Single Component


  const dataKeys = [
    { name: "yieldLt", color: "#82ca9d" },
    // { name: "clicks", color: "#8884d8" },
  ]

  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch(`http://localhost:5000/animal/${id}`).then(
        (res) => res.json()
      ),
  });

  console.log(data)

  
  
  return (
    <div className="user">
      <SingleCopy {...data} dataKeys={dataKeys} />
      
    </div>
  )
}

export default User