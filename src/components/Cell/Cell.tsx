import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  getTrainState,
  setCharacteristicValid,
  setCharacteristicValue,
} from "../../store/slice/trainSlice";
import { Characteristic } from "../../store/slice/trainsListSlice";
import s from './Cell.module.css';

type CellProps = {
  index: number;
  type: keyof Characteristic;
};

export default function Cell(props: CellProps) {
  const { index, type } = props;

  const dispatch = useAppDispatch();

  const { characteristics, isValidArray } = useAppSelector(getTrainState)
  const value = characteristics[index][type]
  const isValid = isValidArray[index][type]

  const validateCell = () => {
    const check = {
      engineAmperage: value > 0 && Number.isInteger(value),
      force: !isNaN(value) && value > 0,
      speed: value >= 0 && Number.isInteger(value),
    };
    const isCellValid = check[type];
    dispatch(setCharacteristicValid({ index, type, isValid: isCellValid }));
  };

  useEffect(() => {
    validateCell()
  }, [value])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCharacteristicValue({index, type, value: (Number(e.target.value))}));

  };

  return (
    <input
      className={!isValid ? s.invalid : ''}
      name={`${type}-${index}`}
      type="number"
      value={value}
      onChange={onChange}
    />
  );
}



// import { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "../../store/hooks";
// import {
//   getTrainState,
//   setCharacteristicValid,
//   setCharacteristicValue,
// } from "../../store/slice/trainSlice";
// import { Characteristic } from "../../store/slice/trainsListSlice";
// import s from './Cell.module.css';

// type CellProps = {
//   index: number;
//   type: keyof Characteristic;
//   value: number
// };

// export default function Cell(props: CellProps) {
//   const { index, type, value: initialValue } = props;
//   const [ value, setValue ] = useState(initialValue);
//   const [ isValid, setIsValid ] = useState(true)

 
//   const dispatch = useAppDispatch();

//   const validateCell = () => {
//     const check = {
//       engineAmperage: value > 0 && Number.isInteger(value),
//       force: !isNaN(value) && value > 0,
//       speed: value >= 0 && Number.isInteger(value),
//     };
//     const isCellValid = check[type];
//     setIsValid(isCellValid);
//     dispatch(setCharacteristicValid({ index, type, isValid }));
//   };

//   useEffect(() => {
//     validateCell()
//   }, [value])

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(Number(e.target.value));
//   };



//   return (
//     <input
//       className={!isValid ? s.invalid : ''}
//       name={`${type}-${index}`}
//       type="number"
//       value={value}
//       onChange={onChange}
//     />
//   );
// }