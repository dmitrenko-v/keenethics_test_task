import { useGetBikeStatsQuery } from "../api";

export default function Stats() {
  const { data: bikeStats, isSuccess } = useGetBikeStatsQuery();
  if (isSuccess) {
    const { bikeCount, availableBikes, bookedBikes, avgBikeCost } = bikeStats;
    return (
      <div className="stats">
        <p className="stats__header">STATISTICS</p>
        <ul className="stats__list">
          <li>
            Total Bikes: <b>{bikeCount}</b>
          </li>
          <li>
            Available Bikes: <b>{availableBikes}</b>
          </li>
          <li>
            Booked Bikes: <b>{bookedBikes}</b>
          </li>
          <li>
            Average bike cost: <b>{avgBikeCost || "0"} UAH/hr.</b>
          </li>
        </ul>
      </div>
    );
  }
}
