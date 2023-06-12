<<<<<<< Updated upstream:Client/src/pages/Discussions.tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
=======
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader, IonIcon, IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
>>>>>>> Stashed changes:Client/src/pages/Discussions/Discussions.tsx
import React from "react";
import {create, createOutline, star} from "ionicons/icons";
import Groupes from "../../components/Groupes";

const Discussions: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className={"ion-padding-top"}>
                    <IonButtons slot="start">
                        <IonButton>
                            Modifier
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton>
                            <IonIcon slot="end" icon={createOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Discussions</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <Groupes/>

            </IonContent>
        </IonPage>
    );
};

export default Discussions;
