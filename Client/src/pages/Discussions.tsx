import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon, IonImg, IonItem, IonLabel,
    IonList, IonModal,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, {useEffect, useState} from "react";
import {createOutline} from "ionicons/icons";
import Groupes from "../components/Groupes";
import ModalNewGroup from "../components/ModalNewGroup";

const Discussions: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <IonPage>
            <IonHeader mode="ios">
                <IonToolbar className={"ion-padding-top"}>
                    <IonButtons slot="start">
                        <IonButton>
                            Modifier
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsModalOpen(true)}>
                            <IonIcon slot="end" icon={createOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Discussions</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Groupes/>
                <ModalNewGroup isOpen={isModalOpen} closeModal={closeModal}/>
            </IonContent>
        </IonPage>
    );
};

export default Discussions;
