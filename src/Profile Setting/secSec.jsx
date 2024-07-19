

import './profileSett.css'
import Avatar from 'react-avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAppContext } from '../context';

export default function SecondSec({ third }) {
    const { data } = useAppContext()
    return (
        <div className='secSec'>
            <div className='sec-sec-fir'>
                <div>
                    <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data?.name} round={true} size='60' />
                </div>
                <div className='sec-Info'>
                    <p className='heading-pro'>{data?.name}</p>
                    <p className='email-pro'>{data?.email}</p>
                </div>
            </div>
            <div>
                <p className='paragraph'>For real-time notification</p>
                <button className='verified-btn'>
                    <VerifiedIcon style={{marginTop: "-2px"}} htmlColor='green' fontSize='12px'/><span>Email Verified</span>
                </button>
            </div>

        </div>
    )
}