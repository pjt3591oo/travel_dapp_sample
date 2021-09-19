import { useState } from 'react';
import QRCode from "qrcode.react";

const QrDisplay = (props) => {
  const [address, setAddess ] = useState('0xb6dF595368216d8da60ac08444e5aC580B6b2aad');
  return (
    <div>
      <QRCode 
        value={address} 
        style={{width: 500, height: 500}}
        includeMargin={true}
      />
    </div>
  )
}

export default QrDisplay;