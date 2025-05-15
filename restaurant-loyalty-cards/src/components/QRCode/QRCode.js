import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRCodeComponent({ data }) {
    const qrCodeData = JSON.stringify(data);

    return (
        <div className="qr-code">
            <h3>Scan this QR Code</h3>
            <QRCodeSVG value={qrCodeData} size={128} />
        </div>
    );
}

export default QRCodeComponent;