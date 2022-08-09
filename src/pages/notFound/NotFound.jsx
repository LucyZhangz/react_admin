import React from "react";
import {useNavigate } from 'react-router-dom'
import Style from "./notFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();
  function goBack(){
    navigate(-1)

  }
  function goHome(){
    // console.log(navigate);
    navigate('/')
  }
  return (
    <>
      <div className={Style.notfound}>
        <lottie-player
          src="https://assets4.lottiefiles.com/private_files/lf30_maaq67zd.json"
          speed="1"
          style={{ width: "60vw", height: "100vh", background: "" }}
          loop
          autoplay
        ></lottie-player>
        <button className={Style.btn} onClick={goBack}>
           返回上一页
        </button>
        <button className={Style.btn} onClick={goHome}>
          返回首页
        </button>
       
      </div>
    </>
  );
}
