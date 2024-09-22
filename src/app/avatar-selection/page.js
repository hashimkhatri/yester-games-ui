"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleSignInContext } from "@/context/GoogleSignInContext";
import { googleLogout } from "@react-oauth/google";
import LoggedInRoute from "@/components/LoggedInRoute";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/styles.css";

export default function AccountConfirmationPage() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500
  };
  const router = useRouter();
  const { googleData, setGoogleData } = useGoogleSignInContext();
//   useEffect(() => {
//     console.log(googleData)
//     if(googleData === null){
//       router.push('/')
//     }
//   }, []);
  const reLogin = () =>{
    setGoogleData(null);
    googleLogout();
    router.push('/')
  }

  return (
    <LoggedInRoute>
    <div className="second-login-screen set-div-1">
      <div className="set-div-2 set-bg-color-1">
        <div className="set-child-div lobby-div-1">
          <img className="set-img-1" src="/assets/images/blue-back-arrow.png" />
          <img src="/assets/images/icon.png" />
          <img className="set-img-1 set-visible" src="/assets/images/setting-icon.png" />
        </div>
        <div className="lobby-div-3 selection-div-1">
            <h5>Choose avatar</h5>
        </div>

        <div className="set-slider-div-1">
        <div className="slider-container">
      <Slider {...settings}>
        <div className="set-slider-div-3">
          <div className="set-slider-div-2">
            <img src="/assets/images/slider-img-1.png" alt="" />
          </div>
        </div>
        <div className="set-slider-div-3">
        <div className="set-slider-div-2">
            <img src="/assets/images/slider-img-1.png" alt="" />
          </div>
        </div>
        <div className="set-slider-div-3">
        <div className="set-slider-div-2">
            <img src="/assets/images/slider-img-1.png" alt="" />
          </div>
        </div>
        <div className="set-slider-div-3">
        <div className="set-slider-div-2">
            <img src="/assets/images/slider-img-1.png" alt="" />
          </div>
        </div>
        <div className="set-slider-div-3">
        <div className="set-slider-div-2">
            <img src="/assets/images/slider-img-1.png" alt="" />
          </div>
        </div>
        <div className="set-slider-div-3">
        <div className="set-slider-div-2">
            <img src="/assets/images/slider-img-1.png" alt="" />
          </div>
        </div>
      </Slider>
    </div>
        </div>

        <div className="lobby-div-3 selection-div-1">
            <h5>Background color</h5>
        </div>

        <div className="avatar-selection-btn">
          <button className="selection-color-btn-1"></button>
          <button className="selection-color-btn-2"></button>
          <button className="selection-color-btn-3"></button>
          <button className="selection-color-btn-4"></button>
          <button className="selection-color-btn-5"></button>
          <button className="selection-color-btn-6"></button>
          <button className="selection-color-btn-7"></button>
          <button className="selection-color-btn-8"></button>
          <button className="selection-color-btn-9"></button>
          <button className="selection-color-btn-10"></button>
          <button className="selection-color-btn-11"></button>
          <button className="selection-color-btn-12"></button>
        </div>

        <button className="set-btn-1 lobby-btn-1" onClick={()=>router.push('/auth/privacy-consent')}>
          Confirm
        </button>
       
      </div>
    </div>
    </LoggedInRoute>
  );
}
