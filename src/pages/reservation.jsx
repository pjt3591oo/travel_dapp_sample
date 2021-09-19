import { useState } from 'react';
import ether from '../ethereum';

const Reservation = (props) => {
  const [startDate, setStartDate]= useState('');
  const [endDate, setEndDate]= useState('');
  const [price, setPrice]= useState(0);
  const [id, setId]  = useState(new Date().getTime());
  const [ userAddr, setUserAddr ] = useState('0xCe71b14b87709C837BC2478cbd2ABB3FFE1C53d1');

  const onReservationHandler = async () => {
    const result = await ether.erc721.createNft(id, startDate, endDate, price, userAddr);
    console.log(startDate, endDate, price, id);
    alert(`[예약완료] tx hash: ${result.transactionHash}`);
  }

  return (
    <>
      <div>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <div>reservation id: {id}</div>
        <button onClick={ onReservationHandler }>Reserve</button>
      </div>
    </>
  )
}

export default Reservation;