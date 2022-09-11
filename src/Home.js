import React from "react";
import Navba from "./Navbar";

const Home = () => {
  return (
    <body style={{ "background-color": "rgb(133, 146, 158 )" }}>
      <div
        style={{ "background-color": "rgb(133, 146, 158 )", height: "100" }}
        height="100%"
      >
        <Navba></Navba>
        <center>
          <h2 className="mt-3">Welcome To India's first cab sharing service</h2>
          <div className="mt-3">
            <div className="row ml-2 mt-5">
              <div className="col-1"></div>
              <div className="col-5 ml-5">
                <img
                  height="300px"
                  width="600px"
                  src="https://img.freepik.com/free-vector/front-car-concept-illustration_114360-7978.jpg?w=1060&t=st=1662874447~exp=1662875047~hmac=88d778c8d7dd72fa55263b077b472c89060e19f42e65d93c66afa2aacc642da2"
                ></img>
              </div>
              <div className="col-1"></div>
              <div className="col-4">
                <h3 className="p-5">
                  Travelling alone? wanna share your vehicle? Now you can share
                  your vehicle at your own price on a single click with GOSHARE.
                </h3>
              </div>
            </div>
            <div className="row ml-2 mt-5">
              <div className="col-1"></div>
              <div className="col-6">
                <h3 className="p-5">
                  Travelling Long? wanna go by a car or bike? Now you can go to your destination using GOSHARE.
                  Now, you can travel anywhere in the country on a single click 
                </h3>
              </div>
              <div className="col-5 ml-5">
                <img
                  height="400px"
                  width="500px"
                  src="https://www.shutterstock.com/image-vector/online-ordering-taxi-car-rent-600w-1490648672.jpg"
                ></img>
              </div>
              
            </div>
          </div>
          
        </center>
      </div>
    </body>
  );
};

export default Home;
