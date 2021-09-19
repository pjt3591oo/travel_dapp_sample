import { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader'
import ether from '../ethereum';

const Payment = (props) => {
  const [from, setFrom] = useState('0xCA6ace6f884B84D34A6567e9a782a47a5fcb98e9');
  const [pk, setPk] = useState('0xfd645d40e36cf431010ecf4411b5171cb3896d2c3d410a981044fe3e5e210cc7')
  const [value, setValue] = useState(10)
  const [to, setTo] = useState('');

  useEffect(() => {
    (async () => {
      if(!to) return;
      const result = await ether.erc20.sendEther(from, to, value, pk)
      alert(`tx hash: ${result.transactionHash}`);
    })()
  }, [to])

  const onQrCodeScannerHandler = (address) => {
    if(address && !to) setTo(address);
  }

  return (
    <>
      <div>
        <QrReader
          style={{ width: 500, height: 500 }}
          onScan={onQrCodeScannerHandler}
        />
      </div>
      <div>
        <div style={{ fontSize: 24 }}>from: {from}</div>
        <div style={{ fontSize: 24 }}>to: {to}</div>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </>
  )
}

export default Payment;