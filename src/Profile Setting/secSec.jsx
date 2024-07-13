

import './profileSett.css'
import Avatar from 'react-avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function SecondSec({ third }) {
    return (
        <div className='secSec'>
            <div className='sec-sec-fir'>
                <div>
                    <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name="Fawad" round={true} size='60' />
                </div>
                <div className='sec-Info'>
                    <p className='heading-pro'>Wim Mostmans</p>
                    <p className='email-pro'>fawadaes@gmail.com</p>
                </div>
            </div>
            <div>
                <p className='paragraph'>For real-time notification</p>
                <button className='verified-btn'>
                    <VerifiedIcon style={{marginTop: "-2px"}} htmlColor='green' fontSize='12px'/><span>Verified you email</span>
                </button>
            </div>

        </div>
    )
}