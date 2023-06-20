import {IonIcon, IonItem, IonLabel, IonNote, IonRow, IonText} from "@ionic/react";
import React, {FC, useState} from "react";
import "../style/BoxMessage.scss";

interface Props {
    message: string
    idDiscussion: any
}

const BoxMessage: FC<Props> = ({message, idDiscussion}) => {
    const [currentUser] = useState<any>(sessionStorage.getItem("user"))
    return (
        <>
            <IonItem lines={"none"} className={currentUser == idDiscussion ? "user" : "sender"}>
                <IonLabel slot={"end"} className={"ion-text-wrap"} >
                    <IonText>{message}</IonText>
                    <IonNote>
                        <IonIcon></IonIcon>
                    </IonNote>
                    <small className={currentUser == idDiscussion ? "dataUser" : "dateSender"}>10AM</small>
                </IonLabel>
            </IonItem>

        </>
    )
}

export default BoxMessage;
