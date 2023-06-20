import React, {useEffect, useReducer, useState} from "react";
import {
    IonButton, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonInput, IonItem,
    IonList,
    IonPage, IonRow, IonText, IonTitle, IonToast,
    IonToolbar, useIonRouter
} from "@ionic/react";
import AuthService from "../services/AuthService";


const Register: React.FC = () => {

    const navigation = useIonRouter()

    const [mail, setMail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [confirmPassword, setConfirmPassword] = useState<any>("");
    const [firstName, setFirstName] = useState<any>("");
    const [lastName, setLastName] = useState<any>("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (password.length < 6 || password.length > 30) {
            setToastMessage("Le mot de passe doit contenir entre 6 et 30 caractères.")
            setShowToast(true)
            return
        }

        if (password !== confirmPassword) {
            setToastMessage("Les mots de passe ne correspondent pas.")
            setShowToast(true)
            return
        }

        AuthService.register(mail, password, confirmPassword, firstName, lastName).then((res: any) => {
            if (res.status === "success") {
                setToastMessage("Votre compte a bien été créé.")
                setShowToast(true)
                return;
            }
            setToastMessage(res.error)
            setShowToast(true)
            return;

        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Créer un compte</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Créer un compte</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={"ion-padding"}>
                <form onSubmit={handleSubmit}>
                    <IonInput type={"email"} fill={"solid"} label={"Email"} labelPlacement={"floating"}
                              helperText={"Entrer votre email"}
                              required={true}
                              onIonInput={(e: any) => setMail(e.target.value)}>
                    </IonInput>

                    <IonInput type={"password"} fill={"solid"} label={"Mot de passe"} labelPlacement={"floating"}
                              helperText={"Entrer un mot de passe valide"}
                              required={true}
                              onIonInput={(e: any) => setPassword(e.target.value)}>
                    </IonInput>

                    <IonInput type={"password"} fill={"solid"} label={"Confirmer mot de passe"}
                              labelPlacement={"floating"}
                              helperText={"Confirmer votre mot de passe"}
                              required={true}
                              onIonInput={(e: any) => setConfirmPassword(e.target.value)}>
                    </IonInput>

                    <IonInput type={"text"} fill={"solid"} label={"Prénom"} labelPlacement={"floating"}
                              helperText={"Entrer un prénom valide"}
                              required={true}
                              onIonInput={(e: any) => setFirstName(e.target.value)}>
                    </IonInput>

                    <IonInput type={"text"} fill={"solid"} label={"Nom"} labelPlacement={"floating"}
                              helperText={"Entrer un nom valide"}
                              required={true}
                              onIonInput={(e: any) => setLastName(e.target.value)}>
                    </IonInput>


                    <IonGrid class={"ion-justify-content-center ion-padding-top"}>
                        <IonRow class={"ion-justify-content-center ion-padding-top"}>
                            <IonCol>
                                <IonButton type={"submit"} expand={"full"}>CONTINUER</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText>Déjà un compte ? <a
                                    onClick={() => navigation.push("/", "root", "replace")}>{"S'identifier"}</a></IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
            </IonContent>

            <IonToast
                isOpen={showToast}
                message={toastMessage}
                onDidDismiss={() => setShowToast(false)}
                duration={5000}
            ></IonToast>
        </IonPage>
    )
}

export default Register;
