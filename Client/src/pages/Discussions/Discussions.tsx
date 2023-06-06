import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import React from "react";

const Discussions: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discussions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Discussions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Discussions" />
      </IonContent>
    </IonPage>
  );
};

export default Discussions;
