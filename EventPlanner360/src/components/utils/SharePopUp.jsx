import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as iconLiabrary from "react-share";

const SharePopUp = ({ setIsShare, isShare }) => {
  const [eventId, setEventId] = useState("");
  const { id } = useParams();
  useEffect(() => {
    setEventId(id);
  }, []);
  const shareUrl =
    "https://event-planner-frontend-6837.onrender.com/guest/redirect";
  const title = "Event Invition Link -";
  const description = `Dear Guest,

  Its a formal Event Invitation to you,

  I hope this message finds you well,we are sharing this link with you which help us to confirm your presense in the following event.
  I am pleased to invite you to the following Event.Your presence and participation would be greatly appreciated as part of our event.We look forward to your positive response and hope to see you there.

  Best regards,
  Rishi Agrahari
  
  Checkout the link here: `;

  return (
    <div>
      <div className="share_page" disabled={isShare}></div>
      <div className="social_box">
        <div className="card popup_card ">
          <i
            className="fa-solid fa-xmark popup_close_btn"
            onClick={() => setIsShare(false)}
          ></i>
          <iconLiabrary.FacebookShareButton url={shareUrl} quote={title}>
            <iconLiabrary.FacebookIcon size={56} borderRadius={20} />
          </iconLiabrary.FacebookShareButton>
          <iconLiabrary.TwitterShareButton url={shareUrl} title={title}>
            <iconLiabrary.TwitterIcon size={56} borderRadius={20} />
          </iconLiabrary.TwitterShareButton>
          <iconLiabrary.LinkedinShareButton
            url={shareUrl}
            title={title}
            summary={description}
            source="Example.com"
          >
            <iconLiabrary.LinkedinIcon size={56} borderRadius={20} />
          </iconLiabrary.LinkedinShareButton>
          <iconLiabrary.WhatsappShareButton>
            <iconLiabrary.WhatsappIcon
              size={56}
              borderRadius={20}
            ></iconLiabrary.WhatsappIcon>
          </iconLiabrary.WhatsappShareButton>
          <iconLiabrary.TelegramShareButton>
            <iconLiabrary.TelegramIcon
              size={56}
              borderRadius={20}
            ></iconLiabrary.TelegramIcon>
          </iconLiabrary.TelegramShareButton>
          <iconLiabrary.EmailShareButton
            url={shareUrl}
            subject={title}
            body={`${description}`}
          >
            <iconLiabrary.EmailIcon size={56} borderRadius={20} />
          </iconLiabrary.EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default SharePopUp;
