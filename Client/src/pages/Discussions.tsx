import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon, IonNav,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from "react";
import {create, createOutline, star} from "ionicons/icons";
import Groupes from "../components/Groupes";
import Messages from "./Messages";

const Discussions: React.FC = () => {
    return (
        <>
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
        </>
    );
};

export default Discussions;
