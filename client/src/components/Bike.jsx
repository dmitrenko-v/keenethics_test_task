import { useDeleteBikeMutation, useUpdateBikeStatusMutation } from "../api";
import close from "../assets/close.svg";
export default function Bike({ bikeData }) {
  const { name, color, id, status, price, type } = bikeData;

  const [updateBikeStatus] = useUpdateBikeStatusMutation();
  const [deleteBike] = useDeleteBikeMutation();

  const statusChange = async function (e) {
    const payload = { id: id.toLowerCase(), newStatus: e.target.value };
    await updateBikeStatus(payload);
  };

  const deleteBikeClick = async function () {
    await deleteBike(id.toLowerCase());
  };

  return (
    <div className={`bikes__bike ${status}`}>
      <img className="bike__delete" onClick={deleteBikeClick} src={close}></img>

      <p className="bike__primary-info">
        <span className="bike__name">{name}</span> - {type}({color})
      </p>

      <p className="bike__id">ID: {id}</p>

      <div className="bike__status">
        <p className="bike__status_info">
          STATUS:{" "}
          <select onChange={statusChange} value={status}>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </p>
      </div>

      <p className="bike__price">{price} UAH/hr.</p>
    </div>
  );
}
