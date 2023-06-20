import React, {FC, useEffect, useState} from "react";
import {
    IonButton, IonButtons,
    IonContent,
    IonFooter,
    IonHeader, IonIcon,
    IonInput,
    IonItem, IonPage,
    IonTitle,
    IonToolbar, useIonRouter, useIonViewDidEnter, useIonViewDidLeave
} from "@ionic/react";
import {chevronBack, send} from "ionicons/icons";
import BoxMessage from "../components/BoxMessage";
import ChatService from "../services/ChatService";
import {useParams} from "react-router";

const Messages = () => {

    const [message, setMessage] = useState('');
    const [conv, setConv] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = window.location.pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ChatService.getChat(params);
                setConv(response.data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();

    }, []);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => setConv([])} routerLink={"/app"} routerDirection={'back'} slot={"start"}
                                   fill={"clear"}>
                            <IonIcon slot={"start"} icon={chevronBack}/> Back
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Conversation</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {!isLoading ? (
                    conv.map((data: any) => (
                        <BoxMessage key={data._id} message={data.message} idDiscussion={data.sender}/>
                    ))
                ) : (
                    <p>Loading...</p>
                )
                }
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonItem no-lines>
                        <IonInput spellCheck={true} value={message}
                                  type={"text"} onIonInput={(e: any) => setMessage(e.target.value)}></IonInput>
                        <IonIcon slot={"end"}
                                 icon={send} onClick={() => {
                            ChatService.sendMessage(params, message)
                            setMessage('')
                            window.location.reload()
                        }}/>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    )
}

export default Messages;
