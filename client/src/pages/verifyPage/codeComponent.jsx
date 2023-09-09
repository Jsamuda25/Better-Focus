import '../../styles/verifyPage/code.css';
import QRCode from 'react-qr-code';

function CodeComponent({code, qr}){
    return(
        <div className = 'code-container'>
            <p>{code}</p>
            <QRCode 
            size= {100}
            bgColor = "white"
            fgColor = "black"
            value={qr} 
            />
        </div>
    )
}

export default CodeComponent;