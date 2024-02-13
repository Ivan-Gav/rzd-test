import s from "./App.module.css";
import { useAppSelector } from "./store/hooks";
import Trains from "./components/Trains/Trains";
import Train from "./components/Train/Train";
import { getTrainState } from "./store/slice/trainSlice";

function App() {
  const train = useAppSelector(getTrainState);

  return (
    <div className={s.page_container}>
      <Trains />
      <div className={s.details}>{train.isOpen && <Train train={train} />}</div>
    </div>
  );
}

export default App;
