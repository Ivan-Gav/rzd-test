import { TrainType } from "../../store/slice/trainsListSlice";


export default function Train({ train }: { train: TrainType }) {
  const { name, characteristics } = train;

  return (
    <>
    <h2>Характеристики поезда <span>{name}</span></h2>
    {!characteristics.length ? <p>Список характеристик отсутствует</p> :
    <table>
      <thead>
        <tr>
          <th>Ток двигателя</th>
          <th>сила тяги</th>
          <th>Скорость</th>
        </tr>
      </thead>
      <tbody>
          {characteristics.map(line => {
            return(
              <tr key={`${line.engineAmperage}${line.force*100}${line.speed}`}>
                <td>{line.engineAmperage}</td>
                <td>{line.force}</td>
                <td>{line.speed}</td>
              </tr>
            )
          })}
      </tbody>
    </table>}
    <button onClick={() => console.log('Отправить данные')}>Отправить данные</button>
    </>
  )
}
