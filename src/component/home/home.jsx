import ResponsiveAppBar from "../header/navbar"
import MiniDrawer from "../header/leftDrawer"
import FirstSec from "./First/first.jsx"
import Sec from "./Second/second.jsx"
import Third from "./Third/three.jsx"
const Home = () => {
    return (
        <>
        <div className="home">
            <ResponsiveAppBar />
            <MiniDrawer/>
            <FirstSec/>
            <Sec/>
            <Third/>
        </div>
        </>
    )
}

export default Home