import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  getTrainState,
  setCharacteristicValid,
  setCharacteristicValue,
} from "../../store/slice/trainSlice";
import { Characteristic } from "../../store/slice/trainsListSlice";
import s from "./Cell.module.css";

type CellProps = {
  index: number;
  type: keyof Characteristic;
};

export default function Cell(props: CellProps) {
  const { index, type } = props;

  const dispatch = useAppDispatch();
  const { characteristics, isValidArray } = useAppSelector(getTrainState);
  const value = characteristics[index][type];
  const isValid = isValidArray[index][type];

  useEffect(() => {
    const validateCell = () => {
      const check = {
        engineAmperage: value > 0 && Number.isInteger(value),
        force: !isNaN(value) && value > 0,
        speed: value >= 0 && Number.isInteger(value),
      };
      const isCellValid = check[type];
      dispatch(setCharacteristicValid({ index, type, isValid: isCellValid }));
    };

    validateCell();
  }, [dispatch, index, type, value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setCharacteristicValue({ index, type, value: Number(e.target.value) })
    );
  };

  return (
    <input
      className={!isValid ? s.invalid : ""}
      name={`${type}-${index}`}
      type="number"
      value={value}
      onChange={onChange}
    />
  );
}