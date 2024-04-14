import card1 from '../../../assets/Card_1.png'
import card2 from '../../../assets/Card_2.png'
import card3 from '../../../assets/Card_3.png'
import card4 from '../../../assets/Card_4.png'
import c from '../../../assets/c.png'

export default function Third() {
    return (
        <div className="padding-bottom-top">
            <p className="heading1" style={{ textAlign: "center", margin: "0px auto 10px auto" }}>About BehavioGuard</p>
            <p className="heading2" style={{ textAlign: "center", margin: "0px auto 30px auto" }}>Reinventing Security with Behavioral Authentication</p>
            <div className="flex-center flex-wrap">
                <div style={{margin: "0 80px"}}>
                    <p className='card-para'>Key Points</p>
                    <div>
                        <img src={card1} alt="card1" className='card' />
                    </div>
                    <div>
                        <img src={card2} alt="card1" className='card' />
                    </div>
                    <div>
                        <img src={card3} alt="card1" className='card' />
                    </div>
                    <div>
                        <img src={card4} alt="card1" className='card' />
                    </div>
                </div>
                <div>
                    <img src={c} alt="c" className='card-img' />
                </div>
            </div>
        </div>
    )
}