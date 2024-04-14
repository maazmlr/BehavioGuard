
export default function SubSec({img, head, para}){
    return(
        <div className='box'>
            <p className='head margin-top'>{head}</p>
            <p className='para margin-top'>{para}</p>
            <img className='img-logo margin-top' src={img} alt="one" />
        </div>
    )
}