import {IonIcon, IonItem, IonLabel, IonNote, IonText} from "@ionic/react";
import React, {FC, useState} from "react";
import "../style/BoxMessage.scss";
interface Props {
    message: string
    sender: any
}
const BoxMessage: FC<Props> = ({ message,sender }) => {
    const [currentUser, setCurrentUser] = useState<any>(localStorage.getItem("user"))
    return (
        <>

        <IonItem lines={"none"} /*className={sender == currentUser ? "user" : "sender"}*/ className={"user"}>
            <IonLabel slot={"end"} className={"ion-text-wrap"}>
                <IonText>{message}</IonText>
                <IonNote>
                    <small>100</small>
                    <IonIcon></IonIcon>
                </IonNote>
            </IonLabel>
        </IonItem>

    <IonItem lines={"none"} /*className={sender == currentUser ? "user" : "sender"}*/ className="sender">
        <IonLabel slot={"start"} className={"ion-text-wrap"}>
            <IonText>{message}</IonText>
            <IonNote>
                <small>100</small>
                <IonIcon></IonIcon>
            </IonNote>
        </IonLabel>
    </IonItem>
        </>
    )
}

export default BoxMessage;
