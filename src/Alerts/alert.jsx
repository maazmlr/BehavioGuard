import "../Home/home.css";
import { Line } from "../component/Charts/GradientChart";

function Alert() {
  return (
    <>
      <div className=" bg-white main flex">
        <div className="daily-use flex justify-between mb-8 mt-8">
          <div className="card-hover rounded-xl">
            <figure className="card">
              <figcaption className="card_title">
                <div className="daily-use-chart p-4 mian-chart">
                  <p className="hd-card mb-3">Current Security Status</p>
                  <div className="overflow-y-auto w-[33rem] h-[15rem]">
                    <div className="mt-2 mb-2">
                      <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Inventore ut voluptas deserunt incidunt porro
                        aspernatur adipisci dolorem temporibus nemo assumenda.
                      </p>
                    </div>
                    <div className="mt-2 mb-2">
                      <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Inventore ut voluptas deserunt incidunt porro
                        aspernatur adipisci dolorem temporibus nemo assumenda.
                      </p>
                    </div>
                    <div className="mt-2 mb-2">
                      <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Inventore ut voluptas deserunt incidunt porro
                        aspernatur adipisci dolorem temporibus nemo assumenda.
                      </p>
                    </div>
                    <div className="mt-2 mb-2">
                      <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Inventore ut voluptas deserunt incidunt porro
                        aspernatur adipisci dolorem temporibus nemo assumenda.
                      </p>
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="card-hover">
            <figure className="card">
              <figcaption className="card_title">
                <div className="piechart p-4 mian-chart">
                  <p className="hd-card mb-3">Real-time Monitoring</p>
                  <div className="flex justify-center w-[33rem] h-[15rem]">
                    <Line />
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="">
          <div className="daily-use justify-between mb-8">
            <div className="">
              <figure className="card ">
                <figcaption className="card_title">
                  <div className="daily-use-chart p-4 mian-chart w-full">
                    <p className="hd-card">Notifications and Alerts</p>
                    <div className="">
                      <div style={{backgroundColor: "#dd121296"}} className="flex justify-between items-center bg-red p-4 rounded-lg mb-3 mt-3">
                        <p>Suspicious activity at 14:22 PM</p>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">View</button>
                      </div>

                      <div style={{backgroundColor: "#dd121296"}} className="flex justify-between items-center bg-red p-4 rounded-lg mb-3 mt-3">
                        <p>Suspicious activity at 14:22 PM</p>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">View</button>
                      </div>

                      <div style={{backgroundColor: "#dd121296"}} className="flex justify-between items-center bg-red p-4 rounded-lg mb-3 mt-3">
                        <p>Suspicious activity at 14:22 PM</p>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">View</button>
                      </div>

                      <div style={{backgroundColor: "#dd121296"}} className="flex justify-between items-center bg-red p-4 rounded-lg mb-3 mt-3">
                        <p>Suspicious activity at 14:22 PM</p>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">View</button>
                      </div>  

                      
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;
