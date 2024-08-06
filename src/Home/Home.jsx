import React from "react";
import "../App.css";
import "./home.css";
import LineChart from "../component/Charts/LineChart";
import { App } from "../component/Charts/GradientChart";
import AreaChart from "../component/Charts/AreaChart";
import { PieChart, BarChart } from "../component/Charts/PieChart";
import StopWatch from "../component/Sidebar/Clock";
import { useSelector } from "react-redux";

const Home = () => {
  const isSidebarExpanded = useSelector((state) => state.expand.value); 
  return (
    <div className={`bg-white main flex ${isSidebarExpanded ? 'sidebar-expanded' : ''}` }>
      <div className="daily-use flex justify-between mb-8">
        <div className="card-hover rounded-xl">
          <figure className="card">
            <figcaption className="card_title">
              <div className={`daily-use-chart py-6 mian-chart ${isSidebarExpanded ? 'px-4' : 'px-12'}`}>
                <p className="hd-card mb-6">Threats Detected</p>
                <BarChart />
              </div>
            </figcaption>
          </figure>
        </div>

        <div className="card-hover">
          <figure className="card">
            <figcaption className="card_title">
              <div className={`daily-use-chart py-6 mian-chart ${isSidebarExpanded ? 'px-4' : 'px-12'}`}>
                <p className="hd-card mb-3">Activity Log</p>
                <div className="h-[13rem] overflow-y-auto overflow-x-hidden">
                  <div className="mt-2 mb-2">
                    <p className="card-time">12:30 PM</p>
                    <p className="card-para1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className="mt-2 mb-2">
                    <p className="card-time">12:30 PM</p>
                    <p className="card-para1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className="mt-2 mb-2">
                    <p className="card-time">12:30 PM</p>
                    <p className="card-para1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className="mt-2 mb-2">
                    <p className="card-time">12:30 PM</p>
                    <p className="card-para1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
              <div className={`daily-use-chart py-6 mian-chart ${isSidebarExpanded ? 'px-4' : 'px-12'}`}>
                <p className="hd-card mb-6">Stopwatch</p>
                <StopWatch />
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="">

        <div className="daily-use flex justify-between mb-8">
          <div className="card-hover">
            <figure className="card">
              <figcaption className="card_title">
                <div className={`daily-use-chart py-6 mian-chart ${isSidebarExpanded ? 'px-4' : 'px-12'}`}>
                  <p className="hd-card mb-3">System Health</p>
                  <div className="flex justify-center ">
                    <App />
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="card-hover">
            <figure className="card">
              <figcaption className="card_title">
                <div className={`piechart py-6 mian-chart ${isSidebarExpanded ? 'px-4' : 'px-12'}`}>
                  <p className="hd-card mb-3">User Activity</p>
                  <div className="flex justify-center w-[33rem] h-[22rem]">
                    <PieChart />
                  </div>
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
