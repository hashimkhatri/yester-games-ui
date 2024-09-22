import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import copy from "copy-to-clipboard";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLoader } from "@/utils/LoaderManager";
import toast from "react-hot-toast";
import { baseUrl } from "@/utils/ApiWrapper";
import { postData } from "@/utils/ApiUtils";
import "../app/styles/styles.css";

export default function GameInvite({ user, gameInvite, selectedGame }) {
  const [invitationLink, setInvitationLink] = useState('-');
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const createSession = async () => {
      showLoader();
      try {
        const response = await postData("game-sessions", { user_id: user?.id, game_id: selectedGame?.id }, { headers: { "Content-Type": "application/json" } });
        setInvitationLink(baseUrl+'/invitation/'+response.data.invitation_code);
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        hideLoader();
      }
    };
    createSession();
  }, []);

  const shareLink = (platform) => {
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(invitationLink)}`,
      skype: `https://web.skype.com/share?url=${encodeURIComponent(invitationLink)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(invitationLink)}`,
      instagram: () => {
        copy(invitationLink);
        toast.success("Invitation copied. Please share manually on Instagram.");
      },
    };
    typeof urls[platform] === "function" ? urls[platform]() : window.open(urls[platform], "_blank");
  };

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: "0" }} exit={{ y: "100%" }} transition={{ duration: 0.5 }} className="set-div-2 main-invite-div" onClick={gameInvite}>
      <div className="invite-box" onClick={(e) => e.stopPropagation()}>
        <div className="invite-heading">
          <h4>Let’s invite friends!</h4>
          <img src="/assets/images/cross.svg" onClick={gameInvite} />
        </div>
        <div className="invite-social">
          <img src="/assets/images/telegram.svg" onClick={() => shareLink("telegram")} />
          <img src="/assets/images/instagram.svg" onClick={() => shareLink("instagram")} />
          <img src="/assets/images/whatsapp.svg" onClick={() => shareLink("whatsapp")} />
          <img src="/assets/images/skype.svg" onClick={() => shareLink("skype")} />
        </div>
        <CopyToClipboard text={invitationLink} onCopy={() => toast.success("Invitation copied.")}>
          <button className="set-btn-1 btn-copy"><img src="/assets/images/copy.svg" />Copy link</button>
        </CopyToClipboard>
      </div>
    </motion.div>
  );
}