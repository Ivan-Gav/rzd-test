import { useEffect } from "react";
import cn from "classnames";
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
      if (!/^([0]|[1-9][0-9]*?|[1-9][0-9]*([.,][0-9]+)?|[0]?[.,][0-9]+)$/.test(value)) {
        dispatch(setCharacteristicValid({ index, type, isValid: false }));
      } else {
        const numValue = Number(value);
        const check = {
          engineAmperage: numValue > 0 && Number.isInteger(numValue),
          force: numValue > 0,
          speed: numValue >= 0 && Number.isInteger(numValue),
        };
        const isCellValid = check[type];
        dispatch(setCharacteristicValid({ index, type, isValid: isCellValid }));
      }
    };

    validateCell();
  }, [dispatch, index, type, value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setCharacteristicValue({ index, type, value: e.target.value }));
  };

  return (
    <input
      className={cn(s.cell, !isValid && s.invalid)}
      name={`${type}-${index}`}
      type="number"
      value={value}
      onChange={onChange}
    />
  );
}
