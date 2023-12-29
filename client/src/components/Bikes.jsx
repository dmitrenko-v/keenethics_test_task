import { useGetBikesQuery } from "../api";
import Bike from "./Bike";
export default function Bikes() {
  const { data: bikes, isSuccess, isError, error } = useGetBikesQuery();

  if (isError) console.log(error);

  if (isSuccess) {
    return (
      <div className="bikes">
        {bikes.map((bike) => (
          <Bike key={bike.id} bikeData={bike} />
        ))}
      </div>
    );
  }
}
