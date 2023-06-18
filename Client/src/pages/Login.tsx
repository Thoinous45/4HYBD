import React from "react";
import {IonButton, IonContent, IonHeader, IonPage, IonToolbar, useIonRouter} from "@ionic/react";

const Login: React.FC = () => {

    const navigation = useIonRouter()

    const doLogin = () => {
        navigation.push("/app" , "root", "replace")
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    Login
                </IonToolbar>
            </IonHeader>
            <IonContent className={"ion-padding"}>
                <IonButton onClick={() => doLogin()}>Connexion</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Login;