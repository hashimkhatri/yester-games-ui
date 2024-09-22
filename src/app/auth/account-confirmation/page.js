"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleSignInContext } from "@/context/GoogleSignInContext";
import { googleLogout } from "@react-oauth/google";
import LoggedInRoute from "@/components/LoggedInRoute";
import { fetchData } from '@/utils/ApiUtils';
import "../../styles/styles.css";

export default function AccountConfirmationPage() {
  const router = useRouter();
  const { googleData, setGoogleData } = useGoogleSignInContext();
  const [customData, setCustomData] = useState(null);
  

  useEffect(() => {
    if(googleData === null){
      router.push('/')
    }
    const getContent = async () => {

        try {
            const response = await fetchData('custom-datas/get/account_confirmation', {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response) {
              setCustomData(response);
            } else {
              setCustomData(null);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setCustomData(null);
        }
    };
    getContent();
}, []);
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
        <div className="set-text-div">
          <p>Confirm your Google account</p>
        </div>
        <div className="set-profile-div">
          <img src={googleData?.picture} alt="" />
          <p>
            {googleData?.name} <span className="d-block">{googleData?.email} </span>
          </p>
        </div>
        <div className="set-content-div">
          <p>{customData}</p>
        </div>

        <button className="set-btn-1" onClick={()=>router.push('/auth/privacy-consent')}>
          <img src="/assets/images/google-icon.png" /> Signin with Google
        </button>
        <button className="set-btn-2" onClick={reLogin}>Change Account</button>
      </div>
    </div>
    </LoggedInRoute>
  );
}
