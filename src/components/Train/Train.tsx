import { TrainType } from "../../store/slice/trainsListSlice";
import Cell from "../Cell/Cell";
import { useAppSelector } from "../../store/hooks";
import { getTrainState } from "../../store/slice/trainSlice";
import s from "./Train.module.css";

export default function Train(props: { train: TrainType }) {
  const { name, characteristics } = props.train;
  const { isValidArray, characteristics: tableCharacteristics } =
    useAppSelector(getTrainState);

  const disabled = isValidArray.some(
    (cell) => !cell.engineAmperage || !cell.force || !cell.speed
  );

  const onClick = () => {
    console.log(
      tableCharacteristics.map((row) => row.speed).sort((a, b) => a - b)
    );
  };

  return (
    <div className={s.container}>
      <h2 className={s.header}>{name}</h2>
      {!characteristics.length ? (
        <p>Список характеристик отсутствует</p>
      ) : (
        <table className={s.table}>
          <thead className={s.thead}>
            <tr>
              <th>Ток двигателя, А</th>
              <th>Сила тяги, кН</th>
              <th>Скорость, км/ч</th>
            </tr>
          </thead>
          <tbody>
            {characteristics.map((row, index) => {
              return (
                <tr
                  key={`${row.engineAmperage}-${Math.floor(row.force)}-${
                    row.speed
                  }`}
                  className={s.row}
                >
                  <td>
                    <Cell index={index} type="engineAmperage" />
                  </td>
                  <td>
                    <Cell index={index} type="force" />
                  </td>
                  <td>
                    <Cell index={index} type="speed" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button disabled={disabled} onClick={onClick} className={s.button}>
        Отправить данные
      </button>
    </div>
  );
}
