import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  Train,
  fetchTrains,
  getTrainsState,
} from "../../store/slice/trainsSlice";

// import s from "./Trains.module.css";

export default function Trains() {
  const dispatch = useAppDispatch();
  const trainsList = useAppSelector(getTrainsState);

  useEffect(() => {
    dispatch(fetchTrains());
  }, []);

  const TrainsTable = ({ trains }: { trains: Train[] }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Поезд</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.name}>
              <td>{train.name}</td>
              <td>{train.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {trainsList.isLoading && <h2>Загрузка...</h2>}
      {!trainsList.isLoading && trainsList.errorMessage && (
        <h2>Ошибка: {trainsList.errorMessage}</h2>
      )}
      {!trainsList.isLoading && !trainsList.trains.length && !trainsList.errorMessage && (
        <h2>Список поездов пуст</h2>
      )}
      {!trainsList.isLoading && !!trainsList.trains.length && (
        <TrainsTable trains={trainsList.trains} />
      )}
    </>
  );
}
