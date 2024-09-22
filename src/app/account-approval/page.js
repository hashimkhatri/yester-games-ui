"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleSignInContext } from "@/context/GoogleSignInContext";
import { googleLogout } from "@react-oauth/google";
// import LoggedInRoute from "@/components/LoggedInRoute";
import "../styles/styles.css";

export default function AccountConfirmationPage() {
  const router = useRouter();
  const { googleData, setGoogleData } = useGoogleSignInContext();
  useEffect(() => {
    console.log(googleData)
    if(googleData === null){
      // router.push('/')
    }
  }, []);
  // const reLogin = () =>{
  //   setGoogleData(null);
  //   googleLogout();
  //   router.push('/')
  // }

  return (
    // <LoggedInRoute>
    <div className="second-login-screen set-div-1">
      <div className="set-div-2">
        <div className="set-child-div">
          <img src="/assets/images/icon.png" />
        </div>
        <div className="set-text-div">
          <p>Account Approval</p>
        </div>
        <div className="set-profile-div">
          <img src={googleData?.picture} alt="" />
          <p>
            {googleData?.name} <span className="d-block">{googleData?.email} </span>
          </p>
        </div>
        <div className="set-content-div">
          <p>
          Once your account creation has been approved, a confirmation email will be sent to your Gmail account.
          </p>
        </div>

        <button className="set-btn-1" onClick={()=>router.push('/auth/privacy-consent')}>
          Open Mail App
        </button>
      </div>
    </div>
    // </LoggedInRoute>
  );
}
