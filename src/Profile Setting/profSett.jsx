
import './profileSett.css'
import FirstSec from './firstSec'
import SecondSec from './secSec'
import FourthSec from './fourthSec'

export default function ProSett(){
    return(
        <div className="profile-setting">
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