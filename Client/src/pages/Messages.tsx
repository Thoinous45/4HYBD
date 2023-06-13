import React from "react";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";

const Messages: React.FC = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Back Button</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                Salut
            </IonContent>
        </>

    )
}

export default Messages;
