import React from "react";
import "../App.css";
import "./home.css";
import LineChart from "../component/Charts/LineChart";
import { App } from "../component/Charts/GradientChart";
import AreaChart from "../component/Charts/AreaChart";
import { PieChart } from "../component/Charts/PieChart";

const Home = () => {
  return (
    <div className=" bg-white main  flex ">
      <h2 className="font-bold text-2xl mt-4 ">Home</h2>
      <div className="card-hover1">
        <figure className="card">
            <div className="mian-chart mt-6  mb-2 p-6 ">
              <App />
            </div>
        </figure>
      </div>
      <div className="sub-section">
        <h2 className="sec-head my-4 ">Daily Use</h2>

        <div className="daily-use flex justify-around mb-8">
          <div className="card-hover">
            <figure className="card">
              <figcaption className="card_title">
                <div className="daily-use-chart h-[20rem] w-[40rem] mian-chart">
                  <AreaChart />
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="card-hover">
            <figure className="card">
              <figcaption className="card_title">
                <div className="piechart h-[20rem] mian-chart">
                  <PieChart />
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
