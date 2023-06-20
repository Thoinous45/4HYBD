import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkSharp, closeSharp, sendSharp } from "ionicons/icons";
import { Friend, FriendRequest } from "../../models/Friend.model";
import FriendsService from "../../services/FriendsService";

interface AmiItemProps {
  friend?: Friend;
  request?: FriendRequest;
  type: "request" | "user" | "sent" | "friend";
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
const FriendItem: React.FC<AmiItemProps> = ({ friend, request, type }) => {
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
          <IonButton fill="solid" color="danger" style={{ marginRight: 16 }}>
            <IonIcon icon={closeSharp} />
          </IonButton>
          <IonButton
            fill="solid"
            color="success"
            onClick={handleAcceptFriendRequest(request!)}
          >
            <IonIcon icon={checkmarkSharp} color="dark" />
          </IonButton>
        </>
      )}
      {type === "user" && (
        <IonButton
          slot="end"
          color="secondary"
          onClick={handleSendFriendRequest(friend!)}
        >
          <IonIcon icon={sendSharp} />
        </IonButton>
      )}
      {type === "sent" && (
        <IonButton slot="end" color="danger">
          <IonIcon icon={closeSharp} />
        </IonButton>
      )}
      {type === "friend" && (
        <IonButton slot="end" color="danger">
          <IonIcon icon={closeSharp} />
        </IonButton>
      )}
    </IonItem>
  );
};

export default FriendItem;
