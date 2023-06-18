import React, {useEffect, useState} from "react";
import {
    IonBackButton,
    IonButton, IonButtons,
    IonContent,
    IonFooter,
    IonHeader, IonIcon,
    IonInput,
    IonItem, IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {chevronBack, send} from "ionicons/icons";


const Messages = () => {

    //const [messages, setMessages] = useState(ChatService.getChat(data.id));
    const [message, setMessage] = useState("");
    const test = 1

    useEffect(() => {
        console.log(message)
    }, [message])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink={"/app"} routerDirection={"back"}  slot={"start"} fill={"clear"}>
                            <IonIcon slot={"start"} icon={chevronBack}/> Back
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Data</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                Salut
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonItem no-lines>
                        <IonInput spellCheck={true} value={message}
                                  type={"text"} onChange={(e : any) => setMessage(e.target.value)}></IonInput>
                        <IonIcon slot={"end"}
                                 icon={send} /*onClick={() => ChatService.sendMessage(data.id, message)}*/></IonIcon>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    )
}

export default Messages;
