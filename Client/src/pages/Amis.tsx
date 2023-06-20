import {
  IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import React from "react";
import { Friend, FriendRequest } from "../models/Friend.model";
import FriendItem from "../components/amis/FriendItem";
import LoadingFriendItem from "../components/amis/LoadingFriendItem";
import FriendsService from "../services/FriendsService";
const mockedUsers: Array<Friend> = [
  {
    _id: "1",
    firstname: "Jean",
    lastname: "Dupont",
    email: "jean-dupont@gmail.com",
  },
  {
    _id: "2",
    firstname: "Jeanne",
    lastname: "Dupont",
    email: "jeanne-dupont@gmail.com",
  },
];

const mockedUsersFriendRequest: Array<Friend> = [
  {
    _id: "3",
    firstname: "Julien",
    lastname: "Vartan",
    email: "julien-vartan@mail.com",
  },
  {
    _id: "4",
    firstname: "Julie",
    lastname: "Vartan",
    email: "jujuvartan@hotmail.com",
  },
];

const getUsers = (): Promise<Array<Friend>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockedUsers);
    }, 1000);
  });
};

const getFriendsRequest = (): Promise<Array<Friend>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockedUsersFriendRequest);
    }, 1000);
  });
};

const Amis: React.FC = () => {
  const [friendsToAdd, setFriendsToAdd] = React.useState<Array<Friend>>([]);
  const [friendsRequest, setFriendsRequest] = React.useState<Array<FriendRequest>>([]);
  const [friendsRequestSent, setFriendsRequestSent] = React.useState<Array<FriendRequest>>([]);
  const [friends, setFriends] = React.useState<Array<Friend>>([]);
  const [activeTab, setActiveTab] = React.useState<string | undefined>(
    "friends"
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const [friendsToAdd, friendRequests, friendRequestsSent, usersToAdd] = await Promise.all([
      FriendsService.getFriends(),
      FriendsService.getFriendsRequestsReceived(),
      FriendsService.getFriendsRequestsSent(),
      FriendsService.getFriendsToAdd(),
    ]);
    setFriends(friendsToAdd);
    setFriendsToAdd(usersToAdd);
    setFriendsRequest(friendRequests);
    setFriendsRequestSent(friendRequestsSent);
    setIsLoading(false);
  };

  useIonViewDidEnter(() => {
    fetchData();
  });

  useIonViewDidLeave(() => {
    setFriendsToAdd([]);
    setFriendsRequest([]);
  });

  const handleSearchFriendsInput = (ev: any) => {
    const searchValue = ev.target.value;
    if (searchValue.length > 0) {
      const filteredUsers = mockedUsers.filter((user) => {
        return (
          user.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setFriendsToAdd(filteredUsers);
    } else {
      setFriendsToAdd(mockedUsers);
    }
  };

  const handlePageRefresh = async (ev: any) => {
    await fetchData();
    ev.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader className={"ion-padding-top"}>
        <IonToolbar>
          <IonTitle size="large">Amis</IonTitle>
        </IonToolbar>
        <IonToolbar mode={"md"}>
          <IonSegment
            value={activeTab}
            onIonChange={(e) => setActiveTab(e.detail.value)}
          >
            <IonSegmentButton value="friends">
              <IonLabel>Mes amis</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="add">
              <IonLabel>Ajouter un ami</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="sent">
              <IonLabel>Envoyées</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(ev) => handlePageRefresh(ev)}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {activeTab === "friends" && (
          <IonList>
            <IonListHeader>
              <IonLabel>
                <h1>Mes amis</h1>
              </IonLabel>
            </IonListHeader>
            {!isLoading ? (
              friends.map((friend) => (
                <FriendItem key={friend.email} friend={friend} type="friend" />
              ))
            ) : (
              <LoadingFriendItem />
            )}
          </IonList>
        )}
        {activeTab === "add" && (
          <>
            <IonList>
              <IonListHeader>
                <IonLabel>
                  <h1>Demandes d'amis ({friendsRequest.length})</h1>
                </IonLabel>
              </IonListHeader>
              {!isLoading ? (
                friendsRequest.map((request) => (
                  <FriendItem key={request.email} request={request} type="request" />
                ))
              ) : (
                <LoadingFriendItem />
              )}
            </IonList>
            <IonList>
              <IonListHeader>
                <IonLabel>
                  <h1>Ajout rapide</h1>
                </IonLabel>
              </IonListHeader>
              <IonSearchbar
                placeholder="Rechercher un ami"
                debounce={500}
                onIonInput={(ev) => handleSearchFriendsInput(ev)}
              ></IonSearchbar>
              {!isLoading ? (
                friendsToAdd.map((friend) => (
                  <FriendItem key={friend.email} friend={friend} type="user" />
                ))
              ) : (
                <LoadingFriendItem />
              )}
            </IonList>
          </>
        )}
        {activeTab === "sent" && (
          <IonList>
            <IonListHeader>
              <IonLabel>
                <h1>Demandes envoyées ({friendsRequestSent.length})</h1>
              </IonLabel>
            </IonListHeader>
            {!isLoading ? (
              friendsRequestSent.map((request) => (
                <FriendItem key={request.email} request={request} type="sent" />
              ))
            ) : (
              <LoadingFriendItem />
            )}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Amis;
