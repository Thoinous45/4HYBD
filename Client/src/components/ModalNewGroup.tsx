import React, {useEffect, useRef} from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel, IonIcon, IonSearchbar, useIonViewDidEnter, useIonViewDidLeave, useIonRouter,
} from '@ionic/react';
import {addCircleOutline, closeCircleSharp, personCircle} from "ionicons/icons";
import FriendsService from "../services/FriendsService";
import LoadingFriendItem from "./amis/LoadingFriendItem";
import ChatService from "../services/ChatService";
import AuthService from "../services/AuthService";

interface ModalComponentProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ModalNewGroup: React.FC<ModalComponentProps> = ({isOpen, closeModal}) => {

    const modal = useRef<HTMLIonModalElement>(null);
    const [query, setQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [friends, setFriends] = React.useState<any>([]);
    const [users, setUsers] = React.useState<any>([]);
    const [nameConversation, setNameConversation] = React.useState<any>('');

    const navigation = useIonRouter()
    const fetchData = async () => {
        setIsLoading(true);
        const [friendsList, user] = await Promise.all([
            FriendsService.getFriends(),
            AuthService.getOneUser()
        ]);
        setFriends(friendsList);
        setUsers(user);
        setNameConversation(user.firstname + " " + user.lastname + " & " + friendsList[0].firstname + " " + friendsList[0].lastname);
        setIsLoading(false);
    }

    useIonViewDidEnter(() => {
        fetchData();
    });

    useIonViewDidLeave(() => {
        setFriends([]);
    });

    return (
        <IonContent>
            <IonModal isOpen={isOpen} breakpoints={[0.95]} initialBreakpoint={0.95} backdropBreakpoint={0.8}
                      onDidDismiss={closeModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nouv. Discussion</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closeModal}>
                                <IonIcon slot="end" icon={closeCircleSharp} color={"medium"}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonSearchbar placeholder="Search" value={query}
                                  onIonInput={(e: any) => setQuery(e.target.value)}></IonSearchbar>
                    <IonList>
                        {!isLoading ? (
                            friends.filter((friend: any) => {
                                if (query === "") {
                                    return friend;
                                } else if (friend.firstname.toLowerCase().includes(query.toLowerCase()) || friend.lastname.toLowerCase().includes(query.toLowerCase())) {
                                    return friend;
                                }
                            }).map((friend: any) => (
                                <IonItem key={friend._id} style={{padding: "10px"}}>
                                    <IonIcon slot={"start"} icon={personCircle}/>
                                    <IonLabel>
                                        <h2>{friend.firstname} {friend.lastname}</h2>
                                        <p>{friend.email}</p>
                                    </IonLabel>
                                    <IonButtons>
                                        <IonButton onClick={() => {
                                            ChatService.createChatRoom(nameConversation, friend._id).then((res) => {
                                                closeModal();
                                                navigation.push("/messages/" + res.data._id)});
                                        }}
                                         color={'success'}>
                                            <IonIcon slot={"end"} icon={addCircleOutline}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>
                            ))
                        ) : (
                            <LoadingFriendItem/>
                        )}
                    </IonList>
                </IonContent>
            </IonModal>
        </IonContent>
    );
};

export default ModalNewGroup;
