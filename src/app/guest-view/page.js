"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { UseUserProfile } from "@/hooks/UseUserProfile";
import { UseInvitedGame } from "@/hooks/UseInvitedGame";
import { useLoader } from "@/utils/LoaderManager";
import { AvatarCarousel } from "@/components/AvatarCarousel";
import { ColorSelector } from "@/components/ColorSelector";
import { postData, fetchData } from "@/utils/ApiUtils";
import toast, { Toaster } from "react-hot-toast";

import "../styles/styles.css";

export default function GuestView() {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState(
    sessionStorage.getItem("invitation_code")
  );
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [nickname, setNickname] = useState(null);


  const { user, loading, error } = UseUserProfile(true);
  const { game, loading: gameLoading, error: gameError } = UseInvitedGame(true);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (!loading) {
      if (error != null) {
        localStorage.removeItem("authResponse");
        router.push("/");
      }
    }
  }, [error, loading, user]);

  const checkAlredyInGame = async () => {
    if (invitationCode) {
      showLoader();
      try {
        const response = await postData(
          "session-members/check-already-in-session",
          { invitation_code: invitationCode },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.message == 'in_game') {
          hideLoader();
          router.push("/game-session/"+invitationCode);
        }else if(response.message == 'blocked'){
          hideLoader();
          
          toast.error("Error: You have been blocked by the host.", {
            position: "top-center",
            duration: 3000,
          })
          sessionStorage.removeItem("invitation_code");
          router.push("/");
        }else if(response.message == 'invalid'){
          hideLoader();
          toast.error("Error: Invalid invitation.", {
            position: "top-center",
            duration: 3000,
          })
          sessionStorage.removeItem("invitation_code");
          router.push("/");
        }else{
          hideLoader();
          sessionStorage.removeItem("invitation_code");
          router.push("/");
        }
      } catch (error) {
        hideLoader();
      } 
    }
  };

  useEffect(() => {
    checkAlredyInGame();
  }, [invitationCode]);

  const submitDetails = async () => {
    if(invitationCode && nickname && selectedAvatar && selectedColor){
      showLoader();
      const avatarId = selectedAvatar.avatar.id;
      const colorId = selectedColor.id;
      const data = {
        invitation_code: invitationCode,
        avatar_id: avatarId,
        color_id: colorId,
        nickname: nickname
      }
      try {
        const response = await postData(
          "session-members/add-guest",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.message == 'in_game') {
          hideLoader();
          router.push("/game-session/"+invitationCode);
        }else if(response.message == 'blocked'){
          hideLoader();
          toast.error("Error: You have been blocked by the host.", {
            position: "top-center",
            duration: 3000,
          })
          sessionStorage.removeItem("invitation_code");
          router.push("/");
        }else if(response.message == 'invalid'){
          hideLoader();
          toast.error("Error: Invalid invitation.", {
            position: "top-center",
            duration: 3000,
          })
          sessionStorage.removeItem("invitation_code");
          router.push("/");
        }else{
          hideLoader();
          sessionStorage.removeItem("invitation_code");
          router.push("/");
        }
      } catch (error) {
        hideLoader();
        toast.error("Error: " + error.message, {
          position: "top-center",
          duration: 3000,
        });
      }

    }
  }

  return (
    <Layout
      bgColor={true}
      showBack={false}
      showLeft={false}
      showRight={false}
    >
      <Toaster />
      {loading ? null : (
        <div className="main-content-div">
          <div className="set-guest-div">
            <div className="guest-game">
              <img
                src="/assets/images/game.svg"
                alt="logo"
                className="game-logo"
              />
              <h6 className="txt">{game?.game?.name}</h6>
            </div>
          </div>

          <div className="set-guest-game-div">
            <h4 className="heading">Choose avatar & nickname</h4>
            <div className="avatar">
              <AvatarCarousel
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
                selectedColor={selectedColor}
              />
            </div>
            <h4 className="heading">Background color</h4>
            <div className="colors">
              <ColorSelector
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
              />
            </div>
            <div className="names">
              <input
                className="nickname"
                type="text"
                placeholder="nickname"
                minLength={2}
                maxLength={10}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="ready">
              <button className={"set-btn-1 "+(invitationCode && nickname && selectedAvatar && selectedColor ? "" : "disabled")}
                onClick={submitDetails}
              >
                <img src="/assets/images/play.svg" style={{ width: "2vh" }} />{" "}
                I’m Ready
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
