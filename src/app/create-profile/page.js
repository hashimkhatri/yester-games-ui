"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleSignInContext } from "@/context/GoogleSignInContext";
import { googleLogout } from "@react-oauth/google";
import LoggedInRoute from "@/components/LoggedInRoute";
import "../styles/styles.css";

export default function AccountConfirmationPage() {
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
      <div className="set-div-2">
        <div className="set-child-div">
          <img src="/assets/images/icon.png" />
        </div>

        
        
        <div className="lobby-div-3 create-profile-div-1">
            <h5>Create profile</h5>
        </div>

        <div className="create-profile-div-2">
          <img src="/assets/images/create-profile.png" alt="" />
          <button><img src="/assets/images/edit-btn.png" alt="" /></button>
        </div>

        <div className="create-profile-div-4">
          <div className="create-profile-div-3">
            <p>Name Surname</p>
            <input type="text" placeholder="Typing ..."/>
          </div>
          <div className="create-profile-div-3">
            <p>Date of Birth</p>
            <input type="date"/>
          </div>
          <div className="create-profile-div-3">
            <p>City / Country</p>
            <select name="" id="">
              <option value="">Select</option>
              <option value="">Select 1</option>
              <option value="">Select 2</option>
            </select>
          </div>
          <div className="create-profile-div-3">
            <p>Username</p>
            <input type="text" placeholder="Select"/>
          </div>
        </div>

        
        <button className="set-btn-1 create-profile-btn-1" onClick={()=>router.push('/auth/privacy-consent')}>
           Confirm
        </button>
       
      </div>
    </div>
    </LoggedInRoute>
  );
}
