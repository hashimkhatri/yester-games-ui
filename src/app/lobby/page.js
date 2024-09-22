"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { UseUserProfile } from "@/hooks/UseUserProfile";
import { useLoader } from "@/utils/LoaderManager";
import GameAttach from "@/components/GameAttach";
import GameInvite from "@/components/GameInvite";

import "../styles/styles.css";

export default function LobbyPage() {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState(
    sessionStorage.getItem("invitation_code")
  );
  const [showGameAttach, setShowGameAttach] = useState(false);
  const [showGameInvite, setShowGameInvite] = useState(false);

  const [selectedGame, setSelectedGame] = useState(null);
  const { user, loading, error } = UseUserProfile(true);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    selectedGame
      ? localStorage.setItem("selectedGame", JSON.stringify(selectedGame))
      : localStorage.removeItem("selectedGame");
  }, [selectedGame]);

  useEffect(() => {
    if (!loading) {
      if (error != null) {
        localStorage.removeItem("authResponse");
        router.push("/");
      }
      if (!user) {
        if(invitationCode) {
          router.push("/guest-view");
        }
      }
    }
  }, [error, loading, user]);

  const gameAttach = () => {
    setShowGameAttach(!showGameAttach);
  };
  const gameInvite = () => {
    setShowGameInvite(!showGameInvite);
  };

  return (
    <Layout
      showBack={showGameAttach}
      setBack={gameAttach}
      showLeft={!!user}
      showRight={!!user}
    >
      {loading ? null : (
        <>
          {!user
            ? !invitationCode && (
                <div className="main-content-div">
                  <div className="set-error-div">
                    <h5 className="left-heading">Welcome</h5>
                    <p>
                      Your email is not recognized, please wait until you are
                      invited to a game by a friend.
                    </p>
                  </div>
                </div>
              )
            : !showGameAttach && (
                <div className="main-content-div">
                  <div className="set-user-div">
                    <div className="left-sec">
                      <img
                        className="picture"
                        src={
                          user.avatar.url || "/assets/images/default_avatar.svg"
                        }
                      />
                      <h6 className="txt">{user?.name}</h6>
                    </div>
                    <div className="right-sec">
                      <img src="/assets/images/notification.svg" />
                    </div>
                  </div>
                  <div className="set-text-div">
                    <h5 className="left-heading">Create game session</h5>
                  </div>

                  <div className="set-game-attach-div">
                    <div className="action-img-div">
                      {selectedGame ? (
                        <div className="selected-circle">
                          <img
                            src={selectedGame.thumbnail.url}
                            className="selected-image"
                          />
                          <span className="heading">{selectedGame.name}</span>
                          <span className="sub-heading">4 players</span>
                        </div>
                      ) : (
                        <img
                          className="attach-img"
                          src="/assets/images/insert-btn.svg"
                          onClick={gameAttach}
                        />
                      )}
                    </div>
                    <div className="action-button-div">
                      {selectedGame ? (
                        <>
                          <button className="set-btn-1" onClick={gameInvite}>
                            <img src="/assets/images/add-friend-icon.svg" />{" "}
                            Invite friends
                          </button>
                          <button className="set-btn-2" onClick={gameAttach}>
                            Back to game library
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="set-btn-1" onClick={gameAttach}>
                            <img src="/assets/images/folder-plus.svg" /> Attach
                            game
                          </button>
                          {user.user_game_sessions.length > 0 && (
                            <button className="set-btn-2">
                              View previous sessions
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
          {showGameAttach && (
            <GameAttach
              gameAttach={gameAttach}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          )}
          {showGameInvite && (
            <GameInvite
              user={user}
              gameInvite={gameInvite}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          )}
        </>
      )}
    </Layout>
  );
}
