"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import toast from "react-hot-toast";

import "../styles/styles.css";

export default function SessionPage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState(null);
  const [inviter, setInviter] = useState([]);
  
  useEffect(() => {
    let game = localStorage.getItem("selectedGame");

    if (game === null) {
      localStorage.removeItem("selectedGame");
      router.push("/lobby");
    } else {
      setSelectedGame(JSON.parse(game));
    }

    const interval = setInterval(() => {
      toast.success("Waiting for players to join..... 😊", {
        position: "top-center",
        duration: 2000,
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {selectedGame && (
        <Layout showLeft={true} showRight={true}>
          <div className="main-content-div">
            <div className="set-game-session-div">
              <div className="game-section-container">
                <h5 className="heading">Game session created</h5>
                <div className="game-image-box">
                <img className="game-image" src={selectedGame.thumbnail.url} />
                </div>
                <h5 className="name-heading">{selectedGame.name}</h5>
                <h5 className="sub-heading">4 players</h5>
              </div>
              <div className="game-user-container">
                {inviter}
                <img
                  className="game-user-image"
                  src={selectedGame.thumbnail.url}
                />
                <img
                  className="game-user-image"
                  src={selectedGame.thumbnail.url}
                />
                <img
                  className="game-user-image"
                  src={selectedGame.thumbnail.url}
                />
                <img
                  className="game-user-image"
                  src={selectedGame.thumbnail.url}
                />
              </div>
              <div className="action-button-div">
                <button className="set-btn-1">
                  <img src="/assets/images/play.svg" /> I’m ready
                </button>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
