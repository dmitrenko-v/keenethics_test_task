import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateBikeMutation } from "../api";

const stringFieldConfig = { required: true, minLength: 5 };
const numericFieldConfig = {
  pattern: /^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/,
  required: true,
};

export default function Form() {
  const [invalidIdError, setInvalidIdError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [createBike] = useCreateBikeMutation();

  const onSubmit = async function (data) {
    try {
      data.price = Number(data.price);
      data.wheelSize = Number(data.wheelSize);
      await createBike(data).unwrap();
    } catch (err) {
      setInvalidIdError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-group">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            className={`${errors.name ? "error-field" : ""}`}
            {...register("name", stringFieldConfig)}
          ></input>

          <input
            type="text"
            placeholder="Color"
            className={`${errors.color ? "error-field" : ""}`}
            {...register("color", stringFieldConfig)}
          ></input>

          <input
            type="text"
            placeholder="Price"
            className={`${errors.price ? "error-field" : ""}`}
            {...register("price", numericFieldConfig)}
          ></input>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Type"
            className={`${errors.type ? "error-field" : ""}`}
            {...register("type", stringFieldConfig)}
          ></input>

          <input
            type="text"
            placeholder="Wheel size"
            className={`${errors.wheelSize ? "error-field" : ""}`}
            {...register("wheelSize", numericFieldConfig)}
          ></input>

          <input
            type="text"
            placeholder="ID (slug): ХХХХХХХХХХХХХ"
            className={`${errors.id ? "error-field" : ""}`}
            {...register("id", stringFieldConfig)}
          ></input>
        </div>
      </div>

      <div className="form__description">
        <textarea
          className={`form__description-field ${
            errors.description ? "error-field" : ""
          }`}
          type="text"
          placeholder="Description"
          {...register("description", stringFieldConfig)}
        ></textarea>

        {Object.keys(errors).length !== 0 && (
          <p className="error-message">Invalid data format</p>
        )}
        {invalidIdError && (
          <p className="error-message">Bike with given id already exists</p>
        )}
      </div>

      <div className="form__buttons">
        <input type="submit" value="SAVE"></input>
        <button type="button" onClick={() => reset()}>
          CLEAR
        </button>
      </div>
    </form>
  );
}
