
import App from "./form"
import LogoutIcon from '@mui/icons-material/Logout';

import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

export default function FourthSec({ email, security }) {
    return (
        <div>
            <div className="third-sec-head">
                {
                    !email && !security &&
                    <div>
                        <h1 className='heading-pro'>Password</h1>
                        <p>Modify your current password</p>
                    </div>

                }

                {
                    email &&
                    <div>
                        <h1 className='heading-pro'>Contact email</h1>
                        <p>Manage your email account email address for notification if email isn't authenticate change your email</p>
                    </div>
                }

                {
                    security &&
                    <div>
                        <h1 className='heading-pro'>Account Security</h1>
                        <p>Manage your account security</p>
                        <div className="btn-group-flex">
                            <button className='verified-btn'>
                                <LogoutIcon style={{ marginTop: "-2px" }} htmlColor='green' fontSize='12px' /><span>Logout</span>
                            </button>

                            <button className='verified-btn col'>
                                <DeleteSweepOutlinedIcon style={{ marginTop: "-2px" }} htmlColor="#FF0000" fontSize='12px' /><span style={{fontColor:"red"}}>Delete my account</span>
                            </button>
                        </div>
                    </div>
                }

            </div>

            {
                !security &&
                <App email={email} />
            }




        </div>
    )
}