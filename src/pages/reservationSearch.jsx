import { useState } from 'react';
import ether from '../ethereum';

const ReservationSearch = (props) => {
  const [index, setIndex] = useState();
  const [nft, setNft] = useState({});

  const onSearchHandler = async () => { 
    const result = await ether.erc721.getReservationById(parseInt(index))
    setNft(result)
  }

  return (
    <>
      <input type="text" value={index} onChange={(e) => setIndex(e.target.value)} />
      <button onClick={onSearchHandler}>조회</button>

      <div>
        <h1>startDate: {nft.startDate}</h1>
        <h1>endDate: {nft.endDate}</h1>
        <h1>price: {nft.price}</h1>
      </div>
    </>
  )
}

export default ReservationSearch;