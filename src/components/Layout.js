"use client";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import toast, { Toaster } from "react-hot-toast";
import "../app/styles/styles.css";

export default function Layout({ showBack, setBack, showLeft = false, showRight = false, children, bgColor=false }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authResponse");
    router.push("/");
  };

  return (
    <PrivateRoute>
      <div className={"second-login-screen set-div-1"}>
        <Toaster />
        <div className={"set-div-2"+(bgColor ? " set-div-2-bg" : "")}>
          <div className="set-child-div">
            {showLeft && <>
              {showBack ? (
              <img
                className="left-sec"
                src="/assets/images/back-arrow.svg"
                onClick={setBack}
              />
            ) : (
              <img
                className="left-sec"
                src="/assets/images/shopping-bag-icon.svg"
              />
            )}
            </>}
            

            <img src="/assets/images/logo.svg" />
            {showRight && <>
              <img
              className={showBack ? "right-sec zero-opacity" : "right-sec"}
              src="/assets/images/setting-icon.svg"
              onClick={() => {
                if (!showBack) {
                  handleLogout();
                }
              }}
            />
            </>}
            
          </div>
          {children}
        </div>
      </div>
    </PrivateRoute>
  );
}
