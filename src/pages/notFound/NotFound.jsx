import React from "react";
import Style from "./notFound.module.css";
export default function NotFound() {

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
        <button className={Style.btn}>
           返回上一页
        </button>
        <button className={Style.btn}>
          返回首页
        </button>
       
      </div>
    </>
  );
}
