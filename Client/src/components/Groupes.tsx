import React, {useEffect} from "react";
import {
    IonButton,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonNavLink, IonTabButton,
    IonText, useIonViewDidEnter, useIonViewDidLeave
} from "@ionic/react";
import {ellipsisHorizontal} from "ionicons/icons";
import Messages from "../pages/Messages";
import ActionSheetComponent from "./ActionSheetComponent";
import ChatService from "../services/ChatService";
import LoadingFriendItem from "./amis/LoadingFriendItem";

const Groupes: React.FC = () => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [id, setId] = React.useState(0);
    const [chatRooms, setChatRooms] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
       const fetchData = async () => {
           try{
                const response = await ChatService.getAllMyChatRooms();
                if(response.data.length > 0){
                    setChatRooms(response.data);
                    setIsLoading(false);
                }
           } catch (e) {
               console.log(e);
           }
       }
       fetchData()
    }, []);



    return (
        <>
            <IonList>
                {!isLoading ? (
                    chatRooms?.map((chatRoom: any) => (
                        <IonItem key={chatRoom._id}>
                            <IonItemSliding>
                                <IonItem button routerLink={"/messages/" + chatRoom._id}>
                                    <IonLabel>
                                        <IonText color={"primary"}>
                                            {chatRoom.conversationName}
                                        </IonText>
                                        <p>{chatRoom.messages[0].message}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItemOptions side="end" onClick={() => {
                                    setIsOpen(true)
                                    setTitle(chatRoom.conversationName)
                                    setId(chatRoom._id)
                                }}>
                                    <IonItemOption color="medium">
                                        <IonIcon slot="icon-only" icon={ellipsisHorizontal}>Options</IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        </IonItem>
                    )) ): (
                    <LoadingFriendItem/>)}
            </IonList>
            <ActionSheetComponent isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} title={title} id={id}/>
        </>
    )
}


export default Groupes;
