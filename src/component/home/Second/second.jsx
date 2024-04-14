import App from "../stopWatch"
import img from '../../../assets/s7img.png'

export default function Sec() {
    return (
        <div className="padding-bottome-top" style={{marginTop: "40px"}}>
            <p className="heading1" style={{textAlign: "center", margin: "30px auto"}}>Enhancing Productivity with Behavioral Authentication</p>
            <div className="flex-center flex-wrap">
                <img src={img} alt="" />
                <App />
            </div>
        </div>
    )
}