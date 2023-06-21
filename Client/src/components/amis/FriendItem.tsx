import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkSharp, closeSharp, sendSharp, trashBinSharp } from "ionicons/icons";
import { Friend, FriendRequest } from "../../models/Friend.model";
import FriendsService from "../../services/FriendsService";

interface AmiItemProps {
  friend?: Friend;
  request?: FriendRequest;
  type: "request" | "user" | "sent" | "friend";
  onDelete?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onSend?: () => void;
}

const handleSendFriendRequest =
  (friend: Friend): any =>
  () => {
    console.log(friend);
    FriendsService.sendFriendRequest(friend._id);
  };

const handleAcceptFriendRequest =
  (request: FriendRequest): any =>
  () => {
    console.log(request);
    FriendsService.acceptFriendRequest(request.requestId);
  };
const FriendItem: React.FC<AmiItemProps> = ({ friend, request, type, onAccept, onDecline }) => {
  const name = request
    ? request.firstname + " " + request.lastname
    : friend!.firstname + " " + friend!.lastname;
  const email = request ? request.email : friend!.email;

  return (
    <IonItem>
      <IonLabel>
        <h2>{name}</h2>
        <p>{email}</p>
      </IonLabel>
      {type === "request" && (
        <>
          <IonButton fill="solid" color="danger" style={{ marginRight: 16 }} onClick={onAccept}>
            <IonIcon icon={closeSharp} />
          </IonButton>
          <IonButton
            fill="solid"
            color="success"
            onClick={onAccept}
          >
            <IonIcon icon={checkmarkSharp} color="dark" />
          </IonButton>
        </>
      )}
      {type === "user" && (
        <IonButton
          slot="end"
          color="secondary"
          onClick={onAccept}
        >
          <IonIcon icon={sendSharp} />
        </IonButton>
      )}
      {type === "sent" && (
        <IonButton slot="end" color="danger" onClick={onDecline}>
          <IonIcon icon={closeSharp} />
        </IonButton>
      )}
      {type === "friend" && (
        <IonButton slot="end" color="danger" onClick={onDecline}>
          <IonIcon icon={trashBinSharp} />
        </IonButton>
      )}
    </IonItem>
  );
};

export default FriendItem;
