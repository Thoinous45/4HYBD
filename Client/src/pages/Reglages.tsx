import {IonButton, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter} from '@ionic/react';
import React from "react";
import AuthService from "../services/AuthService";

const Reglages: React.FC = () => {

    const navigation = useIonRouter()
    const logout = () => {
        AuthService.logout().then(r =>
            navigation.push("/", "back", "push")
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Réglages</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Réglages</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRow>
                      <h1>Réglages</h1>
                    <IonButton onClick={logout}>Déco</IonButton>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default Reglages;
