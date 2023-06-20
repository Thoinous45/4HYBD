import React, {useEffect, useState} from "react";
import {
    IonButton, IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonPage,
    IonRow, IonText, IonTitle, IonToast,
    IonToolbar, useIonRouter,
} from "@ionic/react";
import AuthService from "../services/AuthService";

const Login: React.FC = () => {

    const navigation = useIonRouter()

    const [mail, setMail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        AuthService.login(mail, password).then((result: any) => {
            if (result.status === "success") {
                setPassword("")
                setMail("")
                navigation.push("/app", "forward", "push")
                return;
            }
            setToastMessage(result.error)
            setShowToast(true)
            return
        })
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Identifiez-vous</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Identifiez-vous</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={"ion-padding"}>
                <form onSubmit={handleSubmit}>
                    <IonInput type={"email"} fill={"solid"} label={"Email"} labelPlacement={"floating"}
                              helperText={"Entrer votre email"}
                              required={true}
                              value={mail}
                              onIonInput={(e: any) => setMail(e.target.value)}/>

                    <IonInput type={"password"} fill={"solid"} label={"Mot de passe"} labelPlacement={"floating"}
                              helperText={"Entrer un mot de passe valide"}
                              required={true}
                              value={password}
                              onIonInput={(e: any) => setPassword(e.target.value)}/>


                    <IonGrid class={"ion-justify-content-center ion-padding-top"}>
                        <IonRow class={"ion-justify-content-center ion-padding-top"}>
                            <IonCol>
                                <IonButton className={""} type={"submit"} expand={"full"}>CONTINUER</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText>Nouveau sur Messenger ? <a
                                    onClick={() => navigation.push("/register", "root", "replace")}>{"S'inscrire"}</a></IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
            </IonContent>

            <IonToast
                isOpen={showToast}
                message={toastMessage}
                onDidDismiss={() => setShowToast(false)}
                duration={5000}/>
        </IonPage>
    )
}

export default Login;
