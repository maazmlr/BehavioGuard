
import './profileSett.css'
import FirstSec from './firstSec'
import SecondSec from './secSec'
import FourthSec from './fourthSec'
import { useSelector } from 'react-redux'

export default function ProSett(){
    const isSidebarExpanded = useSelector((state) => state.expand.value)
    return(
        <div className={`profile-setting ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
            <div>
                <FirstSec/>
                <hr />
            </div>
            
            <div>
                <SecondSec/>
                <hr />
            </div>

            <div>
                <FourthSec email={true}/>
                <hr />
            </div>

            <div>
                <FourthSec/>
                <hr />
            </div>

            <div>
                <FourthSec security={true}/>
            </div>
            
        </div>
    )
}