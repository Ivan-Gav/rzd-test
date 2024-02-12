import './App.css'
import { useAppSelector } from "./store/hooks";
import Trains from './components/Trains/Trains';
import Train from './components/Train/Train';
import { getTrainState } from './store/slice/trainSlice';

function App() {
  const train = useAppSelector(getTrainState);
  
  return (
    <>
     <h1>RZD Test</h1>
     <div className='page-container'>
      <Trains />
      <div className='details'>
        {train.isOpen && <Train train={train} />}
      </div>  
     </div>
    </>
  )
}

export default App
