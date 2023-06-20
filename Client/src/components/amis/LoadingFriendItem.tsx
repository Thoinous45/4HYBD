import { IonItem, IonLabel, IonSkeletonText } from "@ionic/react";

const LoadingFriendItem: React.FC = () => {
  return (
    <IonItem>
      <IonLabel>
        <h2>
          <IonSkeletonText animated style={{ width: "30%" }} />
        </h2>
        <p>
          <IonSkeletonText animated style={{ width: "70%" }} />
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default LoadingFriendItem;
