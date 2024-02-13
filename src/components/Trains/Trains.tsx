import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  TrainType,
  fetchTrains,
  getTrainsState,
} from "../../store/slice/trainsListSlice";
import { showTrain } from "../../store/slice/trainSlice";
import s from './Trains.module.css';

export default function Trains() {
  const dispatch = useAppDispatch();
  const trainsList = useAppSelector(getTrainsState);

  useEffect(() => {
    dispatch(fetchTrains());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TrainsTable = (props: { trains: TrainType[] }) => {
    const { trains } = props;

    return (
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th>Поезд</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.name} onClick={() => dispatch(showTrain(train))} className={s.row}>
              <td>{train.name}</td>
              <td>{train.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={s.container}>
      <h2 className={s.header}>Поезда</h2>
      {trainsList.isLoading && <h2>Загрузка...</h2>}
      {!trainsList.isLoading && trainsList.errorMessage && (
        <h2>Ошибка: {trainsList.errorMessage}</h2>
      )}
      {!trainsList.isLoading &&
        !trainsList.trains.length &&
        !trainsList.errorMessage && <h2>Список поездов пуст</h2>}
      {!trainsList.isLoading && !!trainsList.trains.length && (
        <TrainsTable trains={trainsList.trains} />
      )}
    </div>
  );
}
