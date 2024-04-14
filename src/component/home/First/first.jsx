import App from "../Charts/lineChart"
import SubSec from "./subSec"
import one from '../../../assets/1.png'
import two from '../../../assets/2.png'
import three from '../../../assets/3.png'
import g from '../../../assets/g.png'
import App1 from "../Charts/barChart"
import L from '../../../assets/4.svg'
import L1 from '../../../assets/5.svg'
import L2 from '../../../assets/6.svg'
import CurrentDate from "../../../CurrentDae"

export default function FirstSec() {
    return (
        <div className="section1">
            <div className="sec1Sub">
                <div>
                    <p style={{ margin: 0 }} className="heading">Dashboard</p>
                    <p className="para">Hi, basit here's take look at your performance and analytics</p>
                </div>
                <div>
                    <p style={{ margin: '0 40px 0 0'}} className="heading">Current date & time</p>
                    <CurrentDate dT={true}/>
                </div>
            </div>
            <div className="flex-center flex-wrap">
                <div>
                    <App />
                </div>
                <div className="flex-center subSec">
                    <div className="box1">
                        <SubSec head={"Lorem Asadada"} para={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo officiis beatae, sequi sit sunt nisi laudantium ipsam ut. Ut cum quibusdam obcaecati nostrum rerum quis eius sit iure fugit repudiandae?"} img={one} />
                    </div>
                    <div>
                        <SubSec head={"Lorem Asadada"} para={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo officiis beatae, sequi sit sunt nisi laudantium ipsam ut. Ut cum quibusdam obcaecati nostrum rerum quis eius sit iure fugit repudiandae?"} img={three} />
                    </div>
                    <div className="box3">
                        <SubSec head={"Lorem Asadada"} para={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo officiis beatae, sequi sit sunt nisi laudantium ipsam ut. Ut cum quibusdam obcaecati nostrum rerum quis eius sit iure fugit repudiandae?"} img={two} />
                    </div>
                </div>
            </div>
            <div className="flex-center-between flex-wrap">
                <div className="marginMinus margin-res-0">
                    <App1 />
                </div>
                <div className="disp-flex">
                    <div className="sub1 margin-100">
                        <img src={L} alt="L" className="width-100" />
                        <p style={{fontSize: "16px"}} className="heading">Unlock Peace Anywhere</p>
                        <p className="para1">Say goodbye to password stress and hello to peace of mind, knowing your device is safeguarded 24/7.</p>
                    </div>
                    <div className="sub1">
                        <img src={L1} alt="L1" className="width-100" />
                        <p style={{fontSize: "16px"}} className="heading">Simple and easy to use</p>
                        <p className="para1">Designed with simplicity in mind, our authentication application offers a user-friendly interface and intuitive interactions, ensuring a seamless and easy-to-use experience for users.</p>
                    </div>
                    <div className="sub1 margin-160">
                        <img src={L2} alt="L2" className="width-100" />
                        <p style={{fontSize: "16px"}} className="heading">24/7 availability</p>
                        <p className="para1">BehavioGuard application ensures 24/7 availability, providing uninterrupted access and security around the clock</p>
                    </div>
                </div>
            </div>
        </div>
    )
}