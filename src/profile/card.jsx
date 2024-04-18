import './profile.css'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Avatar from 'react-avatar';
import { useState } from 'react';
import { useAppContext } from '../context';

export default function Card() {
    const { data } = useAppContext()
    const [img, setImg] = useState()
    const handleFileChange = (e) => {
        console.log(e.target.files)
        // const file = e.target.files[0];
        // console.log(file)
        // if (file) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         const fileType = file.type.split('/')[0]; // 'image' or 'video'
        //         const formData = new FormData();
        //         setImg(reader.result);
        //     };
        //     reader.readAsDataURL(file);
        // }
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImg(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='flex justify-center'>
            <div className="card3">
                <div className="card__img1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%">
                        <rect fill="#ffffff" width={540} height={450} />
                        <defs>
                            <linearGradient
                                id="a"
                                gradientUnits="userSpaceOnUse"
                                x1={0}
                                x2={0}
                                y1={0}
                                y2="100%"
                                gradientTransform="rotate(222,648,379)"
                            >
                                <stop offset={0} stopColor="#ffffff" />
                                <stop offset={1} stopColor="#FC726E" />
                            </linearGradient>
                            <pattern
                                patternUnits="userSpaceOnUse"
                                id="b"
                                width={300}
                                height={250}
                                x={0}
                                y={0}
                                viewBox="0 0 1080 900"
                            >
                                <g fillOpacity="0.5">
                                    <polygon fill="#555" points="90 150 0 300 180 300" />
                                    <polygon points="90 150 180 0 0 0" />
                                    <polygon fill="#555" points="270 150 360 0 180 0" />
                                    <polygon fill="#DDD" points="450 150 360 300 540 300" />
                                    <polygon fill="#999" points="450 150 540 0 360 0" />
                                    <polygon points="630 150 540 300 720 300" />
                                    <polygon fill="#DDD" points="630 150 720 0 540 0" />
                                    <polygon fill="#555" points="810 150 720 300 900 300" />
                                    <polygon fill="#FFF" points="810 150 900 0 720 0" />
                                    <polygon fill="#DDD" points="990 150 900 300 1080 300" />
                                    <polygon fill="#555" points="990 150 1080 0 900 0" />
                                    <polygon fill="#DDD" points="90 450 0 600 180 600" />
                                    <polygon points="90 450 180 300 0 300" />
                                    <polygon fill="#666" points="270 450 180 600 360 600" />
                                    <polygon fill="#555" points="270 450 360 300 180 300" />
                                    <polygon fill="#DDD" points="450 450 360 600 540 600" />
                                    <polygon fill="#999" points="450 450 540 300 360 300" />
                                    <polygon fill="#999" points="630 450 540 600 720 600" />
                                    <polygon fill="#FFF" points="630 450 720 300 540 300" />
                                    <polygon points="810 450 720 600 900 600" />
                                    <polygon fill="#DDD" points="810 450 900 300 720 300" />
                                    <polygon fill="#555" points="990 450 900 600 1080 600" />
                                    <polygon fill="#555" points="990 450 1080 300 900 300" />
                                    <polygon fill="#222" points="90 750 0 900 180 900" />
                                    <polygon points="270 750 180 900 360 900" />
                                    <polygon fill="#DDD" points="270 750 360 600 180 600" />
                                    <polygon points="450 750 540 600 360 600" />
                                    <polygon points="630 750 540 900 720 900" />
                                    <polygon fill="#555" points="630 750 720 600 540 600" />
                                    <polygon fill="#555" points="810 750 720 900 900 900" />
                                    <polygon fill="#666" points="810 750 900 600 720 600" />
                                    <polygon fill="#999" points="990 750 900 900 1080 900" />
                                    <polygon fill="#999" points="180 0 90 150 270 150" />
                                    <polygon fill="#555" points="360 0 270 150 450 150" />
                                    <polygon fill="#FFF" points="540 0 450 150 630 150" />
                                    <polygon points="900 0 810 150 990 150" />
                                    <polygon fill="#222" points="0 300 -90 450 90 450" />
                                    <polygon fill="#FFF" points="0 300 90 150 -90 150" />
                                    <polygon fill="#FFF" points="180 300 90 450 270 450" />
                                    <polygon fill="#666" points="180 300 270 150 90 150" />
                                    <polygon fill="#222" points="360 300 270 450 450 450" />
                                    <polygon fill="#FFF" points="360 300 450 150 270 150" />
                                    <polygon fill="#555" points="540 300 450 450 630 450" />
                                    <polygon fill="#222" points="540 300 630 150 450 150" />
                                    <polygon fill="#555" points="720 300 630 450 810 450" />
                                    <polygon fill="#666" points="720 300 810 150 630 150" />
                                    <polygon fill="#FFF" points="900 300 810 450 990 450" />
                                    <polygon fill="#999" points="900 300 990 150 810 150" />
                                    <polygon points="0 600 -90 750 90 750" />
                                    <polygon fill="#666" points="0 600 90 450 -90 450" />
                                    <polygon fill="#555" points="180 600 90 750 270 750" />
                                    <polygon fill="#555" points="180 600 270 450 90 450" />
                                    <polygon fill="#555" points="360 600 270 750 450 750" />
                                    <polygon fill="#999" points="360 600 450 450 270 450" />
                                    <polygon fill="#666" points="540 600 630 450 450 450" />
                                    <polygon fill="#222" points="720 600 630 750 810 750" />
                                    <polygon fill="#FFF" points="900 600 810 750 990 750" />
                                    <polygon fill="#222" points="900 600 990 450 810 450" />
                                    <polygon fill="#DDD" points="0 900 90 750 -90 750" />
                                    <polygon fill="#555" points="180 900 270 750 90 750" />
                                    <polygon fill="#FFF" points="360 900 450 750 270 750" />
                                    <polygon fill="#555" points="540 900 630 750 450 750" />
                                    <polygon fill="#FFF" points="720 900 810 750 630 750" />
                                    <polygon fill="#222" points="900 900 990 750 810 750" />
                                    <polygon fill="#222" points="1080 300 990 450 1170 450" />
                                    <polygon fill="#FFF" points="1080 300 1170 150 990 150" />
                                    <polygon points="1080 600 990 750 1170 750" />
                                    <polygon fill="#666" points="1080 600 1170 450 990 450" />
                                    <polygon fill="#DDD" points="1080 900 1170 750 990 750" />
                                </g>
                            </pattern>
                        </defs>
                        <rect x={0} y={0} fill="url(#a)" width="100%" height="100%" />
                        <rect x={0} y={0} fill="url(#b)" width="100%" height="100%" />
                    </svg>
                </div>
                <div>
                    {
                        img ?
                            <div>
                                <img className='post-profile-img' src={img} alt="profile" />
                                <label onClick={handleFileChange} className="camera-icon">
                                    <CameraAltOutlinedIcon style={{ color: "#FAFAFA", fontSize: 24 }} />
                                    <input accept="image/x-png, image/gif, image/jpeg" style={{ display: "none" }} type="file" />
                                </label>
                            </div>
                            :
                            <div>
                                <div className='avatar1'>
                                    <Avatar round color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data?.name} />
                                </div>
                                <label onClick={handleFileChange} className="camera-icon1">
                                    <CameraAltOutlinedIcon style={{ color: "#FAFAFA", fontSize: 24 }} />
                                    <input accept="image/x-png, image/gif, image/jpeg" style={{ display: "none" }} type="file" />
                                </label>
                            </div>
                    }
                </div>
                <div className="card__title1">{data?.name}</div>
                <div className="card__subtitle1">{data?.email}</div>
                {/* <div className="card__wrapper">
                    <button className="card__btn">Button</button>
                </div> */}
            </div>
        </div>
    )
}